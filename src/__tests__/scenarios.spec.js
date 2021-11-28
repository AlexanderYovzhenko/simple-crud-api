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