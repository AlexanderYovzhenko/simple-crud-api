export const handlerErrors = (res, err) => {
  if(err.isUserError) {
    res.statusCode = err.statusCode;
    res.end(err.message);
  } else {
    res.statusCode = 500;
    res.end(`{"Error": "${err.message}"}`);
    console.error(err.message);
  };
};