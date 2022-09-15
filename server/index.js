import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use(function setCommonHeaders(req, res, next) {
  res.set("Access-Control-Allow-Private-Network", "true");
  next();
});

app.use('/api', router);

app.use(express.static(path.join(__dirname, "..", "build")));

app.use('/*', (req, res, next) => 
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
);

app.use('/health', (req, res) => res.sendStatus(200));

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});