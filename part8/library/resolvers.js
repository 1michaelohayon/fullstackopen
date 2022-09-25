const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user');


const JWT_SECRET = "SUPER_SECRET_KEY_HERE"


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
          existingAuthor.bookCount = existingAuthor.bookCount + 1

          author = await existingAuthor.save()

        } else {
          const newAuthor = new Author({ name: args.author, bookCount: 1 })
          author = await newAuthor.save()
        }


        const book = new Book({ ...args, author })

        await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

module.exports = resolvers