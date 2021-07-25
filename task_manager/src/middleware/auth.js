let jwt = require("jsonwebtoken");
let User = require("../modal/user");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization").replace("Bearer ", "");
    let decoded = jwt.verify(token, process.env.JWTCODE);
    let user = await User.findOne({ _id: decoded._Id, "tokens.token": token }); //particular/single user
    if (!user) {
      console.log("user>> ", user);
      throw new Error();
    }
    console.log("decodede user ", token);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log("error auth");
    res.status(401).send({ error: "error!! please authenticate." });
  }
};

module.exports = auth;
