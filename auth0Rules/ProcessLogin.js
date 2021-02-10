function (user, context, callback) {

  const CLAIMS = "https://dgraph.io/claims/graphqlkanban"; // REACT_APP_AUTH0_CLAIMS_KEY
  const CLIENT_ID = "eaNlZ3Hi019Ty8kfJ1cZ8iL4abmpZP24"; // REACT_APP_AUTH0_CLIENT_ID
  
  if (context.clientID!==CLIENT_ID) return callback(null, user, context);
  
  context.idToken[CLAIMS] = {username: user.username};
  return callback(null, user, context);
}