const graphql = require('graphql');
const _= require('lodash');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema 
} = graphql;

var books = [
    {name:'Name of the wind',genre:'Fantasy',id:'1',authorId:'1'},
    {name:'Last Prince',genre:'Fantasy',id:'2',authorId:'2'},
    {name:'Final Empire',genre:'Action',id:'3',authorId:'3'},
    {name:'The Long Earth',genre:'Sci-Fi',id:'4',authorId:'4'},
    {name:'First Love',genre:'Romantic',id:'5',authorId:'5'},
];

var authors = [
    {name:'Heinrich Himler',age:34,id:'1'},
    {name:'Montes Carios',age:54,id:'2'},
    {name:'Hugo Fredricson',age:57,id:'3'},
    {name:'Michel Denvar',age:60,id:'4'},
    {name:'Ryoshi Kameshini',age:37,id:'5'},
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        genre: { type:GraphQLString },
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors, {id:parent.authorId})
            }
        }  
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        age: { type:GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(books, { id:args.id });
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors, { id:args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery 
});