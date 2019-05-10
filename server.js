const express = require('express');
const app = express();
const path = require('path');

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/registration', (req, res)=>{
    res.sendFile(path.join(__dirname, '/registration.html'));
});
app.get('/', (req, res)=>{
    res.redirect('/registration');
});

app.listen(HTTP_PORT, ()=>{
    console.log(`Server listening at the port ${HTTP_PORT}...`);
});