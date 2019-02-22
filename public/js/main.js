// Local Forage

var dbName = 'cpDB';
var tableName = 'defaultTheme';

var dbThemesName = 'cpDBThemes';

if (clayCurrentVersion !== '2.3.3') {
	dbName = 'cpDB-' + clayCurrentVersion;
	dbThemesName = 'cpDBThemes-' + clayCurrentVersion;
}

cpDB = localforage.createInstance({
	name: dbName,
	storeName: tableName
});

cpDBThemes = localforage.createInstance({
	name: dbThemesName,
	storeName: 'themes'
});

cpDBThemes.getItem('currentTheme').then(function(value) {
	if (!value) {
		cpDBThemes.setItem(tableName, tableName);
		cpDBThemes.setItem('currentTheme', tableName);
	}
});

// HTML 5 Support

var isInputColorSupported = (function() {
	var input = $('<input>');
	var supported = true;

	input.attr('type', 'color');

	if (input.val() === '') {
		supported = false;

		$('body').addClass('input-color-shim');
	}

	return supported;
})();

// Clay Paver Color Picker

var htmlColorNames = {
	'aliceblue':				'#f0f8ff',
	'antiquewhite':				'#faebd7',
	'aqua':						'#00ffff',
	'aquamarine':				'#7fffd4',
	'azure':					'#f0ffff',
	'beige':					'#f5f5dc',
	'bisque':					'#ffe4c4',
	'black':					'#000000',
	'blanchedalmond':			'#ffebcd',
	'blue':						'#0000ff',
	'blueviolet':				'#8a2be2',
	'brown':					'#a52a2a',
	'burlywood':				'#deb887',
	'cadetblue':				'#5f9ea0',
	'chartreuse':				'#7fff00',
	'chocolate':				'#d2691e',
	'coral':					'#ff7f50',
	'cornflowerblue':			'#6495ed',
	'cornsilk':					'#fff8dc',
	'crimson':					'#dc143c',
	'cyan':						'#00ffff',
	'darkblue':					'#00008b',
	'darkcyan':					'#008b8b',
	'darkgoldenrod':			'#b8860b',
	'darkgray':					'#a9a9a9',
	'darkgrey':					'#a9a9a9',
	'darkgreen':				'#006400',
	'darkkhaki':				'#bdb76b',
	'darkmagenta':				'#8b008b',
	'darkolivegreen':			'#556b2f',
	'darkorange':				'#ff8c00',
	'darkorchid':				'#9932cc',
	'darkred':					'#8b0000',
	'darksalmon':				'#e9967a',
	'darkseagreen':				'#8fbc8f',
	'darkslateblue':			'#483d8b',
	'darkslategray':			'#2f4f4f',
	'darkslategrey':			'#2f4f4f',
	'darkturquoise':			'#00ced1',
	'darkviolet':				'#9400d3',
	'deeppink':					'#ff1493',
	'deepskyblue':				'#00bfff',
	'dimgray':					'#696969',
	'dimgrey':					'#696969',
	'dodgerblue':				'#1e90ff',
	'firebrick':				'#b22222',
	'floralwhite':				'#fffaf0',
	'forestgreen':				'#228b22',
	'fuchsia':					'#ff00ff',
	'gainsboro':				'#dcdcdc',
	'ghostwhite':				'#f8f8ff',
	'gold':						'#ffd700',
	'goldenrod':				'#daa520',
	'gray':						'#808080',
	'grey':						'#808080',
	'green':					'#008000',
	'greenyellow':				'#adff2f',
	'honeydew':					'#f0fff0',
	'hotpink':					'#ff69b4',
	'indianred':				'#cd5c5c',
	'indigo':					'#4b0082',
	'ivory':					'#fffff0',
	'khaki':					'#f0e68c',
	'lavender':					'#e6e6fa',
	'lavenderblush':			'#fff0f5',
	'lawngreen':				'#7cfc00',
	'lemonchiffon':				'#fffacd',
	'lightblue':				'#add8e6',
	'lightcoral':				'#f08080',
	'lightcyan':				'#e0ffff',
	'lightgoldenrodyellow':		'#fafad2',
	'lightgrey':				'#d3d3d3',
	'lightgreen':				'#90ee90',
	'lightpink':				'#ffb6c1',
	'lightsalmon':				'#ffa07a',
	'lightseagreen':			'#20b2aa',
	'lightskyblue':				'#87cefa',
	'lightslategray':			'#778899',
	'lightslategrey':			'#778899',
	'lightsteelblue':			'#b0c4de',
	'lightyellow':				'#ffffe0',
	'lime':						'#00ff00',
	'limegreen':				'#32cd32',
	'linen':					'#faf0e6',
	'magenta':					'#ff00ff',
	'maroon':					'#800000',
	'mediumaquamarine':			'#66cdaa',
	'mediumblue':				'#0000cd',
	'mediumorchid':				'#ba55d3',
	'mediumpurple':				'#9370d8',
	'mediumseagreen':			'#3cb371',
	'mediumslateblue':			'#7b68ee',
	'mediumspringgreen':		'#00fa9a',
	'mediumturquoise':			'#48d1cc',
	'mediumvioletred':			'#c71585',
	'midnightblue':				'#191970',
	'mintcream':				'#f5fffa',
	'mistyrose':				'#ffe4e1',
	'moccasin':					'#ffe4b5',
	'navajowhite':				'#ffdead',
	'navy':						'#000080',
	'oldlace':					'#fdf5e6',
	'olive':					'#808000',
	'olivedrab':				'#6b8e23',
	'orange':					'#ffa500',
	'orangered':				'#ff4500',
	'orchid':					'#da70d6',
	'palegoldenrod':			'#eee8aa',
	'palegreen':				'#98fb98',
	'paleturquoise':			'#afeeee',
	'palevioletred':			'#d87093',
	'papayawhip':				'#ffefd5',
	'peachpuff':				'#ffdab9',
	'peru':						'#cd853f',
	'pink':						'#ffc0cb',
	'plum':						'#dda0dd',
	'powderblue':				'#b0e0e6',
	'purple':					'#800080',
	'rebeccapurple':			'#663399',
	'red':						'#ff0000',
	'rosybrown':				'#bc8f8f',
	'royalblue':				'#4169e1',
	'saddlebrown':				'#8b4513',
	'salmon':					'#fa8072',
	'sandybrown':				'#f4a460',
	'seagreen':					'#2e8b57',
	'seashell':					'#fff5ee',
	'sienna':					'#a0522d',
	'silver':					'#c0c0c0',
	'skyblue':					'#87ceeb',
	'slateblue':				'#6a5acd',
	'slategray':				'#708090',
	'slategrey':				'#708090',
	'snow':						'#fffafa',
	'springgreen':				'#00ff7f',
	'steelblue':				'#4682b4',
	'tan':						'#d2b48c',
	'teal':						'#008080',
	'thistle':					'#d8bfd8',
	'tomato':					'#ff6347',
	'turquoise':				'#40e0d0',
	'violet':					'#ee82ee',
	'wheat':					'#f5deb3',
	'white':					'#ffffff',
	'whitesmoke':				'#f5f5f5',
	'yellow':					'#ffff00',
	'yellowgreen':				'#9acd32',
};

