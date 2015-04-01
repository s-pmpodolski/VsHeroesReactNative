var React = require('react-native');
var _ = require('underscore');
var HeroSearcherStore = require('../flux/hero-searcher-store');
var HeroSearchActions = require('../flux/hero-searcher-actions');

var {
		ListView,
		Image,
		StyleSheet,
		Text,
		View,
		TextInput,
		TouchableHighlight
		} = React;


var SearchBox = React.createClass({
	componentDidMount: function() {
		var _self = this;
		this.debounced = _.debounce(function(text) {
			_self.search(text);
		}, 500);
	},
	search: function(text) {
		if(text.length !== 0) {
			HeroSearchActions.searchHero(text);
		} else {
			HeroSearchActions.closeSearch();
		}
	},
	_onChangeText: function(text) {
		this.debounced(text);
	},
	render: function () {

		return (
			<TextInput
					style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, margin: 20}}
					onChangeText={this._onChangeText}
			/>
		);
	}
});


module.exports = SearchBox;
