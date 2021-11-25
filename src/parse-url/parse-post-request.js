import * as path from 'path';
import { v4 as idPerson } from 'uuid';
import { parse } from 'path'; 

import { dataBase } from '../database.js';
import { validationBody } from '../validation-request/validation-body.js';
import { handlerErrors } from '../errors/handler-errors.js';
import { UrlError } from '../errors/users-errors.js';

export const parsePostRequest = (req, res) => {
  const url = path.basename(req.url);
  
  switch (url) {
    case 'person':
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
            person.id = idPerson();
            dataBase('Post', '', person);
            res.statusCode = 201; 
            res.end(JSON.stringify(person));
          }; 
        } catch (err) {
          handlerErrors(res, err);
        }; 
      });
      break; 

    default: 
      throw new UrlError('{"Message": "Url is not correct"}', 404);
      break;
  };
};