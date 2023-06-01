import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import axios from 'axios';
import hash from 'blueimp-md5';

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

app.get('/getAllCharacters', (req, res) => {
  const parameters = [
    'limit=9&',
    'offset=210&',
    ...defaultParameters
  ].join('');

  const options = {
    method: 'GET',
    url: `${process.env.MARVEL_API_BASE}characters?${parameters}`,
  }

  axios.request(options)
    .then(response => res.json(response.data))
    .catch(err => {
      console.error(err);
    })
});

app.get('/getCharacter', (req, res) => {
  const {id} = req.query;
  const parameters = [
    ...defaultParameters
  ].join('');

  const options = {
    method: 'GET',
    url: `${process.env.MARVEL_API_BASE}characters/${id}?${parameters}`,
  }

  axios.request(options)
    .then(response => res.json(response.data))
    .catch(err => {
      console.error(err);
    })
});

app.listen(PORT, () => console.log(`Server is runnign on port ${PORT}`));
