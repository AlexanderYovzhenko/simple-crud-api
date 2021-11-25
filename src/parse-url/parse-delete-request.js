import * as path from 'path'; 

import { dataBase } from '../database.js';
import { UrlError, PersonError } from '../errors/users-errors.js';


export const parseDeleteRequest = (req, res) => {
  const url = path.basename(req.url);
  const urlParse = path.parse(req.url);

  if(url !== 'person') { 
    if(dataBase('GetId', urlParse.base)) {
      dataBase('Delete', urlParse.base);
      res.statusCode = 204;  
      res.end();  
    } else {
      throw new PersonError(`{"Message": "Person is not find with id" "${urlParse.base}"}`, 404);
    }; 
  } else {
    throw new UrlError('{"Message": "Url is not correct"}', 404);
  };
};