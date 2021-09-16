const path = require('path');
const express = require('express');
const sqlDriver = require('better-sqlite3');
const cors = require('cors');
const { request } = require('http');
const { response } = require('express');
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

// create a new web server
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//habilita el acceso a la data desde cualquier sitio
app.use(cors());
app.options('*', cors());

// ask the web server to serve files from the frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// create a connection to the database
const db = new sqlDriver('../db/products.db');

// make some REST routes
app.get('/api/mobiles', (req, res) => {
  // create a db query as a prepared statement
  let stmt = db.prepare(`
    SELECT *
    FROM mobiles
  `);
  // run the query and return all the data
  let result = stmt.all();
  // send the result to the client as json
  res.json(result);
});
app.get('/api/laptops', (req, res) => {
    // create a db query as a prepared statement
    let stmt = db.prepare(`
    SELECT *
    FROM laptops
    `);
    // run the query and return all the data
    let result = stmt.all();
    // send the result to the client as json
    res.json(result);
  });
  app.get('/api/headphones', (req, res) => {
    // create a db query as a prepared statement
    let stmt = db.prepare(`
    SELECT *
    FROM headphones
    `);
    // run the query and return all the data
    let result = stmt.all();
    console.log(result)
    
  // send the result to the client as json
  res.json(result);
});

app.post('/api/login', urlencodedParser, (req, res) => {
  let query = db.prepare(`
  SELECT
       email,
       password,
       name
  FROM users WHERE email= :email AND password=:password ;

  `);


  res.json(query.all(req.body).length?true:false);
});

app.post('/api/register', urlencodedParser, (req, res) => {
  console.log(req.body)
  var user = req.body;

  if( user != undefined ){

  }

  let query = db.prepare(`INSERT INTO users (
    email,
    password,
    name
)
VALUES (
  '${user.email}',
  '${user.password}',
  '${user.name}'
);`)
  
  res.json(query.run(req.body));
 // console.log(result)
});

app.get('/api/logout', (req, res) => {
  request.session.destroy(() => {
    response.json({ loggeIn: false })
  })
});


// start the web server
app.listen(4000, () => console.log('Listening on port 4000'));
