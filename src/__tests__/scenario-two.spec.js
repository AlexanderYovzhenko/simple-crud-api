import supertest from 'supertest';
import { parse } from 'path'; 

const request = supertest('localhost:3000');


describe('My CRUD API: scenario two(errors message)', () => {

  let body = {
    "name": "Alexander",
    "age": 34,
    "hobbies": ["bike", "walk", "fishing"]
  };

  beforeEach(() => {
    body = {
      "name": "Alexander",
      "age": 34,
      "hobbies": ["bike", "walk", "fishing"]
    };
  });

  const bodyError = '{"Message": "There are no required fields in the request body"}';
  const bodyErrorHobbies = '{"Message": "Hobbies field must be an array"}';
  const urlNotFind = '{"Message": "Resource that you requested doesn\'t exist"}'
  const idError = '{"Message": "Id is not correct"}';
  const urlNotCorrect = '{"Message": "Url format is not correct"}';
  const personNotFind = '{"Message": "Person is not find"}';
   
  test('We do not pass the required fields into the body of the POST request (a response containing message is expected)', async () => {
    body = {
      "name": "Alexander",
      "age": 34
    };
    const res = await request
      .post('/person')
      .expect('Content-Type', /json/)
      .send(body);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(bodyError);
  });

  test('We pass a non-array to the hobby field in the body of the POST request (a response containing a message is expected)', async () => {
    body = {
      "name": "Alexander",
      "age": 34,
      "hobbies": "read books"
    };
    const res = await request
      .post('/person')
      .expect('Content-Type', /json/)
      .send(body);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(bodyErrorHobbies);
  });

  test('Get request, we pass a non-existent URL (a response is expected containing a message)', async () => {
    const res = await request
      .get('/users/user-1')
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(urlNotFind);
  });

  test('Get request, we are passing the wrong id(a response is expected containing a message)', async () => {
    const res = await request
      .get('/person/123')
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(idError);
  });

  test('We are passing an invalid format url for Post request (a response is expected containing a message)', async () => {
    const res = await request
      .post('/person/13789e00-dbba-4b60-97c7-e593606f4043')
      .expect('Content-Type', /json/)
      .send(body);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(urlNotCorrect);
  });

  test('We transmit non-existent an identifier for the Get request (a response containing a message is expected)', async () => {
    const res = await request
      .get('/person/13789e00-dbba-4b60-97c7-e593606f4043')
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(personNotFind);
  });
});