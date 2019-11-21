const graphql = require('graphql');
const _= require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema 
} = graphql;

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
                // return _.find(authors, {id:parent.authorId})
                return Author.findById(parent.authorId);
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
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books, { authorId:parent.id });
                return Book.find({authorId:parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type:BookType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                // return _.find(books, { id:args.id });
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                // return _.find(authors, { id:args.id });
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books;
                return Book.find({});
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type:AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age,
                });
                return author.save()
            }
        },
        addBook: {
            type:BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId,
                });
                return book.save()
            }
        },
        deleteBook:{
            type:BookType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, args){
                // return axios.delete('http://localhost:3000/customers/'+args.id)
                // .then(res => res.data);
            }
        },
        editBook:{
            type:BookType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
            },
            resolve(parentValue, args){
                // return axios.patch('http://localhost:3000/customers/'+args.id, args)
                // .then(res => res.data);
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation 
});



//Extra Mutations
// const mutation = new GraphQLObjectType({
//     name:'Mutation',
//     fields:{
//         addCustomer:{
//             type:CustomerType,
//             args:{
//                 name: {type: new GraphQLNonNull(GraphQLString)},
//                 email: {type: new GraphQLNonNull(GraphQLString)},
//                 age: {type: new GraphQLNonNull(GraphQLInt)}
//             },
//             resolve(parentValue, args){
//                 return axios.post('http://localhost:3000/customers', {
//                     name:args.name,
//                     email: args.email,
//                     age:args.age
//                 })
//                 .then(res => res.data);
//             }
//         },
//         deleteCustomer:{
//             type:CustomerType,
//             args:{
//                 id:{type: new GraphQLNonNull(GraphQLString)}
//             },
//             resolve(parentValue, args){
//                 return axios.delete('http://localhost:3000/customers/'+args.id)
//                 .then(res => res.data);
//             }
//         },
//         editCustomer:{
//             type:CustomerType,
//             args:{
//                 id:{type: new GraphQLNonNull(GraphQLString)},
//                 name: {type: GraphQLString},
//                 email: {type: GraphQLString},
//                 age: {type: GraphQLInt}
//             },
//             resolve(parentValue, args){
//                 return axios.patch('http://localhost:3000/customers/'+args.id, args)
//                 .then(res => res.data);
//             }
//         },
//     }
// });
