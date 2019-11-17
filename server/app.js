const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const mongooseURL = "mongodb+srv://Abedy:Supta1994@cluster0-e3eq8.mongodb.net/test?retryWrites=true&w=majority";
const cors = require('cors');

const app = express();

//allow cross origin requests
app.use(cors());

//connect to MongoDb 
mongoose.connect(mongooseURL,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to MongoDB Atlas"))
        .catch(err => console.log("Error: ", err.message));

//serve Graphql path from server
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true,
}))

//server static files
//app.use(express.static('public'))

//running server on port
app.listen(5000,() => {
    console.log("Listening for requests in port 5000");
});