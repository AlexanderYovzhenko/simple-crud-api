import http from 'http';
import dotenv from 'dotenv';


import { parseUrl } from './parse-url/parse-url.js';
import { handlerErrors } from './errors/handler-errors.js';


dotenv.config();
const PORT = process.env.PORT;


const runServer =  () => {
  const server = http.createServer((req, res) => {
    try {
      res.setHeader("Content-Type", "application/json");
      parseUrl(req, res);
    } catch (err) {
      handlerErrors(res, err);
    };
  });
  
  server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING IN PORT: ${PORT}`);
  });
};


export { runServer };