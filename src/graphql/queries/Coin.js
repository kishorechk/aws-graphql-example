'use strict';
 
const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
} = GraphQL;
 
// import the Coin type we created
const CoinType = require('../types/Coin');
 
// import the Coin resolver we created
const CoinsController = require('../resolvers/Coin');
 
 
module.exports = {
 
	index() {
		return {
			type: new GraphQLList(CoinType),
			description: 'This will return all the coins we find in the given coin market cap.',
			args: {
                currency: {
					type: GraphQLString,
					description: 'Please enter the currency',
                },
				limit: {
					type: GraphQLString,
					description: 'Please enter number of records to be retrieved',
                },
                start: {
					type: GraphQLString,
					description: 'Please enter starting record of the page',
				}
			},
			resolve(parent, args, context, info) {
				return CoinsController.index(args);
			}
		}
	},
 
};