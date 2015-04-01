var React = require('react-native');
var {
		AppRegistry,
		Image,
		StyleSheet,
		Text,
		View,
		TouchableHighlight
		} = React;

var HeroDesctiption = React.createClass({
	render: function () {
		return (
				<Text style={styles.container}>
					{this.props.description}
				</Text>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	}
});

module.exports = HeroDesctiption;
