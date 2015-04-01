/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
		AppRegistry,
		StyleSheet,
		Image,
		Text,
		View,
		} = React;

var Card = require('./app/Card/Card');
var HeroSearcherStore = require('./app/flux/hero-searcher-store');
var HeroesList = require('./app/Searcher/List/HeroesList');
var SearchBox = require('./app/Searcher/SearchBox');

var VsHeroesReactNative = React.createClass({
	getInitialState: function () {
		return HeroSearcherStore.getState();
	},

	componentDidMount: function () {
		HeroSearcherStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		HeroSearcherStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState(HeroSearcherStore.getState());
	},
	render: function () {
		console.log(this.state);
		var content = (
			<View>
			</View>
		);

		if(this.state.isSearchOpen) {
			content = (
				<HeroesList data={this.state.list} />
			);
		} else if(this.state.hero !== undefined) {
			content = (
					<Card description={this.state.hero.description} thumbnail={this.state.hero.thumbnail}/>
			);
		}
		return (
			<View style={styles.container}>
				<SearchBox />
				<View style={styles.content}>
					{content}
				</View>
				<Text >
					Data provided by Marvel. © 2014 Marvel
				</Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 50
	},
	content: {
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'space-between'
	}
});

AppRegistry.registerComponent('VsHeroesReactNative', () => VsHeroesReactNative);
