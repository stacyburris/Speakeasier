'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const superagent = require('superagent');
const methodOverride = require('method-override');
const pg = require('pg');
require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
////////////////////////////////////////////////////TEST ROUTES/////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});

//////////////////////////////////////////////ROUTES/////////////////////////////////////////////////////////////////

app.get('/search', getCity);


function getCity(req, res) {
  let city = req.query.city;
  //console.log('are we finding the city', city);
  let exampleUrl = `https://kgsearch.googleapis.com/v1/entities:search?query=${city}&key=${GOOGLE_API_KEY}`;
  let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&key=${GOOGLE_API_KEY}`;
  let urlOne = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJVTPokywQkFQRmtVEaUZlJRA&key=${GOOGLE_API_KEY}`;

  let urlThree = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=ATtYBwKHYJeS09ayLc48L31YwX56TmDxqiAiMDlOqdtOJRIVixCIIgrlmFcOJQOmz76kaxrxvOJ7pspBHtm7mdNrH6bh_2FB6FKno8UrcIghTTBh-6Iok-ccm6S7vpjvyAvSI33jOHCpt7JyEqhWZVsDKRbe_rr0zkdwc4s92FxAOgD3g6Io&key=${GOOGLE_API_KEY}`;


  superagent.get(exampleUrl)
    .then(data => {
      console.log('what type of example url', data.body);

    })





  // superagent.get(urlOne)
  //   .then(data => {
  //     console.log('what type of urlOne', data.body.result.url);
  //     res.render('./pages/details', { cityDetails: data.body.result.url });

  //   })
  // superagent.get(urlThree)
  //   .then(data => {
  //     //console.log('urlThree data', data.body)
  //     res.render('./pages/details', { photoResult: data });


  //   });


}





//result
















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













