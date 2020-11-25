'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const superagent = require('superagent');
const methodOverride = require('method-override');
const pg = require('pg');
const { promiseImpl } = require('ejs');
require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_KN_API_KEY = process.env.GOOGLE_KN_API_KEY;
////////////////////////////////////////////////////TEST ROUTES/////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});

//////////////////////////////////////////////ROUTES/////////////////////////////////////////////////////////////////

app.get('/search', getCity);
// app.get('/search', getCountry);


function getCity(req, res) {
  let obj = {};
  let city = req.query.city;
  
  let urlPlaceId = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&key=${GOOGLE_API_KEY}`;

  let urlOne = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJVTPokywQkFQRmtVEaUZlJRA&key=${GOOGLE_API_KEY}`;


  let googleKn = `https://kgsearch.googleapis.com/v1/entities:search?query=${city}&key=${GOOGLE_KN_API_KEY}`;

    // superagent.get(googleKn)
    // .then(data => {
    //   // console.log('Google Knowledge', data);
    //   // let array = [];
    //   // data.body.itemListElement.map(results => {
    //   //   array.push(results.result);
    //   //   console.log(array);
    //   // })
    // })

  // superagent.get(url)
  //   .then(data => {
  //     console.log('what type of example url', data.body);
  //   })
  // obj.cityDetails = data.body.result.url; 

  superagent.get(urlOne)
    .then(data => {
      console.log(data);
      let photoReferenceArray = data.body.result.photos;
      return photoReferenceArray.map(photos => photos.photo_reference)
      })
      .then(data => {
          let array = data.map(photoArray => {
            let url = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${photoArray}&key=${GOOGLE_API_KEY}`;
            return url;
          })
          return array;
        })
        .then(banana => {
         let photoArray = [];
         banana.forEach(apple => {
          photoArray.push(superagent.get(apple));
        })
        // console.log('PROMISE:', photoArray);
        Promise.all(photoArray)
          .then(potatoes => {
            res.render('./pages/details', { render: potatoes });

          })
          .catch(err => console.error(err));
     })
}











app.get('*', (req, res) => {
  res.render('pages/error', { error: new Error('page not found') });
})




/////////////////////////////////connection//////port///////////catcher///////////////////////////////////////////////////
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Order Up!: ${PORT}`)
    })
  })
client.on('error', err => console.err(err));













