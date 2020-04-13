const express = require('express');
const port = 5000;
const server = express();
server.use(express.json());

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`);
  next();
}

function atGate(req, res, next) {
  console.log('At the gate, about to be eaten');

  next();
}

function auth(req, res, next) {
  if(req.url === '/mellon') {
    next();
  } else {
    res.send("You shall not pass!");
  }
}

server.use(logger);
server.use(atGate);

server.get('/mellon', auth, (req, res) => {
  console.log('Gate opening... ');
  console.log('Inside and safe!');
  res.send('Welcome Traveler!');
})

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/hobbits', (req, res) => {
  const sortField = req.query.sortby || 'id';
  const hobbits = [
    {
      id: 1, 
      name: 'Samwise Gamgee'
    },
    {
      id: 3, 
      name: 'Bilbo Baggins'
    }, 
    {
      id: 2,
      name: 'Frodo Baggins'
    }
  ];

  const response = hobbits.sort((a, b) => 
    a[sortField] < b[sortField] ? -1 : 1
  );

res.status(200).json(response); 
});

  let hobbits = [
    {
      id: 1, 
      name: 'Bilbo Baggins', 
      age: 111
    },
    {
      id: 2,
      name: 'Frodo Baggins',
      age: 33
    }
  ];
  let nextId = 3;

server.post('/hobbits', (req, res) => {
  res.status(201).json({ url: '/hobbits', operation: 'POST' });
});

server.put('/hobbits', (req, res) => {
  res.status(200).json({ url: '/hobbits', operation: 'PUT' });
});

server.delete('/hobbits/:id', (req, res) => {
  res.status(204);
});

server.use(function(req, res) {
  res.status(404).send(`Ain't nobody got time for dat!`);
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});