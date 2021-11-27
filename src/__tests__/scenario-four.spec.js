import supertest from 'supertest';
import { parse } from 'path'; 

const request = supertest('localhost:3000');


describe('My CRUD API: scenario four', () => {
  let body = {
    "name": "Alexander",
    "age": 34,
    "hobbies": ["bike", "walk", "fishing"]
  };

  let updatedBodyOne = {
    "name": "Anna",
    "age": 25,
    "hobbies": ["songs", "movies"]
  };
  
  let updatedBodyTwo = {
    "name": "Max",
    "age": 43,
    "hobbies": ["read books"]
  };

  let idPerson;
  const personNotFind = '{"Message": "Person is not find"}';

  test('A new object is created by a POST request (a response containing the newly created object is expected)', async () => {
    const res = await request
      .post('/person')
      .expect('Content-Type', /json/)
      .send(body);
    const resBase = parse(res.text).base; 
    idPerson = JSON.parse(resBase).id;
    body['id'] = idPerson;
    expect(resBase).toEqual(JSON.stringify(body));
  });

  test('We transmit non-existent an identifier for the Get request (a response containing a message is expected)', async () => {
    const res = await request
      .get('/person/13789e00-dbba-4b60-97c7-e593606f4043')
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(personNotFind);
  });

  test('With a GET request, we try to get the created object by its id (the created object is expected)', async () => {
    const res = await request
      .get(`/person/${idPerson}`)
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(JSON.stringify(body));
  });

  test('We are trying to update the created object with a PUT request (a response is expected containing an updated object with the same id)', async () => {
    const res = await request
      .put(`/person/${idPerson}`)
      .expect('Content-Type', /json/)
      .send(updatedBodyOne);
    const resBase = parse(res.text).base; 
    updatedBodyOne['id'] = idPerson;
    expect(resBase).toEqual(JSON.stringify(updatedBodyOne));
  });
    
  test('We are trying to update the created object with a PUT request (a response is expected containing an updated object with the same id)', async () => {
    const res = await request
      .put(`/person/${idPerson}`)
      .expect('Content-Type', /json/)
      .send(updatedBodyTwo);
    const resBase = parse(res.text).base; 
    updatedBodyTwo['id'] = idPerson;
    expect(resBase).toEqual(JSON.stringify(updatedBodyTwo));
  });

  test('With a GET request, we try to get the created object by its id (the created object is expected)', async () => {
    const res = await request
      .get(`/person/${idPerson}`)
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(JSON.stringify(updatedBodyTwo));
  });

  test('DELETE-request delete the created object by id (waiting for confirmation of successful deletion)', async () => {
    const res = await request
      .delete(`/person/${idPerson}`)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(204);
  });
    
  test('We transmit non-existent an identifier for the Get request (a response containing a message is expected)', async () => {
    const res = await request
      .get(`/person/${idPerson}`)
      .expect('Content-Type', /json/);
    const resBase = parse(res.text).base; 
    expect(resBase).toEqual(personNotFind);
  });
});