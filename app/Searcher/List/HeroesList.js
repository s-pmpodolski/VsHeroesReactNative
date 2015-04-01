var React = require('react-native');
var {
		ListView,
		Image,
		StyleSheet,
		Text,
		View,
		} = React;

var HeroEntry= require('./HeroEntry/HeroEntry');

var HeroesList = React.createClass({
	getInitialState: function() {
		var ds = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});

		return {
			dataSource: ds.cloneWithRows(this.props.data)
		};
	},
	componentWillReceiveProps(props) {
		console.log(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});

		this.setState({
			dataSource: ds.cloneWithRows(props.data)
		});
	},
	renderHero: function(hero) {
		console.log(hero);
		return 	(
			<HeroEntry hero={hero} thumbnail={hero.thumbnail} />
		);
	},
	render: function () {
		console.log('render!', this.state, this.props);
		return (
			<View style={styles.list}>
			<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this.renderHero(rowData)}
					pageSize={5}
			/>
			</View>
		);
	}
});
var styles = StyleSheet.create({
	list: {
		flex: 1
	}
});


module.exports = HeroesList;
