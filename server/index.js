import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.get('/', (req, res) => {
  res.send(200);
  console.log('Hello world');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});