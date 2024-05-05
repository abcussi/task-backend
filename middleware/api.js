const jwt = require("jsonwebtoken");

const getToken = (req) => {
    // Prioritize tokens in the order of body, query, headers
    const tokenSources = [
      req.body?.token,
      req.query?.token,
      req.headers["x-access-token"],
      req.headers["authorization"],
      req.cookies["x-access-token"]
    ];
  
    for (const token of tokenSources) {
      if (token != null) { // Check for both null and undefined
        return token;
      }
    }
  
    // Return null if no token is found
    return null;
  }
  
const JwtAuthenticate = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = getToken(req);
  // decode token
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    // verifies secret and checks exp
    jwt.verify(token, process.env.ENCODE_KEY || 'test', function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token.",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if fails return 403
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
};

module.exports = {
  JwtAuthenticate,
};
