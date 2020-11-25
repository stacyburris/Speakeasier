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
  let googleKn = `https://kgsearch.googleapis.com/v1/entities:search?query=${city}&key=${GOOGLE_KN_API_KEY}`;

  superagent.get(googleKn)
    .then(data => {
      let array = [];
      data.body.itemListElement.map(results => {
        array.push(results.result);
      })
      obj.description = array[0].detailedDescription.articleBody;
      obj.name = array[0].name;
      console.log('OBJ:', obj);
    })
    .then(() => {
      let urlPlaceId = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&key=${GOOGLE_API_KEY}`;
      superagent.get(urlPlaceId)
      .then(data => {
        let pocket = data.body.candidates;
        console.log('PLACE ID:', pocket);
        let photoRefs = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pocket[0].place_id}&key=${GOOGLE_API_KEY}`;
        superagent.get(photoRefs)
          .then(data => {
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
            Promise.all(photoArray)
              .then(potatoes => {
                obj.photo = potatoes;
                res.render('./pages/details', { render: obj });
              })
              .catch(err => console.error(err));
          })
      })
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













