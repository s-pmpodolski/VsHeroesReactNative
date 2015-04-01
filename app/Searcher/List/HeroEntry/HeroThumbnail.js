var React = require('react-native');
var {
		Image,
	  	View,
		StyleSheet
	} = React;

var HeroThumbnail = React.createClass({
	render: function () {
		if (this.props.url === undefined) {
			return null;
		}
		var url = this.props.url + "/" + this.props.type + "." + this.props.extension;
		return (
			<View>
				<Image style={styles.thumbnail} source={{uri: url}} />
			</View>
		);
	}
});

var styles = StyleSheet.create({
	thumbnail: {
		width: 60,
		height: 80
	}
});

module.exports = HeroThumbnail;
