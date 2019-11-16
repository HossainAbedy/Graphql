import {gql} from 'apollo-boost';

const getAuthorQuery = gql`
    {
        authors{
            name
            age
            id
        }
    }
`

const getBookQuery = gql`
    {
        books{
            name
            genre
            id
        }
    }
`

export {getAuthorQuery,getBookQuery}