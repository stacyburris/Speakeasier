'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');
const methodOverride = require('method-override');
const pg = require('pg');
require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3333;


app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


////////////////////////////////////////////////////TEST ROUTES//////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.send('woahhh horsey');
});
//////////////////////////////////////////////ROUTES/////////////////////////////////////////////////////////////////
app.get('/search', getCity);



















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













