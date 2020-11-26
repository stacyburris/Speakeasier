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
app.post('/boarding_pass', saveBoarding);
app.get('/boarding', renderBoarding);
app.post('/stamped_pass', saveStamped);
app.get('/stamped', renderStamped);
app.delete('/delete/:location_id', deleteStamped)
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


function saveBoarding(req, res) {
  //console.log('REQ TO SAVE:', req.body);
  let { city_name, city_description, image_url } = req.body;
  let SQL = 'INSERT INTO boarding (city_name, city_description, image_url) VALUES ($1,$2,$3) RETURNING *;';
  let values = [city_name, city_description, image_url];

  client.query(SQL, values)
    .then(res.redirect('/boarding'))
    .catch(err => console.error(err));
}

function renderBoarding(req, res) {
  let SQL = 'SELECT * FROM boarding;';

  return client.query(SQL)
    .then(dbInfo => {
      res.render('./pages/boarding', { boardingData: dbInfo.rows })
      //console.log('DB INFO FOR RENDERING:', dbInfo.rows);

    })
    .catch(err => console.error(err));

}


function saveStamped(req, res) {
  console.log('REQ STAMPED TO SAVE:', req.body);
  let { city_name, city_description, image_url } = req.body;
  let SQL = 'INSERT INTO stamped (city_name, city_description, image_url) VALUES ($1,$2,$3) RETURNING *;';
  let values = [city_name, city_description, image_url];

  client.query(SQL, values)
    .then(res.redirect('/stamped'))
    .catch(err => console.error(err));
}

function renderStamped(req, res) {
  let SQL = 'SELECT * FROM stamped;';

  return client.query(SQL)
    .then(dbInfo => {
      res.render('./pages/stamped', { stampedData: dbInfo.rows })
      console.log('DB STAMPED INFO FOR RENDERING:', dbInfo.rows);
    })
    .catch(err => console.error(err));
}



function deleteStamped(req, res) {
  let SQL = `DELETE FROM stamped WHERE id=${req.params.location_id};`;
  client.query(SQL)
    .then(res.redirect('/stamped'))
    .catch(err => console.error(err));
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





// query
// // SELECT * FROM TableOld
// // WHERE []
// query
// // INSERT INTO TableNew
// query
// // DELETE FROM TableOld












