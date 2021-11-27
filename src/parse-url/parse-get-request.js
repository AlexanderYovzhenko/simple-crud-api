import * as path from 'path'; 

import { dataBase } from '../database.js';
import { PersonError } from '../errors/users-errors.js';


export const parseGetRequest = (req, res) => {
  const urlParse = path.parse(req.url);
  const url = urlParse.dir + urlParse.base;

  if(url === '/person') {
    res.statusCode = 200; 
    res.end(dataBase('Get'));
  } else {
    if(dataBase('GetId', urlParse.base)) {
      res.statusCode = 200; 
      res.end(dataBase('GetId', urlParse.base));
    } else { 
      throw new PersonError(`{"Message": "Person is not find"}`, 404);
    }; 
  };
};