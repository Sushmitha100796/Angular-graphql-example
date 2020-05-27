import gql from 'graphql-tag';


export const getBooksList = gql`
{
    books{
      name
      genre
      id
    }
  }
`;

export const getAuthorsList = gql`
{
    authors{
      name
      age
      id
    }
  }`

export const addBookMutation = gql`
 mutation addBook($name: String!, $genre: String!, $authorID: ID!){
    addBook(name: $name,genre: $genre,authorID: $authorID){
        name
        id
    }
}
`
export const getBookById = gql`
   { book(id: "5ec7902947d5e336d1bbde96"){
        name
        genre
        author {
            name
            age
            books {
              name
            }
        }
    }
  }
`