const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log('There was an issue starting your application ', error);
    }
    console.log('The app is running on port: ', port);
    console.log('This is just my change to the app');
    console.log('why didnøt it see mt changes :/');
});