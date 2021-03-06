import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import {
  GraphQLDateTime,
} from 'graphql-iso-date';

import ReviewType from './review';
import Review from '../../controller/Review';
import GoogleBooks from '../../controller/GooglBooks';
import Favorites from '../../controller/Favorites';
import Utils from '../../utils';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: new GraphQLList(GraphQLString)
    },
    authors: {
      type: new GraphQLList(GraphQLString)
    },
    year: {
      type: GraphQLString
    },
    message: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    image: {
      type: GraphQLString
    },
    isFavorite: {
      type: GraphQLBoolean,
      resolve(parent, _, context) {
        const { authorization } = context.headers;
        const authorized = Utils.authenticate(authorization);
        return Favorites.checkFavorite(parent.id, authorized);
      }
    },
    userId: {
      type: GraphQLString
    },
    pageCount: {
      type: GraphQLInt
    },
    downloadable: {
      type: new GraphQLList(GraphQLString)
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent) {
        return Review.getBookReviews(parent.id);
      }
    },
    averageRating: {
      type: GraphQLFloat,
      resolve(parent) {
        return Review.getAverageRating(parent.id);
      }
    },
    googleAverageRating: {
      type: GraphQLFloat,
    },
    moreBooks: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return GoogleBooks.retrieveMoreBooks(parent.id);
      }
    },
    createdAt: {
      type: GraphQLDateTime
    },
    updatedAt: {
      type: GraphQLDateTime
    },
  })
});

export default BookType;
