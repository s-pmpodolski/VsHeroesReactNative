var dispatcher = require('../dispatcher/dispatcher');
var constants = require('./hero-searcher-constants');
var ActionTypes = constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var fetch = require('fetch');
var md5 = require('MD5');

var CHANGE_EVENT = 'change';

var defaultValue = function() {
    this.isSearchOpen = false;
    this.name = '';
    this.list = [];
};

var publicKey = '';
var privateKey = '';

var HeroSearchStore = assign({}, EventEmitter.prototype, {
    _state: {},

    getState: function() {
        if(this._state === undefined) {
            this._state = new defaultValue();
        }
        return this._state;
    },

    getList: function() {
      return this._state.list;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    openSearch: function() {
        this._state.isSearchOpen = true;
    },

    closeSearch: function() {
        this._state.isSearchOpen = false;
    },

    setName: function(name) {
        this._state.name = name;
    },

	urlForQuery: function(url, data) {

		var querystring = Object.keys(data)
				.map(key => key + '=' + encodeURIComponent(data[key]))
				.join('&');

		return url + '?' + querystring;
	},

    searchHero: function(name, callback) {
		this._state.name = name;

		var _self = this;

		var timestamp = Date.now();


		var props = {
			nameStartsWith: name,
			limit: 100,
			apikey: publicKey,
			ts: timestamp,
			hash: md5(timestamp + privateKey + publicKey)
		};

		var endpoint = 'http://gateway.marvel.com/v1/public/characters';
		var query = this.urlForQuery(endpoint, props);

		this.openSearch();

		fetch(query)
				.then((response) => response.json())
				.catch((error) => {
					console.log(error);
				})
				.then((responseData) => {
					console.log(responseData);
					_self._state.list = responseData.data.results;
					callback();
				})
				.done();
    },

	loadHero: function(id, callback) {
		var _self = this;

		var timestamp = Date.now();


		var props = {
			apikey: publicKey,
			ts: timestamp,
			hash: md5(timestamp + privateKey + publicKey)
		};

		var endpoint = 'http://gateway.marvel.com/v1/public/characters/'+id;
		var query = this.urlForQuery(endpoint, props);

		fetch(query)
				.then((response) => response.json())
				.catch((error) => {
					console.log(error);
				})
				.then((responseData) => {
					_self._state.hero = responseData.data.results[0];
					_self.closeSearch();
					callback();
				})
				.done();
	}
});

HeroSearchStore.dispatchToken = dispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.SEARCH_HERO:
            HeroSearchStore.searchHero(action.name, function(){
                HeroSearchStore.emitChange();
            });
            break;

        case ActionTypes.OPEN_SEARCH:
            HeroSearchStore.openSearch();
            HeroSearchStore.emitChange();
            break;

        case ActionTypes.CLOSE_SEARCH:
            HeroSearchStore.closeSearch();
            HeroSearchStore.emitChange();
            break;

        case ActionTypes.SET_NAME:
            HeroSearchStore.setName(action.name);
            HeroSearchStore.emitChange();
            break;

		case ActionTypes.SET_HERO:
			HeroSearchStore.loadHero(action.id, function(){
				HeroSearchStore.emitChange();
			});
			break;

        default:
        // do nothing
    }

});


module.exports = HeroSearchStore;
