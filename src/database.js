let db = [];

export const dataBase = (method, id, person) => {
  switch (method) {
    case 'Get':
      return JSON.stringify(db);
    break;

    case 'GetId':
      for(let i = 0; i < db.length; i++) {
        if(db[i].id === id) return JSON.stringify(db[i]);
      };
    break;

    case 'Post':
      db.push(person);
    break;
      
    case 'Put':
      for(let i = 0; i < db.length; i++) {
        if(db[i].id === id) {
          for (const key in person) {
            db[i][key] = person[key];        
          }; 
          return JSON.stringify(db[i]);  
        };
      };
    break;

    case 'Delete':
      for(let i = 0; i < db.length; i++) {
        if(db[i].id === id) {
          db.splice(i, 1);
        };
      };

    break;

    default:
      break;
  };
};