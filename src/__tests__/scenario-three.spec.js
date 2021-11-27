import supertest from 'supertest';
import { parse } from 'path'; 

const request = supertest('localhost:3000');


describe('My CRUD API: scenario three', () => {
  let bodyOne = {
    "name": "Alexander",
    "age": 34,
    "hobbies": ["bike", "walk", "fishing"]
  };

  let bodyTwo = {
    "name": "Anna",
    "age": 25,
    "hobbies": ["songs", "movies"]
  };
  
  let idPersonOne;
  let idPersonTwo;

  test('A new object is created by a POST request (a response containing the newly created object is expected)', async () => {
    const res = await request
      .post('/person')
      .expect('Content-Type', /json/)
      .send(bodyOne);
    const resBase = parse(res.text).base; 
    idPersonOne = JSON.parse(resBase).id;
    bodyOne['id'] = idPersonOne;
    expect(resBase).toEqual(JSON.stringify(bodyOne));
  });

    test('A new object is created by a POST request (a response containing the newly created object is expected)', async () => {
      const res = await request
        .post('/person')
        .expect('Content-Type', /json/)
        .send(bodyTwo);
      const resBase = parse(res.text).base; 
      idPersonTwo = JSON.parse(resBase).id;
      bodyTwo['id'] = idPersonTwo;
      expect(resBase).toEqual(JSON.stringify(bodyTwo));
    });

  test('GET request gets all objects (expected empty array)', async () => {
    const res = await request
      .get('/person');
    expect(res.text).toEqual(`[${JSON.stringify(bodyOne)},${JSON.stringify(bodyTwo)}]`);
  });

  test('DELETE-request delete the created object by id (waiting for confirmation of successful deletion)', async () => {
    const res = await request
      .delete(`/person/${idPersonOne}`)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(204);
  });

  test('GET request gets all objects (expected empty array)', async () => {
    const res = await request
      .get('/person');
    expect(res.text).toEqual(`[${JSON.stringify(bodyTwo)}]`);
  });

  test('DELETE-request delete the created object by id (waiting for confirmation of successful deletion)', async () => {
    const res = await request
      .delete(`/person/${idPersonTwo}`)
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(204);
  });

  test('GET request gets all objects (expected empty array)', async () => {
    const res = await request
      .get('/person');
    expect(res.text).toEqual("[]");
  });
});