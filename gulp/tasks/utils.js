module.exports = {
	replaceDoubleToSingleQuote: function(value) {
		var escaped = value.replace(/"/g, "'");

		return escaped;
	}
};