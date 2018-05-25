'use strict';
 
const GraphQL = require('graphql');
const globalIdField = require('graphql-relay');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
} = GraphQL;
 
const CoinsController = require('../resolvers/Coin');

const coinTickerType = new GraphQLObjectType({
  name: "Ticker",
  fields: () => ({
    id: {
			type: GraphQLID,
			description: 'ID of the coin ticker',
		},
    currency: {
      type: GraphQLString,
      description: "Currency"
    },
    price: {
      type: GraphQLFloat,
      description: "Price"
    },
    volume_24h: {
      type: GraphQLFloat,
      description: "Volume 24hr"
    },
    market_cap: {
      type: GraphQLFloat,
      description: "Coin market cap"
    },
    percent_change_1h: {
      type: GraphQLFloat,
      description: "percent change 1h"
    },
    percent_change_24h: {
      type: GraphQLFloat,
      description: "percent_change_24h"
    },
    percent_change_7d: {
      type: GraphQLFloat,
      description: "percent_change_7d"
    }
  })
});

const CoinType = new GraphQL.GraphQLObjectType({
	name: 'Coin',
	description: 'Coin Type, For all the coins present in Coin Market Cap.',
 
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the coin',
		},
          name: {
            type: GraphQLString,
            description: "Coin name"
          },
          symbol: {
            type: GraphQLString,
            description: "Coin symbol"
          },
          websiteSlug: {
            type: GraphQLString,
            description: "Coin website slug",
            resolve: coin => coin.website_slug
          },
          rank: {
            type: GraphQLInt,
            description: "Coin Rank"
          },
          circulatingSupply: {
            type: GraphQLFloat,
            description: "Coin circulating supply",
            resolve: coin => coin.circulating_supply
          },
          totalSupply: {
            type: GraphQLFloat,
            description: "Coin circulating supply",
            resolve: coin => coin.total_supply
          },
          maxSupply: {
            type: GraphQLFloat,
            description: "Coin max supply",
            resolve: coin => coin.max_supply
          },
          lastUpdated: {
            type: GraphQLInt,
            description: "last updated",
            resolve: coin => coin.last_updated
          },
          tickers: {
            type: new GraphQLList(coinTickerType),
            description: "Coin tickers",
            resolve: coin => CoinsController.fetchQuotes(coin.quotes)
          }
 
	})
 
});
 
 
module.exports = CoinType;