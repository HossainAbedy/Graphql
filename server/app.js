const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql',graphqlHTTP({
    
}))

app.listen(5000,() => {
    console.log("Listening for requests in port 5000");
});