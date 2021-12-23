const app = require('./app')

// Port 
const port = process.env.PORT || 8080;

// Server setup
app.listen(port, (error) => {
    if (error) {
        console.log('There was an issue starting your application ', error);
    }
    console.log('The app is running on port:', port);
});