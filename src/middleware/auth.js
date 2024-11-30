const jwt = require("jsonwebtoken")
const jwtPassword = "FamboInnovation"
const zod = require("zod")
const express = require('express')
const bcrypy = require('bcryptjs')
const bodyParser = require("body-parser")
const db = require('../db/db.js')
const app = express();

app.get('/api/books' , (req,res)=>{
  const resp = db.query ('Select * from books')
  console.log(resp);
})


const emailVerify = zod.string().email()
const passwordVerify = zod.string().min(8)

function signJwt(username, password) {
  const usernameResponse = emailVerify.safeParse(username)
  const passwordResponse = passwordVerify.safeParse(password)

  if (!usernameResponse.success || !passwordResponse.success) {
    return null
  }

  const signature = jwt.sign({ username }, jwtPassword)

  return signature
}
const ans = signJwt("AnubhavHooda@gmail.com", "ForFambo")
console.log(ans)

function decodeJwt(token) {
  const decoded = jwt.decode(token)
  if (decoded) console.log(true)
  else console.log(false)
}
const print = decodeJwt(ans)

function verifyJwt(token) {
  const verified = jwt.verify(token, jwtPassword);
  if(verified) return true; 
  else return false; 
}
console.log(verifyJwt(ans));

if(verifyJwt)
app.use(bodyParser.json());
app.post('/api/auth/register', (req,res)=>{
  const{username , password, email , phone } = req.body; 
  const hashedPassword = bcrypt(password, 50);

  db.query(
    'insert into users(username,password,email,phones);'
    )
})

app.post('api/auth/login', (req,res)=> {
  const {username, password} = req.body;  

  db.query(
    'select * from users where username = ?'
  )
})