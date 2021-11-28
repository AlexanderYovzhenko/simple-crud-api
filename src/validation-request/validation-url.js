import path from 'path';

import { validationUuid } from './validation-uuid.js';
import { IdError } from '../errors/users-errors.js';
import { UrlError } from '../errors/users-errors.js';


export const validationUrl = (url, res) => {
  const person = path.parse(url);
  if(person.base === 'person') {
    return true;
  } else if(person.dir === '/person') {
    if(validationUuid(person.base)) {
      return true;
    } else {
      throw new IdError('{"Message": "Id is not correct"}', 400);
    };
  } else {
    throw new UrlError('{"Message": "Resource that you requested doesn\'t exist"}', 404);
  };
};