export const handlerErrors = (res, err) => {
  if(err.isUserError) {
    res.statusCode = err.statusCode;
    res.end(err.message);
  } else if(err.message.includes('JSON')){
    res.statusCode = 400;
    res.end('{"Message": "JSON is not correct"}');
    console.error(err.message);
  } else {   
    res.statusCode = 500;
    res.end(`{"Error": "${err.message}"}`);
    console.error(err.message);
  };
}; 