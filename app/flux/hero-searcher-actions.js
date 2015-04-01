var dispatcher = require('../dispatcher/dispatcher.js');
var constants = require('./hero-searcher-constants.js');
var ActionTypes = constants.ActionTypes;

var actions = {
    searchHero: function(name) {
        dispatcher.dispatch({
            type: ActionTypes.SEARCH_HERO,
            name: name
        });
    },

    openSearch: function() {
        dispatcher.dispatch({
            type: ActionTypes.OPEN_SEARCH
        });
    },

    closeSearch: function() {
        dispatcher.dispatch({
            type: ActionTypes.CLOSE_SEARCH
        });
    },

    setName: function(name) {
        dispatcher.dispatch({
            type: ActionTypes.SET_NAME,
            name: name
        });
    },

	setHero: function(id) {
		dispatcher.dispatch({
			type: ActionTypes.SET_HERO,
			id: id
		});
	}
};

module.exports = actions;
