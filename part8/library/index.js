require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./modals/book')
const Author = require('./modals/author')
const User = require('./modals/user')
const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require('jsonwebtoken')

const JWT_SECRET = "SUPER_SECRET_KEY_HERE"

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongoDB', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token { 
    value: String!
  }
  
  type Query { 
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String
      ): Token
  }
  
`;



const { v1: uuid } = require("uuid");


const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {

      const byGenre = async () =>
        await Book.find({ genres: { $in: args.genre } }).populate('author')

      const byAuthor = async () => {
        const getAuthor = await Author.findOne({ name: args.author })
        return await Book.find({ author: getAuthor._id }).populate('author')

      }

      const byBoth = async () => {
        const fitered = await byAuthor()
        console.log(typeof fitered)
        console.log(fitered)
        return fitered.filter(b => b.genres.includes(args.genre))
      }


      return !args.genre && !args.author
        ? await Book.find({}).populate('author')
        : args.author && args.genre
          ? byBoth()
          : args.author
            ? byAuthor()
            : byGenre()
    },
    allAuthors: async (root, args) => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  },
  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }

    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.messagem, {
          invalidArgs: args,
        })
      }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const existingAuthor = await Author.findOne({ name: args.author })
      let author
      try {
        if (existingAuthor) {
          author = existingAuthor
        } else {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }


        const book = new Book({ ...args, author })
        await book.save()
        return book
      } catch (error) {
        throw new UserInputError(error.messagem, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        const savedAuthor = await author.save()
        return savedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })

      }

    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)


      return { currentUser }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
