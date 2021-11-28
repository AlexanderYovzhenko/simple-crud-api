import { ValidationBodyError } from "../errors/users-errors.js";


export const validationBody = (body) => {
  const requiredFields = ['name', 'age', 'hobbies'];
  let count = 0;

  requiredFields.forEach(el => {
    if(body[el]) count++;
  });
  if(count === 3) {
    if(Object.keys(body).includes('id')) throw new ValidationBodyError('{"Message": "Id is generated on the server, id cannot be changed"}', 400);
    if(typeof body.hobbies === 'object' && body.hobbies) {
      return true;
    } else {
      throw new ValidationBodyError('{"Message": "Hobbies field must be an array"}', 400);
    };
  } else {
    throw new ValidationBodyError('{"Message": "There are no required fields in the request body"}', 400);
  };  
};  