var RGB_REGEX = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
var RGBA_REGEX = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\.(\d+)\)/;

var ClayPaverColorPicker = {
	_getHtmlColorHex: function(colorName) {
		return htmlColorNames[colorName];
	},

	_getColor: function(color) {
		var el = $('<div>');

		el.css({ backgroundColor: color });

		return el.css('background-color');
	},

	getHex: function(color) {
		var hex = '#ffffff';
		var rgbaColor = this._getColor(color);

		if (rgbaColor !== '' && !rgbaColor.match(RGBA_REGEX)) {
			var rgbColorArr = rgbaColor.match(RGB_REGEX);

			if (rgbColorArr) {
				var hexValue1 = parseInt(rgbColorArr[1]).toString(16).slice(-2);
				var hexValue2 = parseInt(rgbColorArr[2]).toString(16).slice(-2);
				var hexValue3 = parseInt(rgbColorArr[3]).toString(16).slice(-2);

				if (hexValue1.length === 1) {
					hexValue1 = '0' + hexValue1;
				}

				if (hexValue2.length === 1) {
					hexValue2 = '0' + hexValue2;
				}

				if (hexValue3.length === 1) {
					hexValue3 = '0' + hexValue3;
				}

				hex = '#' + hexValue1 + hexValue2 + hexValue3;
			}
			else {
				hex = this._getHtmlColorHex(rgbaColor);
			}
		}

		return hex;
	},
};


