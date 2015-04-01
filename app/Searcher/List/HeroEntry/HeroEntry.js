var React = require('react-native');
var {
		AppRegistry,
		Image,
		StyleSheet,
		Text,
		View,
		TouchableHighlight
		} = React;

var HeroThumbnail = require('./HeroThumbnail');
var HeroSearchActions = require('../../../flux/hero-searcher-actions');

var HeroEntry = React.createClass({
	onPress: function() {
		HeroSearchActions.setHero(this.props.hero.id);
	},
	render: function () {
		return (
			<TouchableHighlight onPress={this.onPress}>
				<View style={styles.container}>
					<HeroThumbnail url={this.props.thumbnail.path} type={"standard_medium"} extension={this.props.thumbnail.extension} />
					<View style={styles.rightContent}>
						<Text style={styles.name}>{this.props.hero.name}</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	rightContent:  {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	name: {
		fontSize: 20,
		marginBottom: 8,
		textAlign: 'center'
	}
});

module.exports = HeroEntry;
