import * as path from 'path';
import { parse } from 'path'; 

import { dataBase } from '../database.js';
import { validationBody } from '../validation-request/validation-body.js';
import { handlerErrors } from '../errors/handler-errors.js';
import { UrlError, PersonError } from '../errors/users-errors.js';


export const parsePutRequest = (req, res) => {
  const url = path.basename(req.url);
  const urlParse = path.parse(req.url);

  if(url !== 'person') {
    let body = ''; 
    req.on('data', chunk => {
      try {
        body += chunk.toString();
      } catch (err) {
        handlerErrors(res, err);
      };
    });
    req.on('end', () => {
      try {
        const data = parse(body);
        let person = JSON.parse(data.base);
        if(validationBody(person)) {
          if(dataBase('Put', urlParse.base, person)) {
            res.statusCode = 200; 
            res.end(dataBase('Put', urlParse.base));  
          } else {
            throw new PersonError(`{"Message": "Person is not find with id" "${urlParse.base}"}`, 404);
          }; 
        };
      } catch (err) {
        handlerErrors(res, err);
      };    
    });
  } else {
    throw new UrlError('{"Message": "Url is not correct"}', 404);
  };
};