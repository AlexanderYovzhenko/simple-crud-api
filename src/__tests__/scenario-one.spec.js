import supertest from 'supertest';
import { parse } from 'path'; 

const request = supertest('localhost:3000');


describe('My CRUD API: scenario one', () => {
  let body = {
    "name": "Alexander",
    "age": 34,
    "hobbies": ["bike", "walk", "fishing"]
  };

  let updatedBody = {
    "name": "Anna",
    "age": 25,
    "hobbies": ["songs", "movies"]
  };
  
  let idPerson;
  let person;

  beforeEach(() => {
    body = {
      "name": "Alexander",
      "age": 34,
      "hobbies": ["bike", "walk", "fishing"]
    };
  });

  test('GET request gets all objects (expected empty array)', async () => {
    const res = await request
      .get('/person');
    expect(res.text).toEqual("[]");
  });
    
  test('A new object is created by a POST request (a response containing the newly created object is expected)', async () => {
    const res = await request
      .post('/person')
      .expect('Content-Type', /json/)
      .send(body);
    const resBase = parse(res.text).base; 
    person = resBase;
    idPerson = JSON.parse(resBase).id;
    body['id'] = idPerson;
    expect(resBase).toEqual(JSON.stringify(body));
  });

  test('With a GET request, we try to get the created object by its id (the created object is expected)', async () => {
    const res = await request
      .get(`/person/${idPerson}`)
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(person);
  });
  
  test('We are trying to update the created object with a PUT request (a response is expected containing an updated object with the same id)', async () => {
    const res = await request
      .put(`/person/${idPerson}`)
      .expect('Content-Type', /json/)
      .send(updatedBody);
    const resBase = parse(res.text).base; 
    updatedBody['id'] = idPerson;
    expect(resBase).toEqual(JSON.stringify(updatedBody));
  });

  test('DELETE-request delete the created object by id (waiting for confirmation of successful deletion)', async () => {
    const res = await request
      .delete(`/person/${idPerson}`)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(204);
  });

  test('A GET request is trying to get a remote object by id (an answer is expected that there is no such object)', async () => {
    const messagePersonNotFind = '{"Message": "Person is not find"}';
    const res = await request
      .get(`/person/${idPerson}`)
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(messagePersonNotFind);
  });
});