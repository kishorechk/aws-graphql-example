'use strict';
 
const axios = require('axios');
 

Array.prototype.sortByProp = function(p){
	return this.sort(function(a,b){
	  return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	});
  };

const CoinsController = {
 
	index: ( args ) => {
 
		const URL = `https://api.coinmarketcap.com/v2/ticker/?convert=${ args.currency || 'USD' }&limit=${ args.limit || '20' }&start=${ args.start || '1' }`;
		
		return axios.get( URL )
			.then( (response) => {
				const __coins = [];
				
				const coins = response.data.data;
				for (var name in coins) {
					__coins.push( coins[name] );
				  }
				__coins.sortByProp('rank');
				return __coins;
			})
			.catch( (error) => {
				return { error: error }
			});
	},

	fetchQuotes: (quotes) => {
		const __quotes = [];
		for (var name in quotes) {
			var quote = quotes[name];
			quote.currency=name;
			__quotes.push( quote );
		  }
		return __quotes;
	}
 
 
}
 
module.exports = CoinsController;