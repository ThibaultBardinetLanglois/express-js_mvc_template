const express = require('express'),
    app = express(),
    cors = require('cors'),
    apiRouter = require('./routes/apiRoutes');


// Environnement variables
require('dotenv').config();

// database
require('./config/database')

// Cors options
const corsOptions = {
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
  }


// app middlewares
app.use(cors(corsOptions))
    .use(express.json())
    .use(express.urlencoded({extended:false}))//afin de parser les urls et d'envoyer le bon format lors d'un post
    .use('/api', apiRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port:${process.env.SERVER_PORT}`);
})