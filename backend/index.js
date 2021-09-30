const path = require('path');
const express = require('express');
const sqlDriver = require('better-sqlite3');
// const cors = require('cors');
const { request } = require('http');
const { response } = require('express');
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: true })

// create a new web server
const app = express();
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());

// //habilita el acceso a la data desde cualquier sitio
// app.use(cors());
// app.options('*', cors());

// ask the web server to serve files from the frontend files
app.use(express.static(path.join(__dirname, '../build')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 
  req.header('access-control-request-headers'));
  next();
});
console.log(path.join(__dirname, '../src'));

// create a connection to the database
const db = new sqlDriver(path.join(__dirname, '../db/products.db'));

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

app.get('/api/cart/:email', (req, res) => {
  // create a db query as a prepared statement
  let stmt = db.prepare(`
  SELECT *
  FROM cart WHERE email = :email
  `);
  // run the query and return all the data
  // res.json(stmt.run({ email: req.params.id }));
  let result = stmt.all({ email: req.params.email });
  res.json(result);
});
app.get('/api/favourites/:email', (req, res) => {
  // create a db query as a prepared statement
  let stmt = db.prepare(`
  SELECT *
  FROM favourites WHERE email = :email
  `);
  // run the query and return all the data
  let result = stmt.all({ email: req.params.email });
  console.log(result)

  // send the result to the client as json
  res.json(result);
});

app.put('/api/updateFavourites', (req, res) => {
  let query = db.prepare(`
  UPDATE :type
   SET 
       favourite = :favourite
 WHERE id = :id ;
  `);


  res.json(query.all(req.body).length ? true : false);
});

app.put('/api/updateQuantity/:id/:quantity', (req, res) => {
  let query = db.prepare(`
  UPDATE cart
   SET 
       quantity = :quantity
 WHERE id = :id ;
  `);


  //res.json(query.all(req.body).length ? true : false);
  res.json(query.run({ id: req.params.id, quantity: req.params.quantity }))
});

app.post('/api/addToCart', (req, res) => {
  let query = db.prepare(`
  INSERT INTO cart (
    id,
    name,
    price,
    type,
    email,
    quantity
)
VALUES (
    :id,
    :name,
    :price,
    :type,
    :email,
    :quantity
);
  `);

  res.json(query.run(req.body));
});
app.post('/api/addToFavourites', (req, res) => {
  let query = db.prepare(`
  INSERT INTO favourites (
    id,
    name,
    price,
    type,
    email
)
VALUES (
    :id,
    :name,
    :price,
    :type,
    :email
);
  `);

  res.json(query.run(req.body));
});
app.delete('/api/removeFromFavourites/:id', (req, res) => {
  let stmt = db.prepare(`
  DELETE FROM favourites
      WHERE id = :id
  `);

  res.json(stmt.run({ id: req.params.id }));
});
app.delete('/api/removeFromCart/:id', (req, res) => {
  let stmt = db.prepare(`
  DELETE FROM cart
      WHERE id = :id
  `);

  res.json(stmt.run({ id: req.params.id }));
});

app.delete('/api/emptyFavourites/:email', (req, res) => {
  let stmt = db.prepare(`
  DELETE FROM favourites
      WHERE email = :email
  `);
  res.json(stmt.run({ email: req.params.email }));
});
app.delete('/api/emptyCart/:email', (req, res) => {
  let stmt = db.prepare(`
  DELETE FROM cart
      WHERE email = :email
  `);

  res.json(stmt.run({ email: req.params.email }));
});

app.post('/api/login', (req, res) => {
  let query = db.prepare(`
  SELECT
       *
  FROM users WHERE email= :email AND password=:password ;

  `);


  res.json(query.all(req.body).length ? { data: req.body.email } : false);
});

app.post('/api/register', (req, res) => {
  console.log(req.body)
  var user = req.body;

  if (user != undefined) {

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

 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../build', 'index.html'));
 });

// start the web server
app.listen(4000, () => console.log('Listening on port 4000'));