// Clay Paver

var cpSpinnerTPL = '<div class="cp-loading"><div class="cp-loading-spinner"><div class="lds-heart-container"><div class="lds-heart"><div class="lds-heart-icon"></div></div></div><span class="cp-loading-msg">Loading...</span></div></div>';

var cpStatusBarTPL = '<div class="cp-status-bar"><span class="cp-status-bar-msg"></span></div>';

var SASS_VAR_REGEX = /\$(.*?)(?=:)/g;

var SASS_VALUE_REGEX = /:(.*?)(?=;)/g;

var ClayPaver = {
	compileSass: function () {
		var sbVariableGroup = '';

		cpDBThemes.getItem('currentTheme').then(function(value) {
			cpDB.config({
				name: dbName,
				storeName: value
			});

			cpDB = localforage.createInstance({
				name: dbName,
				storeName: value
			});

			cpDB.iterate(function(value, key, iterationNumber) {
				for (var item in value) {
					if (value[item] !== '') {
						sbVariableGroup = sbVariableGroup + '$' + item + ': ' + value[item] + ';';
					}
				}
			}).then(function() {
				var atlasAll = $('#atlasAll');

				sass.writeFile('_custom-variables.scss', sbVariableGroup);

				if (atlasAll.length) {
					setTimeout(function() {
						ClayPaver.showStatusBar('Compiling ' + value + ' Sass...');
					}, 750);
				}

				sass.compile('@import "clay-bootstrap-functions";@import "custom-variables";@import "atlas-all";@import "_cp-site-stuff";', function(result) {
					ClayPaver.showLoadingMsg('');

					if (atlasAll.length) {
						$('#atlasAll').html(result.text);
					}
					else {
						$('head').prepend('<style id="atlasAll">' + result.text + '</style>');
					}

					if (result.status) {
						setTimeout(function() {
							ClayPaver.showStatusBar('There was an error, please check the browser console.');
						}, 750);

						console.log(result.formatted);
					}

					var cpCompileDone = new Event('cp-compile-done');

					document.dispatchEvent(cpCompileDone);

					ClayPaver.removeLoadingMsg();

					ClayPaver.removeStatusBar();

					Turbolinks.clearCache();
				});
			});

		});
	},

	getVarName: function(item) {
		return item.substring(5, item.length - 1);
	},

	populateForm: function() {
		var formId = $('.cp-variables-form').attr('id');

		if ($('.cp-variables-form').length) {
			$('.cp-variables-form .cp-form-control[type="text"]').val('');

			cpDBThemes.getItem('currentTheme').then(function(value) {
				cpDB.config().storeName = value;

				cpDB = localforage.createInstance({
					name: dbName,
					storeName: value
				});

				cpDB.getItem(compileOrder[formId]).then(function(value) {
					for (var item in value) {
						var input = $('#' + item);
						var colorInput = input.find('+ .cp-form-control-color');

						if (value[item].match(/^\(/)) {
							var sassMap = value[item].match(/^[\s](.*)(?=,)/gm);

							for (var i = 0; i < sassMap.length; i++) {
								var sassMapItem = '$' + item + '-' + sassMap[i].trim() + ';';
								var sassMapVarArr = ClayPaver.regexMatchVarName(sassMapItem);
								var sassMapValueArr = ClayPaver.regexMatchValueName(sassMapItem);

								var sassMapVar = sassMapVarArr[0].slice(1, sassMapVarArr[0].length);
								var sassMapValue = sassMapValueArr[0].slice(1, sassMapValueArr[0].length).trim();

								$('#' + sassMapVar).val(sassMapValue);
							}
						}

						input.val(value[item]);

						if (colorInput.length) {
							if (value[item] === '') {
								colorInput.val('#ffffff');
							}
							else {
								colorInput.val(ClayPaverColorPicker.getHex(value[item]));
							}
						}
					}
				}).catch(function(err) {
					console.log(err);
				});
			});
		}
	},

	setVariableGroup: function(groupId, formValues) {
		var varName;
		var varVal;
		var variableGroup = {};

		for (var i = 0; i < formValues.length; i++) {
			varName = ClayPaver.getVarName(formValues[i].name);
			varVal = formValues[i].value;

			variableGroup[varName] = varVal;
		}

		cpDB.setItem(
			groupId, variableGroup
		).then(function() {
			ClayPaver.compileSass();
		});
	},

	updateSwitchThemesDD: function() {
		$('#cpSwitchThemes + .clay-paver-dropdown-menu .cp-theme-item').remove();

		cpDBThemes.iterate(function(value, key, iterationNumber) {
			var liTPL = '';

			if (key !== 'currentTheme') {
				liTPL = '<li class="cp-theme-item"><a class="cp-page-link" data-theme="' + value + '" data-toggle="switch-theme" href="">' + value + '</a></li>';
			}

			$('#cpSwitchThemes').closest('.dropdown').find('.clay-paver-dropdown-menu').append(liTPL);
		});
	},

	updateThemeName: function() {
		cpDBThemes.getItem('currentTheme').then(function(value) {
			$('.current-theme-name').text(value);
		});
	},

	removeStatusBar: function() {
		$('.cp-status-bar').remove();
	},

	showStatusBar: function(msg) {
		if (!$('.cp-status-bar').length) {
			$('body').append(cpStatusBarTPL);
		}

		$('.cp-status-bar-msg').text(msg);

		setTimeout(function() {
			$('.cp-status-bar').css({ opacity: 1 });
		}, 0);
	},

	removeLoadingMsg: function() {
		$('.cp-loading').remove();
	},

	showLoadingMsg: function(msg) {
		$('.cp-loading .cp-loading-msg').text(msg);
	},

	regexMatchVarName: function(str) {
		return str.match(SASS_VAR_REGEX);
	},

	regexMatchValueName: function(str) {
		return str.match(SASS_VALUE_REGEX);
	},
};

// Sass js

Sass.setWorkerUrl('../js/sass.worker.js');

var sass;

if (!sass) {
	$('body').prepend(cpSpinnerTPL);

	sass = new Sass();

	var preloadBase = '../../scss/' + clayCurrentVersion;
	var preloadDir = '';
	var preloadFiles = [
		'clay-bootstrap-functions.scss',
		'atlas-all.scss',
		'_cp-site-stuff.scss',
	];

	sass.preloadFiles(preloadBase, preloadDir, preloadFiles, function callback() {
		ClayPaver.showLoadingMsg('Compiling Sass...');

		setTimeout(function() {
			ClayPaver.showLoadingMsg("I'm almost done...");
		}, 5000);

		ClayPaver.updateThemeName();

		ClayPaver.updateSwitchThemesDD();

		ClayPaver.compileSass();
	});
}

// CP Variables Form

var doc = $(document);

doc.on('click', '#cpDataClearAll', function(event) {
	event.preventDefault();

	if (confirm('Do you want to DELETE ALL site data?')) {
		cpDB.clear().then(function() {
			location.reload();
		});

		cpDB.dropInstance({ name: dbName });
	}
});

doc.on('click', '#cpDataClearCurrent', function(event) {
	event.preventDefault();

	cpDBThemes.getItem('currentTheme').then(function(value) {
		if (confirm('Do you want to DELETE: ' + value + ' ?')) {
			cpDB.clear().then(function() {
				ClayPaver.showStatusBar('Deleting ' + value + '...');

				cpDBThemes.setItem('currentTheme', 'defaultTheme').then(function(value) {
					ClayPaver.populateForm();
					ClayPaver.compileSass();
					ClayPaver.updateThemeName();
					ClayPaver.updateSwitchThemesDD();
				});
			});

			if (value !== 'defaultTheme') {
				cpDBThemes.removeItem(value);
			}
		}
	});
});

doc.on('submit', '#addNewTheme', function(event) {
	event.preventDefault();

	var formValues = $(this).serializeArray();

	$(this).find('.cp-form-control').val('');

	cpDBThemes.setItem(formValues[0].value, formValues[0].value).then(function(value) {
		ClayPaver.showStatusBar('Switching theme to: ' + value + '...');
		ClayPaver.updateSwitchThemesDD();

		cpDBThemes.setItem('currentTheme', value).then(function() {
			ClayPaver.populateForm();
			ClayPaver.compileSass();
			ClayPaver.updateThemeName();
		});
	});
});

doc.on('click', '#downloadVariables', function(event) {
	event.preventDefault();

	var sbVariableGroup = '';

	cpDB.iterate(function(value, key, iterationNumber) {
		for (var item in value) {
			if (value[item] !== '') {
				sbVariableGroup = sbVariableGroup + '$' + item + ': ' + value[item] + ';\n';
			}
		}
	}).then(function() {
		$('body').append('<a download="_custom-variables.scss" href="data:text/plain;charset=UTF-8,' + encodeURIComponent(sbVariableGroup) + '"id="downloadVariablesTemp"></a>');

		document.getElementById('downloadVariablesTemp').click();

		$('#downloadVariablesTemp').remove();
	});
});

doc.on('click', '.cp-unset-link', function(event) {
	event.preventDefault();

	var textInput = $(this).closest('.cp-form-group').find('.cp-form-control[type="text"]');

	var variableName = ClayPaver.getVarName(textInput.attr('name'));

	if (textInput.val() === '!default') {
		cpDBThemes.getItem('currentTheme').then(function(value) {
			cpDB.config().storeName = value;

			cpDB = localforage.createInstance({
				name: dbName,
				storeName: value
			});

			cpDB.getItem(compileOrder[cpMasterList[variableName].groupId]).then(function(value) {
				if (value[variableName] === '!default') {
					textInput.val('');
				}
				else {
					textInput.val(value[variableName]);
				}
			});
		});
	}
	else {
		textInput.val('!default');
	}

	textInput.focus();
});

// Color Picker

doc.on('change', '.cp-form-control-color', function(event) {
	var colorInput = $(this);

	colorInput.closest('.cp-form-group').find('.cp-form-control[type="text"]').val(colorInput.val());
});

var SASS_VAR_REGEX = /^$/;
var SASS_UNSET_REGEX = /^!/;

doc.on('change', '.cp-form-group-color .cp-form-control[type="text"]', function(event) {
	var colorInput = $(this).find('+ .cp-form-control-color');
	var colorValue = $(this).val();

	if (!colorValue.match(SASS_VAR_REGEX) || !colorValue.match(SASS_UNSET_REGEX)) {
		colorInput.val(ClayPaverColorPicker.getHex(colorValue));
	}
});

// Sass Map

doc.on('change', '.cp-form-group-sass-map .cp-form-control', function(event) {
	var sb = '';
	var sassMapGroup = $(this).closest('.cp-form-group-sass-map');

	var sassMapPrefix = sassMapGroup.find('.cp-form-control-sass-map').attr('id');
	var inputs = sassMapGroup.find('.cp-form-control[type="text"]');

	inputs.each(function(index) {
		var id = $(this).attr('id').slice(sassMapPrefix.length + 1);
		var val = $(this).val();

		if (val !== '') {
			sb += '\t' + id + ': ' + val + ',\n';
		}
	});

	if (sb !== '') {
		sb = '(\n' + sb + ')';
	}

	sassMapGroup.find('.cp-form-control-sass-map').val(sb);
});

// Variables Form

doc.on('submit', '.cp-variables-form', function(event) {
	event.preventDefault();

	var formId = $(this).attr('id');
	var formValues = $(this).serializeArray();

	ClayPaver.setVariableGroup(compileOrder[formId], formValues);

	ClayPaver.showStatusBar('Saved...');
});

doc.on('click', '#resetButton', function(event) {
	event.preventDefault();

	if (confirm('Clear ALL the variables on this page?')) {
		$('.cp-variable-sidebar-body .cp-form-control').val('');
		$(this).closest('.cp-variables-form').submit();
	}
});

doc.on('keyup', '#cpVariableSearch .cp-form-control', function() {
	var value = $(this).val().toLowerCase();

	$('.cp-variables-form .cp-control-label').filter(function() {
		$(this).closest('.cp-form-group').toggle($(this).text().toLowerCase().indexOf(value) > -1);
	});
});

// Navigation Buttons

doc.on('click', '[data-toggle="switch-theme"]', function(event) {
	event.preventDefault();

	var themeName = $(this).data('theme');

	cpDBThemes.setItem('currentTheme', themeName).then(function(value) {
		ClayPaver.showStatusBar('Loading: ' + value);
		ClayPaver.populateForm();
		ClayPaver.compileSass();
		ClayPaver.updateThemeName();
	});
});

var BACK_REFERENCE = '$1';
var STRIP_COMMENTS_REGEX = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
var STRIP_WHITE_SPACE_REGEX = / /g;
var SASS_VAR_REGEX = /\$(.*?)(?=:)/g;
// var SASS_VALUE_REGEX = /:(.*?)(?=;)/g;
var SASS_VALUE_REGEX = /:(\s*?.*?)*?(?=;)/g

function importSassVariables(content) {
	var importVars = content.replace(STRIP_COMMENTS_REGEX, BACK_REFERENCE);

	var importVarNamesArr = importVars.match(SASS_VAR_REGEX);

	var importValsArr = importVars.match(SASS_VALUE_REGEX);

	if (importVarNamesArr && importValsArr) {
		cpDBThemes.getItem('currentTheme').then(function(value) {
			ClayPaver.showStatusBar('Importing variables to: ' + value);
		});

		for (var i = 0; i < importVarNamesArr.length; i++) {
			importVarNamesArr[i] = importVarNamesArr[i].substring(1, importVarNamesArr[i].length).trim();
		}

		for (var i =0; i < importValsArr.length; i++) {
			importValsArr[i] = importValsArr[i].substring(1, importValsArr[i].length).trim();
		}

		for (groupName in compileOrder) {
			var groupData = {};

			for (var i = 0; i < importVarNamesArr.length; i++) {
				var name = importVarNamesArr[i];
				var val = importValsArr[i];

				if (cpMasterList[name]) {
					if (cpMasterList[name].groupId === groupName) {
						groupData[name] = val;
					}
				}
			}

			if (Object.keys(groupData).length !== 0) {
				cpDB.setItem(compileOrder[groupName], groupData);
			}
		}

		ClayPaver.compileSass();
	}
	else {
		ClayPaver.showStatusBar('Input is invalid.');
	}
}

doc.on('submit', '#importSassVariables', function(event) {
	event.preventDefault();

	importSassVariables($(this).find('textarea').val());
});

doc.on('submit', '#importSassVariablesFromURL', function(event) {
	event.preventDefault();

	fetch($(this).find('input').val())
		.then(function(response) {
			return response.text();
		})
		.then(importSassVariables)
		.catch(function(err) {
			ClayPaver.showStatusBar('Could not import from url: ' + url);
		});
});

// Populate Form

doc.on('turbolinks:load', function() {
	ClayPaver.populateForm();
	ClayPaver.updateThemeName();
});

// Site Stuff

doc.on('click', '[href="#1"]', function(event) {
	event.stopPropagation();
	event.preventDefault();
});