// Local Forage

var dbName = 'cpDB';
var tableName = 'defaultTheme';

cpDB = localforage.createInstance({
	name: dbName,
	storeName: tableName
});

cpDBThemes = localforage.createInstance({
	name: 'cpDBThemes',
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

var ClayPaverColorPicker = {
	_getHtmlColorHex: function(colorName) {
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

		return htmlColorNames[colorName];
	},

	_getColor: function(color) {
		var el = $('<div>');

		el.css({ backgroundColor: color });

		return el.css('background-color');
	},

	getHex: function(color) {
		var RGB_REGEX = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
		var RGBA_REGEX = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\.(\d+)\)/;

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
				var atlasFontAwesome = $('#atlasFontAwesome');

				sass.writeFile('_custom-variables.scss', sbVariableGroup);

				if (atlasFontAwesome.length) {
					setTimeout(function() {
						ClayPaver.showStatusBar('Compiling ' + value + ' Sass...');
					}, 750);
				}

				sass.compile('@import "custom-variables"; @import "atlas-all";', function(result) {
					ClayPaver.showLoadingMsg('');

					if (atlasFontAwesome.length) {
						$('#atlasFontAwesome').html(result.text);
					}
					else {
						$('head').prepend('<style id="atlasFontAwesome">' + result.text + '</style>');
					}

					if (result.status) {
						setTimeout(function() {
							ClayPaver.showStatusBar('There was an error, please check the browser console.');
						}, 750);

						console.log(result.formatted);
					}

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

			// last item in loop
			if (i === (formValues.length - 1)) {
				cpDB.setItem(
					groupId, variableGroup
				).then(function() {
					ClayPaver.compileSass();
				});
			}
		}
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
};

// Sass js

Sass.setWorkerUrl('js/sass.worker.js');

var sass;

if (!sass) {
	$('body').prepend(cpSpinnerTPL);

	sass = new Sass();

	var preloadBase = '../../scss';
	var preloadDir = '';
	var preloadFiles = [
		'atlas-all.scss',
	];

	sass.preloadFiles(preloadBase, preloadDir, preloadFiles, function callback() {
		ClayPaver.showLoadingMsg('Compiling Sass...');

		setTimeout(function() {
			ClayPaver.showLoadingMsg("I'm almost done...");
		}, 5000);

		ClayPaver.compileSass();
	});
}

// CP Variables Form

var doc = $(document);

doc.on('click', '#cpDataClearAll', function(event) {
	event.preventDefault();

	if (confirm('Do you want to DELETE ALL site data?')) {
		// Local Forage hack bc docs suck...
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

	var instance = $(this);
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

doc.on('change', '.cp-form-group-color .cp-form-control[type="text"]', function(event) {
	var SASS_VAR_REGEX = /^$/;
	var SASS_UNSET_REGEX = /^!/;

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
		sb = '(\n' + sb;
		sb += ')';
	}

	sassMapGroup.find('.cp-form-control-sass-map').val(sb);
	console.log(sassMapGroup.find('.cp-form-control-sass-map').val());
});

// Variables Form

doc.on('submit', '.cp-variables-form', function(event) {
	event.preventDefault();

	var formId = $(this).attr('id');
	var formValues = $(this).serializeArray();
	console.log(formValues);
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

doc.on('submit', '#importSassVariables', function(event) {
	event.preventDefault();

	var BACK_REFERENCE = '$1';
	var STRIP_COMMENTS_REGEX = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
	var STRIP_WHITE_SPACE_REGEX = / /g;
	var SASS_VAR_REGEX = /\$(.*?)(?=:)/g;
	var SASS_VALUE_REGEX = /:(.*?)(?=;)/g;

	var importVars = $(this).find('textarea').val().replace(STRIP_COMMENTS_REGEX, BACK_REFERENCE);

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
});

ClayPaver.updateThemeName();
ClayPaver.updateSwitchThemesDD();

// Populate Form

doc.on('turbolinks:load', function() {
	ClayPaver.populateForm();
});

var compileOrder = {
	'home':							'aa',
	'alert':						'ab',
	'label':						'ac',
	'badge':						'ad',
	'sticker':						'ae',
	'button':						'af',
	'breadcrumb':					'ag',
	'card':							'ah',
	'dropdown':						'ai',
	'figure':						'aj',
	'input':						'ak',
	'input-sizes':					'al',
	'input-disabled':				'am',
	'input-readonly':				'an',
	'input-validation':				'ao',
	'list-group':					'ap',
	'modal':						'aq',
	'nameplate':					'ar',
	'nav':							'as',
	'nav-pills':					'at',
	'nav-tabs':						'au',
	'navbar':						'av',
	'management-bar':				'aw',
	'pager':						'ax',
	'pagination':					'ay',
	'panel':						'az',
	'popover':						'ba',
	'progress-bar':					'bb',
	'multi-step-progress-bar':		'bc',
	'sidebar':						'bd',
	'table':						'be',
	'tooltip':						'bf',
	'timeline':						'bg',
	'toggle-card':					'bh',
	'toggle-switch':				'bi',
	'user-icon':					'bj',
	'blockquote':					'bk',
};

var cpMasterList = {
	'gray-base': { groupId: 'home' },
	'gray-darker': { groupId: 'home' },
	'gray-dark': { groupId: 'home' },
	'gray': { groupId: 'home' },
	'gray-light': { groupId: 'home' },
	'gray-lighter': { groupId: 'home' },
	'brand-default': { groupId: 'home' },
	'brand-primary': { groupId: 'home' },
	'brand-success': { groupId: 'home' },
	'brand-info': { groupId: 'home' },
	'brand-warning': { groupId: 'home' },
	'brand-danger': { groupId: 'home' },
	'font-size-desktop-base': { groupId: 'home' },
	'font-size-base': { groupId: 'home' },
	'body-bg': { groupId: 'home' },
	'text-color': { groupId: 'home' },
	'link-color': { groupId: 'home' },
	'link-hover-color': { groupId: 'home' },
	'link-hover-decoration': { groupId: 'home' },
	'font-size-desktop-small': { groupId: 'home' },
	'font-size-small': { groupId: 'home' },
	'font-size-desktop-large': { groupId: 'home' },
	'font-size-large': { groupId: 'home' },
	'border-radius-base': { groupId: 'home' },
	'border-radius-small': { groupId: 'home' },
	'border-radius-large': { groupId: 'home' },
	'font-family-sans-serif': { groupId: 'home' },
	'font-family-serif': { groupId: 'home' },
	'font-family-monospace': { groupId: 'home' },
	'font-family-base': { groupId: 'home' },
	'headings-color': { groupId: 'home' },
	'headings-font-family': { groupId: 'home' },
	'headings-font-weight': { groupId: 'home' },
	'headings-line-height': { groupId: 'home' },
	'headings-small-color': { groupId: 'home' },
	'font-size-desktop-h1': { groupId: 'home' },
	'font-size-h1': { groupId: 'home' },
	'font-size-desktop-h2': { groupId: 'home' },
	'font-size-h2': { groupId: 'home' },
	'font-size-desktop-h3': { groupId: 'home' },
	'font-size-h3': { groupId: 'home' },
	'font-size-desktop-h4': { groupId: 'home' },
	'font-size-h4': { groupId: 'home' },
	'font-size-desktop-h5': { groupId: 'home' },
	'font-size-h5': { groupId: 'home' },
	'font-size-desktop-h6': { groupId: 'home' },
	'font-size-h6': { groupId: 'home' },
	'text-muted': { groupId: 'home' },
	'caret-width-base': { groupId: 'home' },
	'caret-width-large': { groupId: 'home' },
	'alert-border-radius': { groupId: 'alert' },
	'alert-border-width': { groupId: 'alert' },
	'alert-font-size': { groupId: 'alert' },
	'alert-padding': { groupId: 'alert' },
	'alert-link-font-weight': { groupId: 'alert' },
	'alert-lead-font-size': { groupId: 'alert' },
	'alert-lead-font-weight': { groupId: 'alert' },
	'alert-close-color': { groupId: 'alert' },
	'alert-notification-max-width': { groupId: 'alert' },
	'alert-default-bg': { groupId: 'alert' },
	'alert-default-border': { groupId: 'alert' },
	'alert-default-text-bold': { groupId: 'alert' },
	'alert-default-text': { groupId: 'alert' },
	'alert-success-bg': { groupId: 'alert' },
	'alert-success-border': { groupId: 'alert' },
	'alert-success-text-bold': { groupId: 'alert' },
	'alert-success-text': { groupId: 'alert' },
	'alert-info-bg': { groupId: 'alert' },
	'alert-info-border': { groupId: 'alert' },
	'alert-info-text-bold': { groupId: 'alert' },
	'alert-info-text': { groupId: 'alert' },
	'alert-warning-bg': { groupId: 'alert' },
	'alert-warning-border': { groupId: 'alert' },
	'alert-warning-text-bold': { groupId: 'alert' },
	'alert-warning-text': { groupId: 'alert' },
	'alert-danger-bg': { groupId: 'alert' },
	'alert-danger-border': { groupId: 'alert' },
	'alert-danger-text-bold': { groupId: 'alert' },
	'alert-danger-text': { groupId: 'alert' },
	'badge-bg': { groupId: 'badge' },
	'badge-border-style': { groupId: 'badge' },
	'badge-border-width': { groupId: 'badge' },
	'badge-color': { groupId: 'badge' },
	'badge-desktop-font-size': { groupId: 'badge' },
	'badge-font-size': { groupId: 'badge' },
	'badge-font-weight': { groupId: 'badge' },
	'badge-line-height': { groupId: 'badge' },
	'badge-padding-bottom': { groupId: 'badge' },
	'badge-padding-left': { groupId: 'badge' },
	'badge-padding-right': { groupId: 'badge' },
	'badge-padding-top': { groupId: 'badge' },
	'badge-lexicon-icon-height': { groupId: 'badge' },
	'badge-lexicon-icon-width': { groupId: 'badge' },
	'badge-active-bg': { groupId: 'badge' },
	'badge-active-color': { groupId: 'badge' },
	'badge-link-hover-color': { groupId: 'badge' },
	'badge-link-hover-text-decoration': { groupId: 'badge' },
	'badge-link-text-decoration': { groupId: 'badge' },
	'badge-default-bg': { groupId: 'badge' },
	'badge-default-border': { groupId: 'badge' },
	'badge-default-color': { groupId: 'badge' },
	'badge-default-hover-bg': { groupId: 'badge' },
	'badge-default-hover-border': { groupId: 'badge' },
	'badge-default-hover-color': { groupId: 'badge' },
	'badge-default-link-color': { groupId: 'badge' },
	'badge-primary-bg': { groupId: 'badge' },
	'badge-primary-border': { groupId: 'badge' },
	'badge-primary-color': { groupId: 'badge' },
	'badge-primary-hover-bg': { groupId: 'badge' },
	'badge-primary-hover-border': { groupId: 'badge' },
	'badge-primary-hover-color': { groupId: 'badge' },
	'badge-success-bg': { groupId: 'badge' },
	'badge-success-border': { groupId: 'badge' },
	'badge-success-color': { groupId: 'badge' },
	'badge-success-hover-bg': { groupId: 'badge' },
	'badge-success-hover-border': { groupId: 'badge' },
	'badge-success-hover-color': { groupId: 'badge' },
	'badge-info-bg': { groupId: 'badge' },
	'badge-info-border': { groupId: 'badge' },
	'badge-info-color': { groupId: 'badge' },
	'badge-info-hover-bg': { groupId: 'badge' },
	'badge-info-hover-border': { groupId: 'badge' },
	'badge-info-hover-color': { groupId: 'badge' },
	'badge-warning-bg': { groupId: 'badge' },
	'badge-warning-border': { groupId: 'badge' },
	'badge-warning-color': { groupId: 'badge' },
	'badge-warning-hover-bg': { groupId: 'badge' },
	'badge-warning-hover-border': { groupId: 'badge' },
	'badge-warning-hover-color': { groupId: 'badge' },
	'badge-danger-bg': { groupId: 'badge' },
	'badge-danger-border': { groupId: 'badge' },
	'badge-danger-color': { groupId: 'badge' },
	'badge-danger-hover-bg': { groupId: 'badge' },
	'badge-danger-hover-border': { groupId: 'badge' },
	'badge-danger-hover-color': { groupId: 'badge' },
	'badge-sm-desktop-font-size': { groupId: 'badge' },
	'badge-sm-font-size': { groupId: 'badge' },
	'badge-sm-padding-bottom': { groupId: 'badge' },
	'badge-sm-padding-left': { groupId: 'badge' },
	'badge-sm-padding-right': { groupId: 'badge' },
	'badge-sm-padding-top': { groupId: 'badge' },
	'badge-sm-lexicon-icon-height': { groupId: 'badge' },
	'badge-sm-lexicon-icon-width': { groupId: 'badge' },
	'badge-lg-desktop-font-size': { groupId: 'badge' },
	'badge-lg-font-size': { groupId: 'badge' },
	'badge-lg-padding-bottom': { groupId: 'badge' },
	'badge-lg-padding-left': { groupId: 'badge' },
	'badge-lg-padding-right': { groupId: 'badge' },
	'badge-lg-padding-top': { groupId: 'badge' },
	'badge-lg-lexicon-icon-height': { groupId: 'badge' },
	'badge-lg-lexicon-icon-width': { groupId: 'badge' },
	'blockquote-border-color': { groupId: 'blockquote' },
	'blockquote-font-size': { groupId: 'blockquote' },
	'blockquote-small-color': { groupId: 'blockquote' },
	'blockquote-default-color': { groupId: 'blockquote' },
	'blockquote-primary-color': { groupId: 'blockquote' },
	'blockquote-success-color': { groupId: 'blockquote' },
	'blockquote-info-color': { groupId: 'blockquote' },
	'blockquote-warning-color': { groupId: 'blockquote' },
	'blockquote-danger-color': { groupId: 'blockquote' },
	'blockquote-xs-border-width': { groupId: 'blockquote' },
	'blockquote-xs-font-size': { groupId: 'blockquote' },
	'blockquote-sm-border-width': { groupId: 'blockquote' },
	'blockquote-sm-font-size': { groupId: 'blockquote' },
	'blockquote-lg-border-width': { groupId: 'blockquote' },
	'blockquote-lg-font-size': { groupId: 'blockquote' },
	'breadcrumb-link-color': { groupId: 'breadcrumb' },
	'breadcrumb-link-hover-color': { groupId: 'breadcrumb' },
	'breadcrumb-link-text-decoration': { groupId: 'breadcrumb' },
	'breadcrumb-link-hover-text-decoration': { groupId: 'breadcrumb' },
	'breadcrumb-font-size': { groupId: 'breadcrumb' },
	'breadcrumb-font-weight': { groupId: 'breadcrumb' },
	'breadcrumb-text-transform': { groupId: 'breadcrumb' },
	'breadcrumb-active-color': { groupId: 'breadcrumb' },
	'breadcrumb-active-font-weight': { groupId: 'breadcrumb' },
	'breadcrumb-padding-vertical': { groupId: 'breadcrumb' },
	'breadcrumb-padding-horizontal': { groupId: 'breadcrumb' },
	'breadcrumb-bg': { groupId: 'breadcrumb' },
	'breadcrumb-border-radius': { groupId: 'breadcrumb' },
	'breadcrumb-color': { groupId: 'breadcrumb' },
	'breadcrumb-separator-font-family': { groupId: 'breadcrumb' },
	'breadcrumb-separator-font-weight': { groupId: 'breadcrumb' },
	'breadcrumb-separator-svg-icon-height': { groupId: 'breadcrumb' },
	'breadcrumb-separator-svg-icon-width': { groupId: 'breadcrumb' },
	'breadcrumb-separator-svg-icon': { groupId: 'breadcrumb' },
	'breadcrumb-separator': { groupId: 'breadcrumb' },
	'breadcrumb-vertical-separator': { groupId: 'breadcrumb' },
	'btn-line-height': { groupId: 'button' },
	'btn-desktop-font-size': { groupId: 'button' },
	'btn-font-size': { groupId: 'button' },
	'btn-font-weight': { groupId: 'button' },
	'btn-desktop-padding-vertical': { groupId: 'button' },
	'btn-padding-vertical': { groupId: 'button' },
	'btn-desktop-padding-horizontal': { groupId: 'button' },
	'btn-padding-horizontal': { groupId: 'button' },
	'btn-border-width': { groupId: 'button' },
	'btn-border-radius': { groupId: 'button' },
	'btn-active-box-shadow': { groupId: 'button' },
	'btn-disabled-opacity': { groupId: 'button' },
	'btn-default-bg': { groupId: 'button' },
	'btn-default-border': { groupId: 'button' },
	'btn-default-color': { groupId: 'button' },
	'btn-default-hover-bg': { groupId: 'button' },
	'btn-default-hover-border': { groupId: 'button' },
	'btn-default-hover-color': { groupId: 'button' },
	'btn-default-active-bg': { groupId: 'button' },
	'btn-default-active-border': { groupId: 'button' },
	'btn-default-active-color': { groupId: 'button' },
	'btn-primary-bg': { groupId: 'button' },
	'btn-primary-border': { groupId: 'button' },
	'btn-primary-color': { groupId: 'button' },
	'btn-primary-hover-bg': { groupId: 'button' },
	'btn-primary-hover-border': { groupId: 'button' },
	'btn-primary-hover-color': { groupId: 'button' },
	'btn-primary-active-bg': { groupId: 'button' },
	'btn-primary-active-border': { groupId: 'button' },
	'btn-primary-active-color': { groupId: 'button' },
	'btn-success-bg': { groupId: 'button' },
	'btn-success-border': { groupId: 'button' },
	'btn-success-color': { groupId: 'button' },
	'btn-success-hover-bg': { groupId: 'button' },
	'btn-success-hover-border': { groupId: 'button' },
	'btn-success-hover-color': { groupId: 'button' },
	'btn-success-active-bg': { groupId: 'button' },
	'btn-success-active-border': { groupId: 'button' },
	'btn-success-active-color': { groupId: 'button' },
	'btn-info-bg': { groupId: 'button' },
	'btn-info-border': { groupId: 'button' },
	'btn-info-color': { groupId: 'button' },
	'btn-info-hover-bg': { groupId: 'button' },
	'btn-info-hover-border': { groupId: 'button' },
	'btn-info-hover-color': { groupId: 'button' },
	'btn-info-active-bg': { groupId: 'button' },
	'btn-info-active-border': { groupId: 'button' },
	'btn-info-active-color': { groupId: 'button' },
	'btn-warning-bg': { groupId: 'button' },
	'btn-warning-border': { groupId: 'button' },
	'btn-warning-color': { groupId: 'button' },
	'btn-warning-hover-bg': { groupId: 'button' },
	'btn-warning-hover-border': { groupId: 'button' },
	'btn-warning-hover-color': { groupId: 'button' },
	'btn-warning-active-bg': { groupId: 'button' },
	'btn-warning-active-border': { groupId: 'button' },
	'btn-warning-active-color': { groupId: 'button' },
	'btn-danger-bg': { groupId: 'button' },
	'btn-danger-border': { groupId: 'button' },
	'btn-danger-color': { groupId: 'button' },
	'btn-danger-hover-bg': { groupId: 'button' },
	'btn-danger-hover-border': { groupId: 'button' },
	'btn-danger-hover-color': { groupId: 'button' },
	'btn-danger-active-bg': { groupId: 'button' },
	'btn-danger-active-border': { groupId: 'button' },
	'btn-danger-active-color': { groupId: 'button' },
	'btn-link-disabled-color': { groupId: 'button' },
	'btn-desktop-xs-font-size': { groupId: 'button' },
	'btn-xs-font-size': { groupId: 'button' },
	'btn-xs-border-radius': { groupId: 'button' },
	'btn-desktop-xs-padding-vertical': { groupId: 'button' },
	'btn-xs-padding-vertical': { groupId: 'button' },
	'btn-desktop-xs-padding-horizontal': { groupId: 'button' },
	'btn-xs-padding-horizontal': { groupId: 'button' },
	'btn-desktop-sm-font-size': { groupId: 'button' },
	'btn-sm-font-size': { groupId: 'button' },
	'btn-sm-border-radius': { groupId: 'button' },
	'btn-desktop-sm-padding-vertical': { groupId: 'button' },
	'btn-sm-padding-vertical': { groupId: 'button' },
	'btn-desktop-sm-padding-horizontal': { groupId: 'button' },
	'btn-sm-padding-horizontal': { groupId: 'button' },
	'btn-desktop-lg-font-size': { groupId: 'button' },
	'btn-lg-font-size': { groupId: 'button' },
	'btn-desktop-lg-padding-vertical': { groupId: 'button' },
	'btn-lg-padding-vertical': { groupId: 'button' },
	'btn-desktop-lg-padding-horizontal': { groupId: 'button' },
	'btn-lg-padding-horizontal': { groupId: 'button' },
	'btn-lg-border-radius': { groupId: 'button' },
	'btn-action-border-radius': { groupId: 'button' },
	'btn-desktop-action-size': { groupId: 'button' },
	'btn-action-size': { groupId: 'button' },
	'btn-action-dropdown-spacer': { groupId: 'button' },
	'zindex-btn-action': { groupId: 'button' },
	'btn-fixed-spacer-x': { groupId: 'button' },
	'btn-fixed-spacer-y': { groupId: 'button' },
	'card-bg': { groupId: 'card' },
	'card-border-radius': { groupId: 'card' },
	'card-border': { groupId: 'card' },
	'card-fallback-border': { groupId: 'card' },
	'card-border-style': { groupId: 'card' },
	'card-border-width': { groupId: 'card' },
	'card-box-shadow': { groupId: 'card' },
	'card-gutter-width': { groupId: 'card' },
	'card-margin-bottom': { groupId: 'card' },
	'card-link-color': { groupId: 'card' },
	'card-divider-bg': { groupId: 'card' },
	'card-divider-height': { groupId: 'card' },
	'checkbox-position': { groupId: 'card' },
	'checkbox-left-card-padding': { groupId: 'card' },
	'checkbox-right-card-padding': { groupId: 'card' },
	'card-circle-border-radius': { groupId: 'card' },
	'card-rounded-border-radius': { groupId: 'card' },
	'card-square-border-radius': { groupId: 'card' },
	'dropdown-link-color': { groupId: 'dropdown' },
	'dropdown-link-padding': { groupId: 'dropdown' },
	'dropdown-link-hover-bg': { groupId: 'dropdown' },
	'dropdown-link-hover-color': { groupId: 'dropdown' },
	'dropdown-link-active-bg': { groupId: 'dropdown' },
	'dropdown-link-active-color': { groupId: 'dropdown' },
	'dropdown-link-disabled-color': { groupId: 'dropdown' },
	'dropdown-divider-bg': { groupId: 'dropdown' },
	'dropdown-border-width': { groupId: 'dropdown' },
	'dropdown-border-style': { groupId: 'dropdown' },
	'dropdown-border': { groupId: 'dropdown' },
	'dropdown-fallback-border': { groupId: 'dropdown' },
	'dropdown-bg': { groupId: 'dropdown' },
	'dropdown-box-shadow': { groupId: 'dropdown' },
	'dropdown-font-size-desktop': { groupId: 'dropdown' },
	'dropdown-font-size': { groupId: 'dropdown' },
	'dropdown-padding-bottom': { groupId: 'dropdown' },
	'dropdown-padding-left': { groupId: 'dropdown' },
	'dropdown-padding-right': { groupId: 'dropdown' },
	'dropdown-padding-top': { groupId: 'dropdown' },
	'dropdown-menu-min-width': { groupId: 'dropdown' },
	'dropdown-menu-desktop-max-width': { groupId: 'dropdown' },
	'dropdown-menu-max-width': { groupId: 'dropdown' },
	'dropdown-menu-min-height': { groupId: 'dropdown' },
	'dropdown-menu-desktop-max-height': { groupId: 'dropdown' },
	'dropdown-menu-max-height': { groupId: 'dropdown' },
	'dropdown-header-color': { groupId: 'dropdown' },
	'dropdown-header-font-size-desktop': { groupId: 'dropdown' },
	'dropdown-header-font-size': { groupId: 'dropdown' },
	'dropdown-checkbox-label-spacer': { groupId: 'dropdown' },
	'dropdown-radio-label-spacer': { groupId: 'dropdown' },
	'dropdown-wide-width': { groupId: 'dropdown' },
	'figure-margin-bottom': { groupId: 'figure' },
	'figcaption-bg': { groupId: 'figure' },
	'figcaption-bg-alpha': { groupId: 'figure' },
	'figcaption-color': { groupId: 'figure' },
	'figcaption-font-weight': { groupId: 'figure' },
	'figcaption-padding-bottom': { groupId: 'figure' },
	'figcaption-padding-left': { groupId: 'figure' },
	'figcaption-padding-right': { groupId: 'figure' },
	'figcaption-padding-top': { groupId: 'figure' },
	'figcaption-primary-bg': { groupId: 'figure' },
	'figcaption-primary-bg-alpha': { groupId: 'figure' },
	'figcaption-primary-color': { groupId: 'figure' },
	'figcaption-success-bg': { groupId: 'figure' },
	'figcaption-success-bg-alpha': { groupId: 'figure' },
	'figcaption-success-color': { groupId: 'figure' },
	'figcaption-info-bg': { groupId: 'figure' },
	'figcaption-info-bg-alpha': { groupId: 'figure' },
	'figcaption-info-color': { groupId: 'figure' },
	'figcaption-warning-bg': { groupId: 'figure' },
	'figcaption-warning-bg-alpha': { groupId: 'figure' },
	'figcaption-warning-color': { groupId: 'figure' },
	'figcaption-danger-bg': { groupId: 'figure' },
	'figcaption-danger-bg-alpha': { groupId: 'figure' },
	'figcaption-danger-color': { groupId: 'figure' },
	'figure-circle-border-radius': { groupId: 'figure' },
	'figure-rounded-border-radius': { groupId: 'figure' },
	'figure-square-border-radius': { groupId: 'figure' },
	'input-bg-disabled': { groupId: 'input-disabled' },
	'input-border-disabled': { groupId: 'input-disabled' },
	'input-color-disabled': { groupId: 'input-disabled' },
	'input-opacity-disabled': { groupId: 'input-disabled' },
	'input-readonly-bg': { groupId: 'input-readonly' },
	'input-readonly-border': { groupId: 'input-readonly' },
	'input-readonly-color': { groupId: 'input-readonly' },
	'input-readonly-cursor': { groupId: 'input-readonly' },
	'input-border-radius-small': { groupId: 'input-sizes' },
	'input-height-small': { groupId: 'input-sizes' },
	'input-mobile-height-small': { groupId: 'input-sizes' },
	'input-font-size-small': { groupId: 'input-sizes' },
	'input-group-addon-border-radius-small': { groupId: 'input-sizes' },
	'input-border-radius-large': { groupId: 'input-sizes' },
	'input-height-large': { groupId: 'input-sizes' },
	'input-mobile-height-large': { groupId: 'input-sizes' },
	'input-font-size-large': { groupId: 'input-sizes' },
	'input-group-addon-border-radius-large': { groupId: 'input-sizes' },
	'input-group-addon-bg': { groupId: 'input-sizes' },
	'input-group-addon-border-radius': { groupId: 'input-sizes' },
	'input-group-addon-border-color': { groupId: 'input-sizes' },
	'input-group-addon-color': { groupId: 'input-sizes' },
	'input-group-default-addon-border-color': { groupId: 'input-sizes' },
	'input-group-default-addon-color': { groupId: 'input-sizes' },
	'input-success-bg': { groupId: 'input-validation' },
	'input-success-bg-focus': { groupId: 'input-validation' },
	'input-success-border': { groupId: 'input-validation' },
	'input-success-border-focus': { groupId: 'input-validation' },
	'input-success-color': { groupId: 'input-validation' },
	'input-success-color-focus': { groupId: 'input-validation' },
	'input-success-box-shadow': { groupId: 'input-validation' },
	'input-success-box-shadow-focus': { groupId: 'input-validation' },
	'input-success-label-color': { groupId: 'input-validation' },
	'input-success-checkbox-label-color': { groupId: 'input-validation' },
	'input-warning-bg': { groupId: 'input-validation' },
	'input-warning-bg-focus': { groupId: 'input-validation' },
	'input-warning-border': { groupId: 'input-validation' },
	'input-warning-border-focus': { groupId: 'input-validation' },
	'input-warning-box-shadow': { groupId: 'input-validation' },
	'input-warning-box-shadow-focus': { groupId: 'input-validation' },
	'input-warning-color': { groupId: 'input-validation' },
	'input-warning-color-focus': { groupId: 'input-validation' },
	'input-warning-label-color': { groupId: 'input-validation' },
	'input-warning-checkbox-label-color': { groupId: 'input-validation' },
	'input-danger-bg': { groupId: 'input-validation' },
	'input-danger-bg-focus': { groupId: 'input-validation' },
	'input-danger-border': { groupId: 'input-validation' },
	'input-danger-border-focus': { groupId: 'input-validation' },
	'input-danger-color': { groupId: 'input-validation' },
	'input-danger-color-focus': { groupId: 'input-validation' },
	'input-danger-box-shadow': { groupId: 'input-validation' },
	'input-danger-box-shadow-focus': { groupId: 'input-validation' },
	'input-danger-label-color': { groupId: 'input-validation' },
	'input-danger-checkbox-label-color': { groupId: 'input-validation' },
	'input-label-color': { groupId: 'input' },
	'input-label-focus-color': { groupId: 'input' },
	'input-label-desktop-font-size': { groupId: 'input' },
	'input-label-font-size': { groupId: 'input' },
	'input-label-font-weight': { groupId: 'input' },
	'input-label-margin-bottom': { groupId: 'input' },
	'input-label-reference-mark-spacer': { groupId: 'input' },
	'input-label-reference-mark-vertical-alignment': { groupId: 'input' },
	'input-height-base': { groupId: 'input' },
	'input-mobile-height-base': { groupId: 'input' },
	'input-border-bottom-width': { groupId: 'input' },
	'input-border-left-width': { groupId: 'input' },
	'input-border-right-width': { groupId: 'input' },
	'input-border-top-width': { groupId: 'input' },
	'input-desktop-font-size': { groupId: 'input' },
	'input-font-size': { groupId: 'input' },
	'input-padding-vertical': { groupId: 'input' },
	'input-padding-horizontal': { groupId: 'input' },
	'input-border-radius': { groupId: 'input' },
	'input-bg': { groupId: 'input' },
	'input-border': { groupId: 'input' },
	'input-color': { groupId: 'input' },
	'input-box-shadow': { groupId: 'input' },
	'input-color-placeholder': { groupId: 'input' },
	'input-color-placeholder-focus': { groupId: 'input' },
	'input-color-placeholder-disabled': { groupId: 'input' },
	'input-bg-focus': { groupId: 'input' },
	'input-border-focus': { groupId: 'input' },
	'input-color-focus': { groupId: 'input' },
	'input-box-shadow-focus': { groupId: 'input' },
	'input-select-bg': { groupId: 'input' },
	'input-select-bg-position': { groupId: 'input' },
	'input-select-bg-size': { groupId: 'input' },
	'input-select-icon-color': { groupId: 'input' },
	'input-select-icon': { groupId: 'input' },
	'input-select-padding-bottom': { groupId: 'input' },
	'input-select-padding-left': { groupId: 'input' },
	'input-select-padding-right': { groupId: 'input' },
	'input-select-padding-top': { groupId: 'input' },
	'input-select-focus-bg': { groupId: 'input' },
	'input-select-icon-focus-color': { groupId: 'input' },
	'input-select-icon-focus': { groupId: 'input' },
	'input-textarea-height': { groupId: 'input' },
	'form-group-margin-bottom': { groupId: 'input' },
	'input-help-block-font-size': { groupId: 'input' },
	'label-desktop-font-size': { groupId: 'label' },
	'label-font-size': { groupId: 'label' },
	'label-font-weight': { groupId: 'label' },
	'label-padding-bottom': { groupId: 'label' },
	'label-padding-left': { groupId: 'label' },
	'label-padding-right': { groupId: 'label' },
	'label-padding-top': { groupId: 'label' },
	'label-border-style': { groupId: 'label' },
	'label-border-width': { groupId: 'label' },
	'label-color': { groupId: 'label' },
	'label-link-hover-color': { groupId: 'label' },
	'label-link-text-decoration': { groupId: 'label' },
	'label-link-hover-text-decoration': { groupId: 'label' },
	'label-lexicon-icon-height': { groupId: 'label' },
	'label-lexicon-icon-width': { groupId: 'label' },
	'label-default-bg': { groupId: 'label' },
	'label-default-border': { groupId: 'label' },
	'label-default-color': { groupId: 'label' },
	'label-default-hover-bg': { groupId: 'label' },
	'label-default-hover-border': { groupId: 'label' },
	'label-default-hover-color': { groupId: 'label' },
	'label-primary-bg': { groupId: 'label' },
	'label-primary-border': { groupId: 'label' },
	'label-primary-color': { groupId: 'label' },
	'label-primary-hover-bg': { groupId: 'label' },
	'label-primary-hover-border': { groupId: 'label' },
	'label-primary-hover-color': { groupId: 'label' },
	'label-success-bg': { groupId: 'label' },
	'label-success-border': { groupId: 'label' },
	'label-success-color': { groupId: 'label' },
	'label-success-hover-bg': { groupId: 'label' },
	'label-success-hover-border': { groupId: 'label' },
	'label-success-hover-color': { groupId: 'label' },
	'label-info-bg': { groupId: 'label' },
	'label-info-border': { groupId: 'label' },
	'label-info-color': { groupId: 'label' },
	'label-info-hover-bg': { groupId: 'label' },
	'label-info-hover-border': { groupId: 'label' },
	'label-info-hover-color': { groupId: 'label' },
	'label-warning-bg': { groupId: 'label' },
	'label-warning-border': { groupId: 'label' },
	'label-warning-color': { groupId: 'label' },
	'label-warning-hover-bg': { groupId: 'label' },
	'label-warning-hover-border': { groupId: 'label' },
	'label-warning-hover-color': { groupId: 'label' },
	'label-danger-bg': { groupId: 'label' },
	'label-danger-border': { groupId: 'label' },
	'label-danger-color': { groupId: 'label' },
	'label-danger-hover-bg': { groupId: 'label' },
	'label-danger-hover-border': { groupId: 'label' },
	'label-danger-hover-color': { groupId: 'label' },
	'label-sm-desktop-font-size': { groupId: 'label' },
	'label-sm-font-size': { groupId: 'label' },
	'label-sm-padding-bottom': { groupId: 'label' },
	'label-sm-padding-left': { groupId: 'label' },
	'label-sm-padding-right': { groupId: 'label' },
	'label-sm-padding-top': { groupId: 'label' },
	'label-sm-lexicon-icon-width': { groupId: 'label' },
	'label-sm-lexicon-icon-height': { groupId: 'label' },
	'label-lg-desktop-font-size': { groupId: 'label' },
	'label-lg-font-size': { groupId: 'label' },
	'label-lg-padding-bottom': { groupId: 'label' },
	'label-lg-padding-left': { groupId: 'label' },
	'label-lg-padding-right': { groupId: 'label' },
	'label-lg-padding-top': { groupId: 'label' },
	'label-lg-lexicon-icon-width': { groupId: 'label' },
	'label-lg-lexicon-icon-height': { groupId: 'label' },
	'list-group-bg': { groupId: 'list-group' },
	'list-group-border-radius': { groupId: 'list-group' },
	'list-group-border-width': { groupId: 'list-group' },
	'list-group-border': { groupId: 'list-group' },
	'list-group-box-shadow': { groupId: 'list-group' },
	'list-group-hover-bg': { groupId: 'list-group' },
	'list-group-active-bg': { groupId: 'list-group' },
	'list-group-active-border': { groupId: 'list-group' },
	'list-group-active-color': { groupId: 'list-group' },
	'list-group-active-text-color': { groupId: 'list-group' },
	'list-group-disabled-bg': { groupId: 'list-group' },
	'list-group-disabled-color': { groupId: 'list-group' },
	'list-group-disabled-text-color': { groupId: 'list-group' },
	'list-group-link-color': { groupId: 'list-group' },
	'list-group-link-heading-color': { groupId: 'list-group' },
	'list-group-link-hover-color': { groupId: 'list-group' },
	'tabular-list-group-border-width': { groupId: 'list-group' },
	'tabular-list-group-active-border-bottom-width': { groupId: 'list-group' },
	'tabular-list-group-item-height': { groupId: 'list-group' },
	'tabular-list-group-vertical-alignment': { groupId: 'list-group' },
	'list-group-header-bg': { groupId: 'list-group' },
	'list-group-header-color': { groupId: 'list-group' },
	'list-group-header-hover-color': { groupId: 'list-group' },
	'list-group-header-font-weight': { groupId: 'list-group' },
	'list-group-header-icon-font-size': { groupId: 'list-group' },
	'list-group-header-close-border-color': { groupId: 'list-group' },
	'list-group-header-close-border-width': { groupId: 'list-group' },
	'list-group-header-open-border-color': { groupId: 'list-group' },
	'list-group-header-open-border-width': { groupId: 'list-group' },
	'list-group-item-dropdown-toggle-color': { groupId: 'list-group' },
	'list-group-item-dropdown-toggle-focus-color': { groupId: 'list-group' },
	'list-group-item-dropdown-toggle-hover-color': { groupId: 'list-group' },
	'list-group-item-active-dropdown-toggle-color': { groupId: 'list-group' },
	'list-group-item-active-dropdown-toggle-focus-color': { groupId: 'list-group' },
	'list-group-item-active-dropdown-toggle-hover-color': { groupId: 'list-group' },
	'list-group-card-active-bg': { groupId: 'list-group' },
	'list-group-card-active-border-width': { groupId: 'list-group' },
	'list-group-card-active-border': { groupId: 'list-group' },
	'list-group-card-active-color': { groupId: 'list-group' },
	'list-group-card-checkbox-hidden-icon': { groupId: 'list-group' },
	'management-bar-desktop-height': { groupId: 'management-bar' },
	'management-bar-height': { groupId: 'management-bar' },
	'management-bar-border-bottom-width': { groupId: 'management-bar' },
	'management-bar-border-left-width': { groupId: 'management-bar' },
	'management-bar-border-right-width': { groupId: 'management-bar' },
	'management-bar-border-top-width': { groupId: 'management-bar' },
	'management-bar-desktop-padding-vertical': { groupId: 'management-bar' },
	'management-bar-padding-vertical': { groupId: 'management-bar' },
	'management-bar-desktop-padding-horizontal': { groupId: 'management-bar' },
	'management-bar-padding-horizontal': { groupId: 'management-bar' },
	'management-bar-margin-bottom': { groupId: 'management-bar' },
	'management-bar-dropdown-menu-margin-top': { groupId: 'management-bar' },
	'management-bar-desktop-link-line-height': { groupId: 'management-bar' },
	'management-bar-link-line-height': { groupId: 'management-bar' },
	'management-bar-link-active-color': { groupId: 'management-bar' },
	'management-bar-desktop-btn-padding-vertical': { groupId: 'management-bar' },
	'management-bar-btn-padding-vertical': { groupId: 'management-bar' },
	'management-bar-desktop-btn-padding-horizontal': { groupId: 'management-bar' },
	'management-bar-btn-padding-horizontal': { groupId: 'management-bar' },
	'management-bar-toggle-height': { groupId: 'management-bar' },
	'management-bar-collapse-absolute-box-shadow': { groupId: 'management-bar' },
	'management-bar-collapse-bg': { groupId: 'management-bar' },
	'management-bar-collapse-border': { groupId: 'management-bar' },
	'management-bar-default-color': { groupId: 'management-bar' },
	'management-bar-default-bg': { groupId: 'management-bar' },
	'management-bar-default-border': { groupId: 'management-bar' },
	'management-bar-default-box-shadow': { groupId: 'management-bar' },
	'management-bar-default-link-color': { groupId: 'management-bar' },
	'management-bar-default-link-hover-color': { groupId: 'management-bar' },
	'management-bar-default-link-active-color': { groupId: 'management-bar' },
	'management-bar-default-link-disabled-color': { groupId: 'management-bar' },
	'management-bar-default-link-hover-bg': { groupId: 'management-bar' },
	'management-bar-default-link-active-bg': { groupId: 'management-bar' },
	'management-bar-default-link-disabled-bg': { groupId: 'management-bar' },
	'management-bar-default-btn-default-bg': { groupId: 'management-bar' },
	'management-bar-default-btn-default-hover-bg': { groupId: 'management-bar' },
	'management-bar-default-btn-default-active-bg': { groupId: 'management-bar' },
	'management-bar-default-btn-default-border': { groupId: 'management-bar' },
	'management-bar-default-btn-default-hover-border': { groupId: 'management-bar' },
	'management-bar-default-btn-default-active-border': { groupId: 'management-bar' },
	'management-bar-default-btn-default-color': { groupId: 'management-bar' },
	'management-bar-default-btn-default-hover-color': { groupId: 'management-bar' },
	'management-bar-default-btn-default-active-color': { groupId: 'management-bar' },
	'management-bar-default-collapse-bg': { groupId: 'management-bar' },
	'management-bar-default-collapse-border': { groupId: 'management-bar' },
	'modal-body-bg': { groupId: 'modal' },
	'modal-body-color': { groupId: 'modal' },
	'modal-box-shadow': { groupId: 'modal' },
	'modal-content-bg': { groupId: 'modal' },
	'modal-content-border-color': { groupId: 'modal' },
	'modal-content-fallback-border-color': { groupId: 'modal' },
	'modal-inner-padding-horizontal': { groupId: 'modal' },
	'modal-inner-padding-vertical': { groupId: 'modal' },
	'modal-title-line-height': { groupId: 'modal' },
	'modal-title-padding': { groupId: 'modal' },
	'modal-desktop-header-bg': { groupId: 'modal' },
	'modal-header-bg': { groupId: 'modal' },
	'modal-header-border-color': { groupId: 'modal' },
	'modal-desktop-header-color': { groupId: 'modal' },
	'modal-header-color': { groupId: 'modal' },
	'modal-desktop-header-height': { groupId: 'modal' },
	'modal-header-height': { groupId: 'modal' },
	'modal-desktop-header-close-color': { groupId: 'modal' },
	'modal-header-close-color': { groupId: 'modal' },
	'modal-header-close-icon-opacity': { groupId: 'modal' },
	'modal-header-close-lexicon-icon-opacity': { groupId: 'modal' },
	'modal-header-close-opacity-modifier': { groupId: 'modal' },
	'modal-desktop-footer-bg': { groupId: 'modal' },
	'modal-footer-bg': { groupId: 'modal' },
	'modal-footer-border-color': { groupId: 'modal' },
	'modal-footer-box-shadow': { groupId: 'modal' },
	'modal-desktop-footer-color': { groupId: 'modal' },
	'modal-footer-color': { groupId: 'modal' },
	'modal-desktop-footer-height': { groupId: 'modal' },
	'modal-footer-height': { groupId: 'modal' },
	'modal-backdrop-bg': { groupId: 'modal' },
	'modal-backdrop-opacity': { groupId: 'modal' },
	'modal-sm': { groupId: 'modal' },
	'modal-md': { groupId: 'modal' },
	'modal-lg': { groupId: 'modal' },
	'modal-inverse-body-bg': { groupId: 'modal' },
	'modal-inverse-body-color': { groupId: 'modal' },
	'modal-inverse-content-bg': { groupId: 'modal' },
	'modal-inverse-content-border-color': { groupId: 'modal' },
	'modal-inverse-desktop-header-bg': { groupId: 'modal' },
	'modal-inverse-header-bg': { groupId: 'modal' },
	'modal-inverse-desktop-header-border-color': { groupId: 'modal' },
	'modal-inverse-header-border-color': { groupId: 'modal' },
	'modal-inverse-header-color': { groupId: 'modal' },
	'modal-inverse-desktop-header-close-color': { groupId: 'modal' },
	'modal-inverse-header-close-color': { groupId: 'modal' },
	'modal-inverse-desktop-header-color': { groupId: 'modal' },
	'modal-inverse-desktop-footer-bg': { groupId: 'modal' },
	'modal-inverse-footer-bg': { groupId: 'modal' },
	'modal-inverse-desktop-footer-border-color': { groupId: 'modal' },
	'modal-inverse-footer-border-color': { groupId: 'modal' },
	'modal-inverse-desktop-footer-color': { groupId: 'modal' },
	'modal-inverse-footer-color': { groupId: 'modal' },
	'modal-inverse-link-color': { groupId: 'modal' },
	'modal-inverse-link-hover-color': { groupId: 'modal' },
	'multi-step-progress-bar-color': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-active-color': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-complete-color': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-icon': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-active-icon': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-complete-icon': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-complete-icon-color': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-divider-height': { groupId: 'multi-step-progress-bar' },
	'multi-step-progress-bar-fixed-width': { groupId: 'multi-step-progress-bar' },
	'nameplate-label-border-radius': { groupId: 'nameplate' },
	'nameplate-label-height': { groupId: 'nameplate' },
	'nameplate-subheading-color': { groupId: 'nameplate' },
	'nameplate-label-text-font-weight': { groupId: 'nameplate' },
	'nameplate-label-text-line-height': { groupId: 'nameplate' },
	'nameplate-label-text-max-width': { groupId: 'nameplate' },
	'nameplate-label-default-bg': { groupId: 'nameplate' },
	'nameplate-label-default-color': { groupId: 'nameplate' },
	'nameplate-label-inverse-bg': { groupId: 'nameplate' },
	'nameplate-label-inverse-color': { groupId: 'nameplate' },
	'nameplate-label-link-dark-color': { groupId: 'nameplate' },
	'nameplate-label-link-dark-hover-color': { groupId: 'nameplate' },
	'nameplate-label-primary-bg': { groupId: 'nameplate' },
	'nameplate-label-primary-color': { groupId: 'nameplate' },
	'nameplate-label-success-bg': { groupId: 'nameplate' },
	'nameplate-label-success-color': { groupId: 'nameplate' },
	'nameplate-label-info-bg': { groupId: 'nameplate' },
	'nameplate-label-info-color': { groupId: 'nameplate' },
	'nameplate-label-warning-bg': { groupId: 'nameplate' },
	'nameplate-label-warning-color': { groupId: 'nameplate' },
	'nameplate-label-danger-bg': { groupId: 'nameplate' },
	'nameplate-label-danger-color': { groupId: 'nameplate' },
	'nameplate-label-circle-border-radius': { groupId: 'nameplate' },
	'nameplate-label-rounded-border-radius': { groupId: 'nameplate' },
	'nameplate-label-square-border-radius': { groupId: 'nameplate' },
	'nav-pills-border-radius': { groupId: 'nav-pills' },
	'nav-pills-active-link-hover-bg': { groupId: 'nav-pills' },
	'nav-pills-active-link-hover-color': { groupId: 'nav-pills' },
	'nav-tabs-border-radius': { groupId: 'nav-tabs' },
	'nav-tabs-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-border-width': { groupId: 'nav-tabs' },
	'nav-tabs-link-hover-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-bg': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-color': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-line-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-line-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-padding-horizontal': { groupId: 'nav-tabs' },
	'nav-tabs-default-padding-horizontal': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-padding-vertical': { groupId: 'nav-tabs' },
	'nav-tabs-default-padding-vertical': { groupId: 'nav-tabs' },
	'nav-tabs-justified-link-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-justified-active-link-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-border-radius': { groupId: 'nav-tabs' },
	'nav-tabs-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-border-width': { groupId: 'nav-tabs' },
	'nav-tabs-link-hover-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-bg': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-color': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-line-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-line-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-padding-horizontal': { groupId: 'nav-tabs' },
	'nav-tabs-default-padding-horizontal': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-padding-vertical': { groupId: 'nav-tabs' },
	'nav-tabs-default-padding-vertical': { groupId: 'nav-tabs' },
	'nav-tabs-justified-link-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-justified-active-link-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-border-radius': { groupId: 'nav-tabs' },
	'nav-tabs-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-border-width': { groupId: 'nav-tabs' },
	'nav-tabs-link-hover-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-bg': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-active-link-hover-color': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-line-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-line-height': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-padding-horizontal': { groupId: 'nav-tabs' },
	'nav-tabs-default-padding-horizontal': { groupId: 'nav-tabs' },
	'nav-tabs-default-desktop-padding-vertical': { groupId: 'nav-tabs' },
	'nav-tabs-default-padding-vertical': { groupId: 'nav-tabs' },
	'nav-tabs-justified-link-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-justified-active-link-border-color': { groupId: 'nav-tabs' },
	'nav-heading-color': { groupId: 'nav' },
	'nav-link-color': { groupId: 'nav' },
	'nav-disabled-link-color': { groupId: 'nav' },
	'nav-disabled-link-hover-color': { groupId: 'nav' },
	'nav-link-hover-bg': { groupId: 'nav' },
	'nav-link-padding-horizontal': { groupId: 'nav' },
	'nav-link-padding-vertical': { groupId: 'nav' },
	'nav-nested-padding-horizontal': { groupId: 'nav' },
	'nav-nested-link-active-bg': { groupId: 'nav' },
	'nav-nested-link-active-color': { groupId: 'nav' },
	'nav-nested-margins-margin-horizontal': { groupId: 'nav' },
	'navbar-desktop-height': { groupId: 'navbar' },
	'navbar-height': { groupId: 'navbar' },
	'navbar-border-bottom-width': { groupId: 'navbar' },
	'navbar-border-left-width': { groupId: 'navbar' },
	'navbar-border-right-width': { groupId: 'navbar' },
	'navbar-border-top-width': { groupId: 'navbar' },
	'navbar-border-radius': { groupId: 'navbar' },
	'navbar-margin-bottom': { groupId: 'navbar' },
	'navbar-desktop-padding-vertical': { groupId: 'navbar' },
	'navbar-padding-vertical': { groupId: 'navbar' },
	'navbar-desktop-padding-horizontal': { groupId: 'navbar' },
	'navbar-padding-horizontal': { groupId: 'navbar' },
	'navbar-desktop-link-line-height': { groupId: 'navbar' },
	'navbar-link-line-height': { groupId: 'navbar' },
	'navbar-link-active-bottom-border-width': { groupId: 'navbar' },
	'navbar-link-active-highlight': { groupId: 'navbar' },
	'navbar-toggle-height': { groupId: 'navbar' },
	'navbar-toggle-icon-bar-color': { groupId: 'navbar' },
	'navbar-toggle-icon-bar-width': { groupId: 'navbar' },
	'navbar-form-padding-vertical': { groupId: 'navbar' },
	'navbar-form-padding-horizontal': { groupId: 'navbar' },
	'navbar-collapse-absolute-box-shadow': { groupId: 'navbar' },
	'navbar-collapse-max-height': { groupId: 'navbar' },
	'navbar-default-desktop-height': { groupId: 'navbar' },
	'navbar-default-height': { groupId: 'navbar' },
	'navbar-default-bg': { groupId: 'navbar' },
	'navbar-default-border-bottom-width': { groupId: 'navbar' },
	'navbar-default-border-left-width': { groupId: 'navbar' },
	'navbar-default-border-right-width': { groupId: 'navbar' },
	'navbar-default-border-top-width': { groupId: 'navbar' },
	'navbar-default-border': { groupId: 'navbar' },
	'navbar-default-color': { groupId: 'navbar' },
	'navbar-default-desktop-padding-horizontal': { groupId: 'navbar' },
	'navbar-default-padding-horizontal': { groupId: 'navbar' },
	'navbar-default-desktop-padding-vertical': { groupId: 'navbar' },
	'navbar-default-padding-vertical': { groupId: 'navbar' },
	'navbar-default-link-hover-bg': { groupId: 'navbar' },
	'navbar-default-link-active-bg': { groupId: 'navbar' },
	'navbar-default-link-open-bg': { groupId: 'navbar' },
	'navbar-default-link-disabled-bg': { groupId: 'navbar' },
	'navbar-default-link-color': { groupId: 'navbar' },
	'navbar-default-link-hover-color': { groupId: 'navbar' },
	'navbar-default-link-active-color': { groupId: 'navbar' },
	'navbar-default-link-open-color': { groupId: 'navbar' },
	'navbar-default-link-disabled-color': { groupId: 'navbar' },
	'navbar-default-link-active-highlight': { groupId: 'navbar' },
	'navbar-default-brand-color': { groupId: 'navbar' },
	'navbar-default-brand-hover-color': { groupId: 'navbar' },
	'navbar-default-brand-hover-bg': { groupId: 'navbar' },
	'navbar-default-toggle-border-color': { groupId: 'navbar' },
	'navbar-default-toggle-hover-bg': { groupId: 'navbar' },
	'navbar-default-toggle-icon-bar-bg': { groupId: 'navbar' },
	'navbar-default-collapsible-search-btn-default-bg': { groupId: 'navbar' },
	'navbar-default-collapsible-search-btn-default-border': { groupId: 'navbar' },
	'navbar-default-collapsible-search-btn-default-color': { groupId: 'navbar' },
	'navbar-default-collapsible-search-focus-highlight': { groupId: 'navbar' },
	'navbar-default-collapsible-search-highlight': { groupId: 'navbar' },
	'navbar-default-collapsible-search-input-bg': { groupId: 'navbar' },
	'navbar-default-collapsible-search-input-border': { groupId: 'navbar' },
	'navbar-default-collapsible-search-input-color': { groupId: 'navbar' },
	'navbar-default-collapsible-search-input-placeholder-color': { groupId: 'navbar' },
	'zindex-basic-search-close': { groupId: 'navbar' },
	'navbar-inverse-bg': { groupId: 'navbar' },
	'navbar-inverse-border': { groupId: 'navbar' },
	'navbar-inverse-color': { groupId: 'navbar' },
	'navbar-inverse-link-hover-bg': { groupId: 'navbar' },
	'navbar-inverse-link-active-bg': { groupId: 'navbar' },
	'navbar-inverse-link-open-bg': { groupId: 'navbar' },
	'navbar-inverse-link-disabled-bg': { groupId: 'navbar' },
	'navbar-inverse-link-color': { groupId: 'navbar' },
	'navbar-inverse-link-hover-color': { groupId: 'navbar' },
	'navbar-inverse-link-active-color': { groupId: 'navbar' },
	'navbar-inverse-link-open-color': { groupId: 'navbar' },
	'navbar-inverse-link-disabled-color': { groupId: 'navbar' },
	'navbar-inverse-link-active-highlight': { groupId: 'navbar' },
	'navbar-inverse-brand-color': { groupId: 'navbar' },
	'navbar-inverse-brand-hover-color': { groupId: 'navbar' },
	'navbar-inverse-brand-hover-bg': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-btn-default-bg': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-btn-default-border': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-btn-default-color': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-focus-highlight': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-highlight': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-input-bg': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-input-border': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-input-color': { groupId: 'navbar' },
	'navbar-inverse-collapsible-search-input-placeholder-color': { groupId: 'navbar' },
	'navbar-inverse-toggle-hover-bg': { groupId: 'navbar' },
	'navbar-inverse-toggle-border-color': { groupId: 'navbar' },
	'navbar-inverse-toggle-icon-bar-bg': { groupId: 'navbar' },
	'pager-item-height': { groupId: 'pager' },
	'pager-bg': { groupId: 'pager' },
	'pager-hover-bg': { groupId: 'pager' },
	'pager-active-bg': { groupId: 'pager' },
	'pager-disabled-bg': { groupId: 'pager' },
	'pager-border-radius': { groupId: 'pager' },
	'pager-border-width': { groupId: 'pager' },
	'pager-border': { groupId: 'pager' },
	'pager-hover-border': { groupId: 'pager' },
	'pager-disabled-border': { groupId: 'pager' },
	'pager-color': { groupId: 'pager' },
	'pager-hover-color': { groupId: 'pager' },
	'pager-active-color': { groupId: 'pager' },
	'pager-disabled-color': { groupId: 'pager' },
	'pager-padding-base-horizontal': { groupId: 'pager' },
	'pager-padding-base-vertical': { groupId: 'pager' },
	'pager-sm-item-height': { groupId: 'pager' },
	'pager-sm-font-size': { groupId: 'pager' },
	'pager-sm-padding-horizontal': { groupId: 'pager' },
	'pager-sm-padding-vertical': { groupId: 'pager' },
	'pager-lg-item-height': { groupId: 'pager' },
	'pager-lg-font-size': { groupId: 'pager' },
	'pager-lg-padding-horizontal': { groupId: 'pager' },
	'pager-lg-padding-vertical': { groupId: 'pager' },
	'pagination-border-radius': { groupId: 'pagination' },
	'pagination-border-width': { groupId: 'pagination' },
	'pagination-border': { groupId: 'pagination' },
	'pagination-color': { groupId: 'pagination' },
	'pagination-bg': { groupId: 'pagination' },
	'pagination-hover-border': { groupId: 'pagination' },
	'pagination-hover-color': { groupId: 'pagination' },
	'pagination-hover-bg': { groupId: 'pagination' },
	'pagination-active-border': { groupId: 'pagination' },
	'pagination-active-color': { groupId: 'pagination' },
	'pagination-active-bg': { groupId: 'pagination' },
	'pagination-disabled-border': { groupId: 'pagination' },
	'pagination-disabled-color': { groupId: 'pagination' },
	'pagination-disabled-bg': { groupId: 'pagination' },
	'pagination-item-height': { groupId: 'pagination' },
	'pagination-item-padding-left': { groupId: 'pagination' },
	'pagination-item-padding-right': { groupId: 'pagination' },
	'pagination-ellipsis-hover-bg': { groupId: 'pagination' },
	'pagination-ellipsis-hover-color': { groupId: 'pagination' },
	'pagination-items-per-page-bg': { groupId: 'pagination' },
	'pagination-items-per-page-border': { groupId: 'pagination' },
	'pagination-items-per-page-color': { groupId: 'pagination' },
	'pagination-results-color': { groupId: 'pagination' },
	'pagination-sm-border-radius': { groupId: 'pagination' },
	'pagination-sm-font-size': { groupId: 'pagination' },
	'pagination-sm-line-height': { groupId: 'pagination' },
	'pagination-sm-item-height': { groupId: 'pagination' },
	'pagination-sm-item-padding-bottom': { groupId: 'pagination' },
	'pagination-sm-item-padding-left': { groupId: 'pagination' },
	'pagination-sm-item-padding-right': { groupId: 'pagination' },
	'pagination-sm-item-padding-top': { groupId: 'pagination' },
	'pagination-sm-item-width': { groupId: 'pagination' },
	'pagination-lg-border-radius': { groupId: 'pagination' },
	'pagination-lg-font-size': { groupId: 'pagination' },
	'pagination-lg-line-height': { groupId: 'pagination' },
	'pagination-lg-item-height': { groupId: 'pagination' },
	'pagination-lg-item-padding-bottom': { groupId: 'pagination' },
	'pagination-lg-item-padding-left': { groupId: 'pagination' },
	'pagination-lg-item-padding-right': { groupId: 'pagination' },
	'pagination-lg-item-padding-top': { groupId: 'pagination' },
	'pagination-lg-item-width': { groupId: 'pagination' },
	'panel-bg': { groupId: 'panel' },
	'panel-border-radius': { groupId: 'panel' },
	'panel-border-bottom-width': { groupId: 'panel' },
	'panel-border-left-width': { groupId: 'panel' },
	'panel-border-right-width': { groupId: 'panel' },
	'panel-border-top-width': { groupId: 'panel' },
	'panel-box-shadow': { groupId: 'panel' },
	'panel-inner-border': { groupId: 'panel' },
	'panel-group-panel-spacer': { groupId: 'panel' },
	'panel-heading-border-bottom-width': { groupId: 'panel' },
	'panel-heading-padding': { groupId: 'panel' },
	'panel-title-font-size': { groupId: 'panel' },
	'panel-title-font-weight': { groupId: 'panel' },
	'panel-body-padding': { groupId: 'panel' },
	'panel-footer-bg': { groupId: 'panel' },
	'panel-footer-border-top-width': { groupId: 'panel' },
	'panel-footer-padding': { groupId: 'panel' },
	'panel-blank-border': { groupId: 'panel' },
	'panel-blank-text': { groupId: 'panel' },
	'panel-blank-heading-bg': { groupId: 'panel' },
	'panel-blank-heading-link-color': { groupId: 'panel' },
	'panel-blank-heading-link-open-color': { groupId: 'panel' },
	'panel-default-border': { groupId: 'panel' },
	'panel-default-text': { groupId: 'panel' },
	'panel-default-heading-bg': { groupId: 'panel' },
	'panel-default-footer-bg': { groupId: 'panel' },
	'panel-default-footer-border': { groupId: 'panel' },
	'panel-default-footer-text': { groupId: 'panel' },
	'panel-primary-border': { groupId: 'panel' },
	'panel-primary-text': { groupId: 'panel' },
	'panel-primary-heading-bg': { groupId: 'panel' },
	'panel-primary-footer-bg': { groupId: 'panel' },
	'panel-primary-footer-border': { groupId: 'panel' },
	'panel-primary-footer-text': { groupId: 'panel' },
	'panel-success-border': { groupId: 'panel' },
	'panel-success-text': { groupId: 'panel' },
	'panel-success-heading-bg': { groupId: 'panel' },
	'panel-success-footer-bg': { groupId: 'panel' },
	'panel-success-footer-border': { groupId: 'panel' },
	'panel-success-footer-text': { groupId: 'panel' },
	'panel-info-border': { groupId: 'panel' },
	'panel-info-text': { groupId: 'panel' },
	'panel-info-heading-bg': { groupId: 'panel' },
	'panel-info-footer-bg': { groupId: 'panel' },
	'panel-info-footer-border': { groupId: 'panel' },
	'panel-info-footer-text': { groupId: 'panel' },
	'panel-warning-border': { groupId: 'panel' },
	'panel-warning-text': { groupId: 'panel' },
	'panel-warning-heading-bg': { groupId: 'panel' },
	'panel-warning-footer-bg': { groupId: 'panel' },
	'panel-warning-footer-border': { groupId: 'panel' },
	'panel-warning-footer-text': { groupId: 'panel' },
	'panel-danger-border': { groupId: 'panel' },
	'panel-danger-text': { groupId: 'panel' },
	'panel-danger-heading-bg': { groupId: 'panel' },
	'panel-danger-footer-bg': { groupId: 'panel' },
	'panel-danger-footer-border': { groupId: 'panel' },
	'panel-danger-footer-text': { groupId: 'panel' },
	'popover-bg': { groupId: 'popover' },
	'popover-border-color': { groupId: 'popover' },
	'popover-fallback-border-color': { groupId: 'popover' },
	'popover-border-radius': { groupId: 'popover' },
	'popover-max-width': { groupId: 'popover' },
	'popover-padding': { groupId: 'popover' },
	'popover-title-bg': { groupId: 'popover' },
	'popover-title-color': { groupId: 'popover' },
	'popover-title-font-size': { groupId: 'popover' },
	'popover-title-margin': { groupId: 'popover' },
	'popover-title-padding': { groupId: 'popover' },
	'popover-content-padding': { groupId: 'popover' },
	'popover-arrow-color': { groupId: 'popover' },
	'popover-arrow-width': { groupId: 'popover' },
	'popover-arrow-outer-color': { groupId: 'popover' },
	'popover-arrow-outer-fallback-color': { groupId: 'popover' },
	'popover-arrow-outer-width': { groupId: 'popover' },
	'popover-box-shadow-y': { groupId: 'popover' },
	'popover-box-shadow-x': { groupId: 'popover' },
	'popover-box-shadow-spread': { groupId: 'popover' },
	'popover-box-shadow-blur': { groupId: 'popover' },
	'popover-box-shadow-bg': { groupId: 'popover' },
	'popover-box-shadow': { groupId: 'popover' },
	'progress-bg': { groupId: 'progress-bar' },
	'progress-border-radius': { groupId: 'progress-bar' },
	'progress-box-shadow': { groupId: 'progress-bar' },
	'progress-bar-height': { groupId: 'progress-bar' },
	'progress-bar-bg': { groupId: 'progress-bar' },
	'progress-bar-color': { groupId: 'progress-bar' },
	'progress-bar-box-shadow': { groupId: 'progress-bar' },
	'progress-bar-font-size': { groupId: 'progress-bar' },
	'progress-bar-success-bg': { groupId: 'progress-bar' },
	'progress-bar-info-bg': { groupId: 'progress-bar' },
	'progress-bar-warning-bg': { groupId: 'progress-bar' },
	'progress-bar-danger-bg': { groupId: 'progress-bar' },
	'progress-bar-xs-height': { groupId: 'progress-bar' },
	'progress-bar-xs-border-radius': { groupId: 'progress-bar' },
	'progress-bar-xs-font-size': { groupId: 'progress-bar' },
	'progress-bar-lg-height': { groupId: 'progress-bar' },
	'progress-bar-lg-border-radius': { groupId: 'progress-bar' },
	'progress-bar-lg-font-size': { groupId: 'progress-bar' },
	'progress-bar-xl-height': { groupId: 'progress-bar' },
	'progress-bar-xl-border-radius': { groupId: 'progress-bar' },
	'progress-bar-xl-font-size': { groupId: 'progress-bar' },
	'sidebar-padding-bottom': { groupId: 'sidebar' },
	'sidebar-padding-left': { groupId: 'sidebar' },
	'sidebar-padding-right': { groupId: 'sidebar' },
	'sidebar-padding-top': { groupId: 'sidebar' },
	'sidebar-navbar-gutter-left': { groupId: 'sidebar' },
	'sidebar-navbar-gutter-right': { groupId: 'sidebar' },
	'sidebar-default-bg': { groupId: 'sidebar' },
	'sidebar-default-border': { groupId: 'sidebar' },
	'sidebar-default-color': { groupId: 'sidebar' },
	'sidebar-default-header-title-color': { groupId: 'sidebar' },
	'sidebar-default-header-title-hover-color': { groupId: 'sidebar' },
	'sidebar-default-header-actions-link-color': { groupId: 'sidebar' },
	'sidebar-default-header-actions-link-hover-color': { groupId: 'sidebar' },
	'sidebar-default-panel-bg': { groupId: 'sidebar' },
	'sidebar-inverse-bg': { groupId: 'sidebar' },
	'sidebar-inverse-border': { groupId: 'sidebar' },
	'sidebar-inverse-color': { groupId: 'sidebar' },
	'sidebar-inverse-input-bg': { groupId: 'sidebar' },
	'sidebar-inverse-header-title-color': { groupId: 'sidebar' },
	'sidebar-inverse-header-title-hover-color': { groupId: 'sidebar' },
	'sidebar-inverse-header-actions-link-color': { groupId: 'sidebar' },
	'sidebar-inverse-header-actions-link-hover-color': { groupId: 'sidebar' },
	'sidebar-inverse-panel-bg': { groupId: 'sidebar' },
	'sticker-border-radius': { groupId: 'sticker' },
	'sticker-color': { groupId: 'sticker' },
	'sticker-font-size': { groupId: 'sticker' },
	'sticker-gutter-width': { groupId: 'sticker' },
	'sticker-monospaced-size': { groupId: 'sticker' },
	'sticker-default-bg': { groupId: 'sticker' },
	'sticker-default-color': { groupId: 'sticker' },
	'sticker-primary-bg': { groupId: 'sticker' },
	'sticker-primary-color': { groupId: 'sticker' },
	'sticker-success-bg': { groupId: 'sticker' },
	'sticker-success-color': { groupId: 'sticker' },
	'sticker-info-bg': { groupId: 'sticker' },
	'sticker-info-color': { groupId: 'sticker' },
	'sticker-warning-bg': { groupId: 'sticker' },
	'sticker-warning-color': { groupId: 'sticker' },
	'sticker-danger-bg': { groupId: 'sticker' },
	'sticker-danger-color': { groupId: 'sticker' },
	'sticker-sm-font-size': { groupId: 'sticker' },
	'sticker-sm-monospaced-size': { groupId: 'sticker' },
	'sticker-lg-font-size': { groupId: 'sticker' },
	'sticker-lg-monospaced-size': { groupId: 'sticker' },
	'sticker-circle-border-radius': { groupId: 'sticker' },
	'sticker-rounded-border-radius': { groupId: 'sticker' },
	'sticker-square-border-radius': { groupId: 'sticker' },
	'table-bg': { groupId: 'table' },
	'table-border-color': { groupId: 'table' },
	'table-cell-gutters': { groupId: 'table' },
	'table-cell-padding': { groupId: 'table' },
	'table-bg-active': { groupId: 'table' },
	'table-bg-hover': { groupId: 'table' },
	'table-bg-accent': { groupId: 'table' },
	'table-header-color': { groupId: 'table' },
	'table-header-font-size': { groupId: 'table' },
	'table-header-font-weight': { groupId: 'table' },
	'table-header-min-height': { groupId: 'table' },
	'table-condensed-cell-padding': { groupId: 'table' },
	'table-list-color': { groupId: 'table' },
	'table-list-font-size': { groupId: 'table' },
	'table-list-content-height': { groupId: 'table' },
	'table-list-link-color': { groupId: 'table' },
	'table-list-link-color-hover': { groupId: 'table' },
	'table-list-header-bg': { groupId: 'table' },
	'table-list-header-border-bottom-width': { groupId: 'table' },
	'table-list-header-font-size': { groupId: 'table' },
	'table-list-header-font-weight': { groupId: 'table' },
	'table-list-header-min-height': { groupId: 'table' },
	'table-list-header-vertical-alignment': { groupId: 'table' },
	'table-list-row-height': { groupId: 'table' },
	'table-list-body-row-bg': { groupId: 'table' },
	'table-list-row-border-bottom-width': { groupId: 'table' },
	'table-list-row-border-color': { groupId: 'table' },
	'table-list-row-active-border-bottom-width': { groupId: 'table' },
	'table-list-row-active-border-color': { groupId: 'table' },
	'timeline-border-width': { groupId: 'timeline' },
	'timeline-border-modifier': { groupId: 'timeline' },
	'timeline-border': { groupId: 'timeline' },
	'timeline-item-padding-bottom': { groupId: 'timeline' },
	'timeline-item-padding-top': { groupId: 'timeline' },
	'timeline-increment-label-color': { groupId: 'timeline' },
	'timeline-inner-spacing': { groupId: 'timeline' },
	'timeline-outer-spacing': { groupId: 'timeline' },
	'timeline-icon-bg': { groupId: 'timeline' },
	'timeline-icon-active-bg': { groupId: 'timeline' },
	'timeline-icon-border-radius': { groupId: 'timeline' },
	'timeline-icon-border-width': { groupId: 'timeline' },
	'timeline-icon-border': { groupId: 'timeline' },
	'timeline-icon-active-border': { groupId: 'timeline' },
	'timeline-icon-size': { groupId: 'timeline' },
	'toggle-card-border-radius': { groupId: 'toggle-card' },
	'toggle-card-width': { groupId: 'toggle-card' },
	'toggle-card-height': { groupId: 'toggle-card' },
	'toggle-card-padding-horizontal': { groupId: 'toggle-card' },
	'toggle-card-padding-vertical': { groupId: 'toggle-card' },
	'toggle-card-icon-border-radius': { groupId: 'toggle-card' },
	'toggle-card-icon-font-size': { groupId: 'toggle-card' },
	'toggle-card-icon-width': { groupId: 'toggle-card' },
	'toggle-card-icon-height': { groupId: 'toggle-card' },
	'toggle-card-bg': { groupId: 'toggle-card' },
	'toggle-card-border-width': { groupId: 'toggle-card' },
	'toggle-card-border': { groupId: 'toggle-card' },
	'toggle-card-box-shadow': { groupId: 'toggle-card' },
	'toggle-card-text-color': { groupId: 'toggle-card' },
	'toggle-card-icon-bg': { groupId: 'toggle-card' },
	'toggle-card-icon-border-width': { groupId: 'toggle-card' },
	'toggle-card-icon-border': { groupId: 'toggle-card' },
	'toggle-card-on-bg': { groupId: 'toggle-card' },
	'toggle-card-on-border-width': { groupId: 'toggle-card' },
	'toggle-card-on-border': { groupId: 'toggle-card' },
	'toggle-card-on-icon-bg': { groupId: 'toggle-card' },
	'toggle-card-on-icon-border-width': { groupId: 'toggle-card' },
	'toggle-card-on-icon-border': { groupId: 'toggle-card' },
	'toggle-card-on-text-color': { groupId: 'toggle-card' },
	'toggle-switch-transition': { groupId: 'toggle-switch' },
	'toggle-switch-bar-focus-box-shadow': { groupId: 'toggle-switch' },
	'toggle-switch-bar-icon-color': { groupId: 'toggle-switch' },
	'toggle-switch-bar-border-radius': { groupId: 'toggle-switch' },
	'toggle-switch-bar-bg': { groupId: 'toggle-switch' },
	'toggle-switch-bar-border-width': { groupId: 'toggle-switch' },
	'toggle-switch-bar-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-bar-desktop-font-size': { groupId: 'toggle-switch' },
	'toggle-switch-bar-font-size': { groupId: 'toggle-switch' },
	'toggle-switch-bar-desktop-height': { groupId: 'toggle-switch' },
	'toggle-switch-bar-height': { groupId: 'toggle-switch' },
	'toggle-switch-bar-desktop-padding': { groupId: 'toggle-switch' },
	'toggle-switch-bar-padding': { groupId: 'toggle-switch' },
	'toggle-switch-bar-desktop-width': { groupId: 'toggle-switch' },
	'toggle-switch-bar-width': { groupId: 'toggle-switch' },
	'toggle-switch-bar-on-bg': { groupId: 'toggle-switch' },
	'toggle-switch-bar-on-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-bar-on-icon-color': { groupId: 'toggle-switch' },
	'toggle-switch-button-bg': { groupId: 'toggle-switch' },
	'toggle-switch-button-border-radius': { groupId: 'toggle-switch' },
	'toggle-switch-button-border-width': { groupId: 'toggle-switch' },
	'toggle-switch-button-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-button-desktop-font-size': { groupId: 'toggle-switch' },
	'toggle-switch-button-font-size': { groupId: 'toggle-switch' },
	'toggle-switch-button-desktop-width': { groupId: 'toggle-switch' },
	'toggle-switch-button-width': { groupId: 'toggle-switch' },
	'toggle-switch-button-icon-color': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-bg': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-border-radius': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-icon-color': { groupId: 'toggle-switch' },
	'tooltip-bg': { groupId: 'tooltip' },
	'tooltip-border-radius': { groupId: 'tooltip' },
	'tooltip-color': { groupId: 'tooltip' },
	'tooltip-box-shadow': { groupId: 'tooltip' },
	'tooltip-font-size': { groupId: 'tooltip' },
	'tooltip-max-width': { groupId: 'tooltip' },
	'tooltip-inner-max-width': { groupId: 'tooltip' },
	'tooltip-opacity': { groupId: 'tooltip' },
	'tooltip-padding-horizontal': { groupId: 'tooltip' },
	'tooltip-padding-vertical': { groupId: 'tooltip' },
	'tooltip-arrow-color': { groupId: 'tooltip' },
	'tooltip-arrow-width': { groupId: 'tooltip' },
	'user-icon-desktop-size': { groupId: 'user-icon' },
	'user-icon-size': { groupId: 'user-icon' },
	'user-icon-border-radius': { groupId: 'user-icon' },
	'user-icon-desktop-font-size': { groupId: 'user-icon' },
	'user-icon-font-size': { groupId: 'user-icon' },
	'user-icon-font-weight': { groupId: 'user-icon' },
	'user-icon-default-bg': { groupId: 'user-icon' },
	'user-icon-primary-bg': { groupId: 'user-icon' },
	'user-icon-success-bg': { groupId: 'user-icon' },
	'user-icon-info-bg': { groupId: 'user-icon' },
	'user-icon-warning-bg': { groupId: 'user-icon' },
	'user-icon-danger-bg': { groupId: 'user-icon' },
	'user-icon-xs-desktop-size': { groupId: 'user-icon' },
	'user-icon-xs-size': { groupId: 'user-icon' },
	'user-icon-xs-desktop-font-size': { groupId: 'user-icon' },
	'user-icon-xs-font-size': { groupId: 'user-icon' },
	'user-icon-sm-desktop-size': { groupId: 'user-icon' },
	'user-icon-sm-size': { groupId: 'user-icon' },
	'user-icon-sm-desktop-font-size': { groupId: 'user-icon' },
	'user-icon-sm-font-size': { groupId: 'user-icon' },
	'user-icon-lg-desktop-size': { groupId: 'user-icon' },
	'user-icon-lg-size': { groupId: 'user-icon' },
	'user-icon-lg-desktop-font-size': { groupId: 'user-icon' },
	'user-icon-lg-font-size': { groupId: 'user-icon' },
	'user-icon-xl-desktop-size': { groupId: 'user-icon' },
	'user-icon-xl-size': { groupId: 'user-icon' },
	'user-icon-xl-desktop-font-size': { groupId: 'user-icon' },
	'user-icon-xl-font-size': { groupId: 'user-icon' },
	'user-icon-xxl-desktop-size': { groupId: 'user-icon' },
	'user-icon-xxl-size': { groupId: 'user-icon' },
	'user-icon-xxl-desktop-font-size': { groupId: 'user-icon' },
	'user-icon-xxl-font-size': { groupId: 'user-icon' },
	'user-icon-circle-border-radius': { groupId: 'user-icon' },
	'user-icon-rounded-border-radius': { groupId: 'user-icon' },
	'user-icon-square-border-radius': { groupId: 'user-icon' },
};