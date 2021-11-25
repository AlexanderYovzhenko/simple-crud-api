import { validate } from 'uuid';

export const validationUuid = (idPerson) => {
  return validate(idPerson);
};