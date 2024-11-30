const jwt = require("jsonwebtoken")
const jwtKey = 'ForFambo'
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]
  if (!token) {
    return res.status(403).json({ message: "Access denied" })
  }
  jwt.verify(token, "jwtKey", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" })
    }
    req.userId = decoded.userId
    next()
  })
}
module.exports = authenticate
