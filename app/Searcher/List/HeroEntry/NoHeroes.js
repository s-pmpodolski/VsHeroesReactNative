var {
		AppRegistry,
		Image,
		StyleSheet,
		Text,
		View,
		} = React;

var NoHeroes = React.createClass({
	render: function () {
		return (
			<View style={[styles.container, styles.centerText]}>
				<Text>No heroes found for '{this.props.name}'</Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	centerText: {
		alignItems: 'center'
	}
});

module.exports = NoHeroes;
