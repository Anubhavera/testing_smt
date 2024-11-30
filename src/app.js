const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("./db/db.js")
const app = express();

app.use(bodyParser.json())

app.post("/api/auth/register", (req, res) => {
  const { username, password, email, phone } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  db.query(
    "INSERT INTO Users (Username, Password, Email, Phone) VALUES (?, ?, ?, ?)",
    [username, hashedPassword, email, phone],
    (err, results) => {
      if (err) {return res.status(500).json({ error: err.message })}
      res.status(201).json({ message: "User registered successfully" })})
})
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body
  db.query(
    "SELECT * FROM Users WHERE Username = ?",
    [username],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: "Invalid username or password" })}
      const user = results[0]
      if (bcrypt.compareSync(password, user.Password)) {
        const token = jwt.sign({ userId: user.Uid }, "jwtKey", {
          expiresIn: "1h",})
        res.status(200).json({ token })
      } else {
        res.status(400).json({ message: "Invalid username or password" })}})
})
app.get("/api/books", (req, res) => {
  db.query("SELECT * FROM Books", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })}
    res.status(200).json(results)
  })
})
app.get("/api/books/:id", (req, res) => {
  const { id } = req.params
  db.query("SELECT * FROM Books WHERE Bid = ?", [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Book not found" })}
    res.status(200).json(results[0])
  })
})
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})
