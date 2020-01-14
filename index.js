// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());


// POST // create a User
server.post('/api/users', (request, response) => {
    const { name, bio } = request.body; 

    if (!name || !bio) {
        response.status(400)
            .json({ errorMessage: 'Please provide name and bio for the user.' }) 
    } else {
        Users.insert(request.body)
            .then(user => {
            console.log(user);
            response.status(201).json(user);
        })
        .catch(error => {
            console.log(error);
            response.status(500)
                .json({ errorMessage: 'There was an error while saving the user to the database' })
        });
    }
});

// GET // see a list of Users
server.get('/api/users', (request, response) => {
    Users.find() 
        .then(users => {
            console.log('Users', users);
            response.status(200).json(users);
        })
        .catch(error => {
            console.log(error);
            // handle the error
            response.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
})

// GET // user by id
server.get('/api/users/:id', (request, response) => {
    const id = request.params.id;

    Users.findById(id)
      .then(user => {
        if (user) {
          response.status(200).json(user);
        } else {
          response.status(404).json({ message: 'The user with the specified ID does not exist.' });
        }
      })
      .catch(() => {
        response.status(500).json({ errorMessage: 'The user information could not be retrieved.' });
      });
  });

// DELETE //  user by id
server.delete('/api/users/:id', (request, response) => {
    const id = request.params.id;
    
    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                response.status(200).json(deleted);
            } else {
                response.status(404).json({ errorMessage:"The user with the specified ID does not exist" })
            }
        })
        .catch(error => {
            console.log(error);
            // handle the error
            response.status(500).json({
                errorMessage: "The user could not be removed",
            });
        });
});

// PUT // 
server.put('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const { name, bio } = request.body;

    if (!name || !bio) {
        response.status(400)
            .json({ errorMessage: "Please provide name and bio for the user." }) 
    }
    Users.update(id, {name, bio})
      .then(user => {
        if (user) {
          response.status(200).json(user);
        } else {
          response.status(404).json({ message: 'The user with the specified ID does not exist.' });
        }
      })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({ errorMessage: "The user information could not be modified." })
    })

})



const port = 8001;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
