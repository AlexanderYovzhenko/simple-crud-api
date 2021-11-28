import { validationUrl } from '../validation-request/validation-url.js';
import { parseGetRequest } from './parse-get-request.js';
import { parsePostRequest } from './parse-post-request.js';
import { parsePutRequest } from './parse-put-request.js';
import { parseDeleteRequest } from './parse-delete-request.js';
import { MethodError } from '../errors/users-errors.js';


export const parseUrl = (req, res) => {
  if(validationUrl(req.url, res)) {
    const method = req.method;

    switch (method) {
      case 'GET':
        parseGetRequest(req, res);
        break;
      case 'POST':
        parsePostRequest (req, res);
        break;
      case 'PUT':
        parsePutRequest(req, res);
        break;
      case 'DELETE':
        parseDeleteRequest(req, res);
        break;        
      default:
        throw new MethodError(`{"Message": "Method ${method} is not processed"}`, 501);
        break;
    };
  };
};