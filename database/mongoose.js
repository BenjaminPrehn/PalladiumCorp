// Import
const mongoose = require('mongoose');
require('dotenv').config();

// Moongose database connection string
mongoose.connect(process.env.DB_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  });