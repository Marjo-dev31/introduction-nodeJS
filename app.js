const fs = require('fs');
const path = require('path');  /*route*/
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/currenttime', function (req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
});

app.get('/', function (req, res) {
    res.send('<form action="/store-user" method="POST"><label>Your name: </label><input type="text" name="username"><button>Submit</button></form>');
});

app.post('/store-user', function (req, res) {
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json'); /*fichier vers lequel les donnnées vont être envoyées en text raw*/

    const fileData = fs.readFileSync(filePath); /*pointe/lit les données du filePath*/
    const existingUsers = JSON.parse(fileData); /* transforme json de fileData en objet JS*/

    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); /*transforme JS en text*/

    res.send('<h1>Username stored!</h1>');
})

app.get('/user', function (req, res) {
    const filePath = path.join(__dirname, 'data', 'users.json'); /*fichier vers lequel les donnnées vont être envoyées en text raw*/

    const fileData = fs.readFileSync(filePath); /*pointe/lit les données du filePath*/
    const existingUsers = JSON.parse(fileData); /* transforme json de fileData en objet JS*/

    let responseData = '<ul>';

    for (const user of existingUsers) {
        responseData += '<li>' + user + '</li>';
    }
    responseData += '</ul>';
    
    res.send(responseData);
});

app.listen(3000);