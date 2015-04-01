var React = require('react-native');
var {
		AppRegistry,
		Image,
		StyleSheet,
		Text,
		View,
		TouchableHighlight
		} = React;

var HeroImage = require('./Description/HeroImage');
var HeroDescription = require('./Description/HeroDescription');

var Card = React.createClass({
	render: function () {
		console.log(this.props);
		return (
			<View style={styles.container}>
				<HeroImage {...this.props.thumbnail} />
				<HeroDescription description={this.props.description} />
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	}
});

module.exports = Card;
