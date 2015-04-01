var React = require('react-native');
var {
		AppRegistry,
		Image,
		StyleSheet,
		Text,
		View,
		TouchableHighlight
		} = React;

var HeroImage = React.createClass({
	render: function () {
		console.log(this.props);
		if (this.props.path === undefined) {
			return (
				<View></View>
			);
		}
		var url = this.props.path + "/" + "landscape_incredible" + "." + this.props.extension;
		console.log(url);
		return (
				<View>
					<Image style={styles.thumbnail} source={{uri: url}} />
				</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	thumbnail: {
		width: 140,
		height: 100
	}
});

module.exports = HeroImage;
