import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import axios from 'axios';
import hash from 'blueimp-md5';

import prepareData from './src/services/MarvelService.js';

dotenv.config();

const PORT = 8000;

const ts = new Date().getTime();
const md5 = hash(`${ts + process.env.MARVEL_PRIVATE_API_KEY + process.env.MARVEL_PUBLIC_API_KEY}`);
const defaultParameters = [
  `ts=${ts}&`,
  `apikey=${process.env.MARVEL_PUBLIC_API_KEY}&`,
  `hash=${md5}`,
];

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json('hi');
});

app.get('/getAllCharacters', (req, res, next) => {
  const {offset} = req.query;
  const parameters = [
    'limit=9&',
    `offset=${offset}&`,
    ...defaultParameters
  ].join('');

  const options = {
    method: 'GET',
    url: `${process.env.MARVEL_API_BASE}characters?${parameters}`,
  }

  axios.request(options)
    .then(response => res.json(response.data.data.results.map(prepareData)))
    .catch(err => {
      console.error(err);
      next(err);
    })
});

app.get('/getCharacter', (req, res, next) => {
  const {id} = req.query;
  const parameters = [
    ...defaultParameters
  ].join('');

  const options = {
    method: 'GET',
    url: `${process.env.MARVEL_API_BASE}characters/${id}?${parameters}`,
  }

  axios.request(options)
    .then(response => res.json(prepareData(response.data.data.results[0])))
    .catch(err => {
      console.error(err);
      next(err);
    })
});

app.listen(PORT, () => console.log(`Server is runnign on port ${PORT}`));
