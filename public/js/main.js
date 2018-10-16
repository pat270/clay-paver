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

				sass.compile('@import "clay-bootstrap-functions";@import "custom-variables";@import "atlas-all";', function(result) {
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

	regexMatchVarName: function(str) {
		var SASS_VAR_REGEX = /\$(.*?)(?=:)/g;

		return str.match(SASS_VAR_REGEX);
	},

	regexMatchValueName: function(str) {
		var SASS_VALUE_REGEX = /:(.*?)(?=;)/g;

		return str.match(SASS_VALUE_REGEX);
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
		'clay-bootstrap-functions.scss',
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

function importSassVariables(content) {
	var BACK_REFERENCE = '$1';
	var STRIP_COMMENTS_REGEX = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
	var STRIP_WHITE_SPACE_REGEX = / /g;
	var SASS_VAR_REGEX = /\$(.*?)(?=:)/g;
	// var SASS_VALUE_REGEX = /:(.*?)(?=;)/g;
	var SASS_VALUE_REGEX = /:(\s*?.*?)*?(?=;)/g

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

ClayPaver.updateSwitchThemesDD();

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

var compileOrder = {
	'home':													'aa',
	'globals':												'ab',
	'grid':													'ac',
	'typography':											'ad',
	'icons':												'ae',
	'links':												'af',
	'utilities':											'ag',
	'alert':												'ah',
	'label':												'ai',
	'badge':												'aj',
	'sticker':												'ak',
	'button':												'al',
	'breadcrumb':											'am',
	'card':													'an',
	'dropdown':												'ao',
	'input':												'ap',
	'input-custom':											'aq',
	'input-group':											'ar',
	'input-validation':										'as',
	'list-group':											'at',
	'loading-animations':									'au',
	'menubar':												'av',
	'modal':												'aw',
	'nav':													'ax',
	'nav-pills':											'ay',
	'nav-tabs':												'az',
	'nav-underline':										'ba',
	'navbar':												'bb',
	'navbar-application-bar':								'bc',
	'navbar-management-bar':								'bd',
	'navbar-navigation-bar':								'be',
	'pagination':											'bf',
	'panel':												'bg',
	'popover':												'bh',
	'progress-bar':											'bi',
	'multi-step-nav':										'bj',
	'sheet':												'bk',
	'sidebar':												'bl',
	'table':												'bm',
	'tbar':													'bn',
	'tooltip':												'bo',
	'timeline':												'bp',
	'toggle-switch':										'bq',
};

var cpMasterList = {
	'enable-scaling-components': { groupId: 'home' },
	'scaling-breakpoint-down': { groupId: 'home' },
	'enable-shadows': { groupId: 'home' },
	'enable-transitions': { groupId: 'home' },
	'enable-caret': { groupId: 'home' },
	'enable-gradients': { groupId: 'home' },
	'enable-grid-classes': { groupId: 'home' },
	'enable-print-styles': { groupId: 'home' },
	'print-page-size': { groupId: 'home' },
	'print-body-min-width': { groupId: 'home' },
	'white': { groupId: 'globals' },
	'gray-100': { groupId: 'globals' },
	'gray-200': { groupId: 'globals' },
	'gray-300': { groupId: 'globals' },
	'gray-400': { groupId: 'globals' },
	'gray-500': { groupId: 'globals' },
	'gray-600': { groupId: 'globals' },
	'gray-700': { groupId: 'globals' },
	'gray-800': { groupId: 'globals' },
	'gray-900': { groupId: 'globals' },
	'black': { groupId: 'globals' },
	'blue': { groupId: 'globals' },
	'indigo': { groupId: 'globals' },
	'purple': { groupId: 'globals' },
	'pink': { groupId: 'globals' },
	'red': { groupId: 'globals' },
	'orange': { groupId: 'globals' },
	'yellow': { groupId: 'globals' },
	'green': { groupId: 'globals' },
	'teal': { groupId: 'globals' },
	'cyan': { groupId: 'globals' },
	'primary': { groupId: 'globals' },
	'secondary': { groupId: 'globals' },
	'success': { groupId: 'globals' },
	'info': { groupId: 'globals' },
	'warning': { groupId: 'globals' },
	'danger': { groupId: 'globals' },
	'light': { groupId: 'globals' },
	'dark': { groupId: 'globals' },
	'yiq-contrasted-threshold': { groupId: 'globals' },
	'yiq-text-dark': { groupId: 'globals' },
	'yiq-text-light': { groupId: 'globals' },
	'font-import-url': { groupId: 'globals' },
	'font-family-sans-serif': { groupId: 'globals' },
	'font-family-serif': { groupId: 'globals' },
	'font-family-monospace': { groupId: 'globals' },
	'font-family-base': { groupId: 'globals' },
	'font-size-sm': { groupId: 'globals' },
	'font-size-base': { groupId: 'globals' },
	'font-size-base-mobile': { groupId: 'globals' },
	'font-size-lg': { groupId: 'globals' },
	'font-size-lg-mobile': { groupId: 'globals' },
	'font-weight-light': { groupId: 'globals' },
	'font-weight-normal': { groupId: 'globals' },
	'font-weight-semi-bold': { groupId: 'globals' },
	'font-weight-bold': { groupId: 'globals' },
	'font-weight-bolder': { groupId: 'globals' },
	'line-height-sm': { groupId: 'globals' },
	'line-height-base': { groupId: 'globals' },
	'line-height-lg': { groupId: 'globals' },
	'border-radius': { groupId: 'globals' },
	'border-radius-sm': { groupId: 'globals' },
	'border-radius-lg': { groupId: 'globals' },
	'rounded-border-radius': { groupId: 'globals' },
	'rounded-circle-border-radius': { groupId: 'globals' },
	'rounded-0-border-radius': { groupId: 'globals' },
	'link-cursor': { groupId: 'globals' },
	'disabled-cursor': { groupId: 'globals' },
	'transition-base': { groupId: 'globals' },
	'transition-fade': { groupId: 'globals' },
	'transition-collapse': { groupId: 'globals' },
	'body-color': { groupId: 'globals' },
	'body-bg': { groupId: 'globals' },
	'component-active-color': { groupId: 'globals' },
	'component-active-bg': { groupId: 'globals' },
	'grid-columns': { groupId: 'grid' },
	'grid-gutter-width': { groupId: 'grid' },
	'grid-breakpoints': { groupId: 'grid' },
	'container-max-widths': { groupId: 'grid' },
	'container-form-lg': { groupId: 'grid' },
	'container-view': { groupId: 'grid' },
	'headings-font-family': { groupId: 'typography' },
	'headings-font-weight': { groupId: 'typography' },
	'headings-line-height': { groupId: 'typography' },
	'headings-margin-bottom': { groupId: 'typography' },
	'headings-color': { groupId: 'typography' },
	'h1-font-size': { groupId: 'typography' },
	'h1-font-size-mobile': { groupId: 'typography' },
	'h2-font-size': { groupId: 'typography' },
	'h2-font-size-mobile': { groupId: 'typography' },
	'h3-font-size': { groupId: 'typography' },
	'h3-font-size-mobile': { groupId: 'typography' },
	'h4-font-size': { groupId: 'typography' },
	'h4-font-size-mobile': { groupId: 'typography' },
	'h5-font-size': { groupId: 'typography' },
	'h5-font-size-mobile': { groupId: 'typography' },
	'h6-font-size': { groupId: 'typography' },
	'h6-font-size-mobile': { groupId: 'typography' },
	'paragraph-margin-bottom': { groupId: 'typography' },
	'text-muted': { groupId: 'typography' },
	'lead-font-size': { groupId: 'typography' },
	'lead-font-weight': { groupId: 'typography' },
	'mark-padding': { groupId: 'typography' },
	'mark-bg': { groupId: 'typography' },
	'small-font-size': { groupId: 'typography' },
	'code-font-size': { groupId: 'typography' },
	'code-color': { groupId: 'typography' },
	'pre-scrollable-max-height': { groupId: 'typography' },
	'pre-color': { groupId: 'typography' },
	'kbd-font-size': { groupId: 'typography' },
	'kbd-padding-y': { groupId: 'typography' },
	'kbd-padding-x': { groupId: 'typography' },
	'kbd-color': { groupId: 'typography' },
	'kbd-bg': { groupId: 'typography' },
	'kbd-box-shadow': { groupId: 'typography' },
	'nested-kbd-font-weight': { groupId: 'typography' },
	'dt-font-weight': { groupId: 'typography' },
	'blockquote-font-size': { groupId: 'typography' },
	'blockquote-small-color': { groupId: 'typography' },
	'list-inline-padding': { groupId: 'typography' },
	'hr-border-width': { groupId: 'typography' },
	'hr-border-color': { groupId: 'typography' },
	'hr-margin-y': { groupId: 'typography' },
	'display-line-height': { groupId: 'typography' },
	'display1-size': { groupId: 'typography' },
	'display1-weight': { groupId: 'typography' },
	'display2-size': { groupId: 'typography' },
	'display2-weight': { groupId: 'typography' },
	'display3-size': { groupId: 'typography' },
	'display3-weight': { groupId: 'typography' },
	'display4-size': { groupId: 'typography' },
	'display4-weight': { groupId: 'typography' },
	'collapse-icon-padding-right': { groupId: 'icons' },
	'collapse-icon-padding-left': { groupId: 'icons' },
	'collapse-icon-position-top': { groupId: 'icons' },
	'collapse-icon-position-right': { groupId: 'icons' },
	'collapse-icon-position-bottom': { groupId: 'icons' },
	'collapse-icon-position-left': { groupId: 'icons' },
	'order-arrow-up-active-color': { groupId: 'icons' },
	'order-arrow-down-active-color': { groupId: 'icons' },
	'lexicon-icon-size': { groupId: 'icons' },
	'link-color': { groupId: 'links' },
	'link-hover-color': { groupId: 'links' },
	'link-decoration': { groupId: 'links' },
	'link-hover-decoration': { groupId: 'links' },
	'link-primary': { groupId: 'links' },
	'link-secondary': { groupId: 'links' },
	'component-link': { groupId: 'links' },
	'single-link-font-weight': { groupId: 'links' },
	'component-title': { groupId: 'links' },
	'component-title-link': { groupId: 'links' },
	'component-subtitle': { groupId: 'links' },
	'component-subtitle-link': { groupId: 'links' },
	'component-action': { groupId: 'links' },
	'link-monospaced-size': { groupId: 'links' },
	'link-outline-font-size': { groupId: 'links' },
	'link-outline-font-weight': { groupId: 'links' },
	'link-outline-padding-y': { groupId: 'links' },
	'link-outline-padding-x': { groupId: 'links' },
	'link-outline-line-height': { groupId: 'links' },
	'link-outline-border-width': { groupId: 'links' },
	'link-outline-border-radius': { groupId: 'links' },
	'link-outline-transition': { groupId: 'links' },
	'link-outline-primary': { groupId: 'links' },
	'link-outline-secondary': { groupId: 'links' },
	'autofit-col-expand-min-width': { groupId: 'utilities' },
	'autofit-padded-col-padding-y': { groupId: 'utilities' },
	'autofit-padded-col-padding-x': { groupId: 'utilities' },
	'inline-item-spacer-x': { groupId: 'utilities' },
	'inline-item-lexicon-icon-margin-top': { groupId: 'utilities' },
	'alert-font-size': { groupId: 'alert' },
	'alert-padding-y': { groupId: 'alert' },
	'alert-padding-x': { groupId: 'alert' },
	'alert-margin-bottom': { groupId: 'alert' },
	'alert-border-width': { groupId: 'alert' },
	'alert-border-style': { groupId: 'alert' },
	'alert-border-radius': { groupId: 'alert' },
	'alert-indicator-font-size': { groupId: 'alert' },
	'alert-lead-font-size': { groupId: 'alert' },
	'alert-lead-font-weight': { groupId: 'alert' },
	'alert-lead-spacer-x': { groupId: 'alert' },
	'alert-link-font-weight': { groupId: 'alert' },
	'alert-link-decoration': { groupId: 'alert' },
	'alert-link-hover-decoration': { groupId: 'alert' },
	'alert-dismissible-padding-top': { groupId: 'alert' },
	'alert-dismissible-padding-right': { groupId: 'alert' },
	'alert-dismissible-padding-bottom': { groupId: 'alert' },
	'alert-dismissible-padding-left': { groupId: 'alert' },
	'alert-close-width': { groupId: 'alert' },
	'alert-close-height': { groupId: 'alert' },
	'alert-close-font-size': { groupId: 'alert' },
	'alert-close-padding-top': { groupId: 'alert' },
	'alert-close-padding-right': { groupId: 'alert' },
	'alert-close-padding-bottom': { groupId: 'alert' },
	'alert-close-padding-left': { groupId: 'alert' },
	'alert-close-line-height': { groupId: 'alert' },
	'alert-close-margin-left': { groupId: 'alert' },
	'alert-close-opacity': { groupId: 'alert' },
	'alert-close-position-top': { groupId: 'alert' },
	'alert-close-position-right': { groupId: 'alert' },
	'alert-fluid-border-top-width': { groupId: 'alert' },
	'alert-fluid-border-right-width': { groupId: 'alert' },
	'alert-fluid-border-bottom-width': { groupId: 'alert' },
	'alert-fluid-border-left-width': { groupId: 'alert' },
	'alert-fluid-margin-bottom': { groupId: 'alert' },
	'alert-notifications-max-width': { groupId: 'alert' },
	'alert-notifications-box-shadow': { groupId: 'alert' },
	'alert-notifications-fixed-top': { groupId: 'alert' },
	'alert-notifications-fixed-top-mobile': { groupId: 'alert' },
	'alert-notifications-fixed-right': { groupId: 'alert' },
	'alert-notifications-fixed-right-mobile': { groupId: 'alert' },
	'alert-notifications-fixed-bottom': { groupId: 'alert' },
	'alert-notifications-fixed-bottom-mobile': { groupId: 'alert' },
	'alert-notifications-fixed-left': { groupId: 'alert' },
	'alert-notifications-fixed-left-mobile': { groupId: 'alert' },
	'alert-notifications-absolute-top': { groupId: 'alert' },
	'alert-notifications-absolute-top-mobile': { groupId: 'alert' },
	'alert-notifications-absolute-right': { groupId: 'alert' },
	'alert-notifications-absolute-right-mobile': { groupId: 'alert' },
	'alert-notifications-absolute-bottom': { groupId: 'alert' },
	'alert-notifications-absolute-bottom-mobile': { groupId: 'alert' },
	'alert-notifications-absolute-left': { groupId: 'alert' },
	'alert-notifications-absolute-left-mobile': { groupId: 'alert' },
	'alert-primary-border-color': { groupId: 'alert' },
	'alert-primary-color': { groupId: 'alert' },
	'alert-primary-bg': { groupId: 'alert' },
	'alert-primary-lead-color': { groupId: 'alert' },
	'alert-primary-link-color': { groupId: 'alert' },
	'alert-primary-link-hover-color': { groupId: 'alert' },
	'alert-primary-close-color': { groupId: 'alert' },
	'alert-primary-close-hover-color': { groupId: 'alert' },
	'alert-secondary-border-color': { groupId: 'alert' },
	'alert-secondary-color': { groupId: 'alert' },
	'alert-secondary-bg': { groupId: 'alert' },
	'alert-secondary-lead-color': { groupId: 'alert' },
	'alert-secondary-link-color': { groupId: 'alert' },
	'alert-secondary-link-hover-color': { groupId: 'alert' },
	'alert-secondary-close-color': { groupId: 'alert' },
	'alert-secondary-close-hover-color': { groupId: 'alert' },
	'alert-success-border-color': { groupId: 'alert' },
	'alert-success-color': { groupId: 'alert' },
	'alert-success-bg': { groupId: 'alert' },
	'alert-success-lead-color': { groupId: 'alert' },
	'alert-success-link-color': { groupId: 'alert' },
	'alert-success-link-hover-color': { groupId: 'alert' },
	'alert-success-close-color': { groupId: 'alert' },
	'alert-success-close-hover-color': { groupId: 'alert' },
	'alert-info-border-color': { groupId: 'alert' },
	'alert-info-color': { groupId: 'alert' },
	'alert-info-bg': { groupId: 'alert' },
	'alert-info-lead-color': { groupId: 'alert' },
	'alert-info-link-color': { groupId: 'alert' },
	'alert-info-link-hover-color': { groupId: 'alert' },
	'alert-info-close-color': { groupId: 'alert' },
	'alert-info-close-hover-color': { groupId: 'alert' },
	'alert-warning-border-color': { groupId: 'alert' },
	'alert-warning-color': { groupId: 'alert' },
	'alert-warning-bg': { groupId: 'alert' },
	'alert-warning-lead-color': { groupId: 'alert' },
	'alert-warning-link-color': { groupId: 'alert' },
	'alert-warning-link-hover-color': { groupId: 'alert' },
	'alert-warning-close-color': { groupId: 'alert' },
	'alert-warning-close-hover-color': { groupId: 'alert' },
	'alert-danger-border-color': { groupId: 'alert' },
	'alert-danger-color': { groupId: 'alert' },
	'alert-danger-bg': { groupId: 'alert' },
	'alert-danger-lead-color': { groupId: 'alert' },
	'alert-danger-link-color': { groupId: 'alert' },
	'alert-danger-link-hover-color': { groupId: 'alert' },
	'alert-danger-close-color': { groupId: 'alert' },
	'alert-danger-close-hover-color': { groupId: 'alert' },
	'alert-light-border-color': { groupId: 'alert' },
	'alert-light-color': { groupId: 'alert' },
	'alert-light-bg': { groupId: 'alert' },
	'alert-light-lead-color': { groupId: 'alert' },
	'alert-light-link-color': { groupId: 'alert' },
	'alert-light-link-hover-color': { groupId: 'alert' },
	'alert-light-close-color': { groupId: 'alert' },
	'alert-light-close-hover-color': { groupId: 'alert' },
	'alert-dark-border-color': { groupId: 'alert' },
	'alert-dark-color': { groupId: 'alert' },
	'alert-dark-bg': { groupId: 'alert' },
	'alert-dark-lead-color': { groupId: 'alert' },
	'alert-dark-link-color': { groupId: 'alert' },
	'alert-dark-link-hover-color': { groupId: 'alert' },
	'alert-dark-close-color': { groupId: 'alert' },
	'alert-dark-close-hover-color': { groupId: 'alert' },
	'alert-title': { groupId: 'alert' },
	'alert-subtitle': { groupId: 'alert' },
	'label-height': { groupId: 'label' },
	'label-font-size': { groupId: 'label' },
	'label-font-weight': { groupId: 'label' },
	'label-line-height': { groupId: 'label' },
	'label-padding-y': { groupId: 'label' },
	'label-padding-x': { groupId: 'label' },
	'label-spacer-y': { groupId: 'label' },
	'label-spacer-x': { groupId: 'label' },
	'label-border-width': { groupId: 'label' },
	'label-border-style': { groupId: 'label' },
	'label-border-color': { groupId: 'label' },
	'label-border-radius': { groupId: 'label' },
	'label-color': { groupId: 'label' },
	'label-text-transform': { groupId: 'label' },
	'label-link-hover-color': { groupId: 'label' },
	'label-link-text-decoration': { groupId: 'label' },
	'label-link-hover-text-decoration': { groupId: 'label' },
	'label-anchor-text-decoration': { groupId: 'label' },
	'label-anchor-hover-text-decoration': { groupId: 'label' },
	'label-lexicon-icon-width': { groupId: 'label' },
	'label-lexicon-icon-height': { groupId: 'label' },
	'label-lexicon-icon-margin-top': { groupId: 'label' },
	'label-item-spacer-x': { groupId: 'label' },
	'label-dismissible-text-transform': { groupId: 'label' },
	'label-close': { groupId: 'label' },
	'label-lg': { groupId: 'label' },
	'label-primary-bg': { groupId: 'label' },
	'label-primary-border-color': { groupId: 'label' },
	'label-primary-color': { groupId: 'label' },
	'label-primary-hover-bg': { groupId: 'label' },
	'label-primary-hover-border-color': { groupId: 'label' },
	'label-primary-hover-color': { groupId: 'label' },
	'label-primary-link-color': { groupId: 'label' },
	'label-primary-link-hover-color': { groupId: 'label' },
	'label-secondary-bg': { groupId: 'label' },
	'label-secondary-border-color': { groupId: 'label' },
	'label-secondary-color': { groupId: 'label' },
	'label-secondary-hover-bg': { groupId: 'label' },
	'label-secondary-hover-border-color': { groupId: 'label' },
	'label-secondary-hover-color': { groupId: 'label' },
	'label-secondary-link-color': { groupId: 'label' },
	'label-secondary-link-hover-color': { groupId: 'label' },
	'label-info-bg': { groupId: 'label' },
	'label-info-border-color': { groupId: 'label' },
	'label-info-color': { groupId: 'label' },
	'label-info-hover-bg': { groupId: 'label' },
	'label-info-hover-border-color': { groupId: 'label' },
	'label-info-hover-color': { groupId: 'label' },
	'label-info-link-color': { groupId: 'label' },
	'label-info-link-hover-color': { groupId: 'label' },
	'label-success-bg': { groupId: 'label' },
	'label-success-border-color': { groupId: 'label' },
	'label-success-color': { groupId: 'label' },
	'label-success-hover-bg': { groupId: 'label' },
	'label-success-hover-border-color': { groupId: 'label' },
	'label-success-hover-color': { groupId: 'label' },
	'label-success-link-color': { groupId: 'label' },
	'label-success-link-hover-color': { groupId: 'label' },
	'label-warning-bg': { groupId: 'label' },
	'label-warning-border-color': { groupId: 'label' },
	'label-warning-color': { groupId: 'label' },
	'label-warning-hover-bg': { groupId: 'label' },
	'label-warning-hover-border-color': { groupId: 'label' },
	'label-warning-hover-color': { groupId: 'label' },
	'label-warning-link-color': { groupId: 'label' },
	'label-warning-link-hover-color': { groupId: 'label' },
	'label-danger-bg': { groupId: 'label' },
	'label-danger-border-color': { groupId: 'label' },
	'label-danger-color': { groupId: 'label' },
	'label-danger-hover-bg': { groupId: 'label' },
	'label-danger-hover-border-color': { groupId: 'label' },
	'label-danger-hover-color': { groupId: 'label' },
	'label-danger-link-color': { groupId: 'label' },
	'label-danger-link-hover-color': { groupId: 'label' },
	'label-light-bg': { groupId: 'label' },
	'label-light-border-color': { groupId: 'label' },
	'label-light-color': { groupId: 'label' },
	'label-light-hover-bg': { groupId: 'label' },
	'label-light-hover-border-color': { groupId: 'label' },
	'label-light-hover-color': { groupId: 'label' },
	'label-light-link-color': { groupId: 'label' },
	'label-light-link-hover-color': { groupId: 'label' },
	'label-dark-bg': { groupId: 'label' },
	'label-dark-border-color': { groupId: 'label' },
	'label-dark-color': { groupId: 'label' },
	'label-dark-hover-bg': { groupId: 'label' },
	'label-dark-hover-border-color': { groupId: 'label' },
	'label-dark-hover-color': { groupId: 'label' },
	'label-dark-link-color': { groupId: 'label' },
	'label-dark-link-hover-color': { groupId: 'label' },
	'badge-font-size': { groupId: 'badge' },
	'badge-font-weight': { groupId: 'badge' },
	'badge-padding-y': { groupId: 'badge' },
	'badge-padding-x': { groupId: 'badge' },
	'badge-line-height': { groupId: 'badge' },
	'badge-spacer-y': { groupId: 'badge' },
	'badge-spacer-x': { groupId: 'badge' },
	'badge-border-width': { groupId: 'badge' },
	'badge-border-style': { groupId: 'badge' },
	'badge-border-color': { groupId: 'badge' },
	'badge-border-radius': { groupId: 'badge' },
	'badge-link-color': { groupId: 'badge' },
	'badge-link-hover-color': { groupId: 'badge' },
	'badge-link-text-decoration': { groupId: 'badge' },
	'badge-link-hover-text-decoration': { groupId: 'badge' },
	'badge-lexicon-icon-width': { groupId: 'badge' },
	'badge-lexicon-icon-height': { groupId: 'badge' },
	'badge-lexicon-icon-margin-top': { groupId: 'badge' },
	'badge-item-expand-min-width': { groupId: 'badge' },
	'badge-item-spacer-x': { groupId: 'badge' },
	'badge-pill-border-radius': { groupId: 'badge' },
	'badge-pill-padding-x': { groupId: 'badge' },
	'badge-close': { groupId: 'badge' },
	'badge-primary-bg': { groupId: 'badge' },
	'badge-primary-hover-bg': { groupId: 'badge' },
	'badge-primary-border-color': { groupId: 'badge' },
	'badge-primary-hover-border-color': { groupId: 'badge' },
	'badge-primary-color': { groupId: 'badge' },
	'badge-primary-hover-color': { groupId: 'badge' },
	'badge-primary-link-color': { groupId: 'badge' },
	'badge-primary-link-hover-color': { groupId: 'badge' },
	'badge-secondary-bg': { groupId: 'badge' },
	'badge-secondary-hover-bg': { groupId: 'badge' },
	'badge-secondary-border-color': { groupId: 'badge' },
	'badge-secondary-hover-border-color': { groupId: 'badge' },
	'badge-secondary-color': { groupId: 'badge' },
	'badge-secondary-hover-color': { groupId: 'badge' },
	'badge-secondary-link-color': { groupId: 'badge' },
	'badge-secondary-link-hover-color': { groupId: 'badge' },
	'badge-success-bg': { groupId: 'badge' },
	'badge-success-hover-bg': { groupId: 'badge' },
	'badge-success-border-color': { groupId: 'badge' },
	'badge-success-hover-border-color': { groupId: 'badge' },
	'badge-success-color': { groupId: 'badge' },
	'badge-success-hover-color': { groupId: 'badge' },
	'badge-success-link-color': { groupId: 'badge' },
	'badge-success-link-hover-color': { groupId: 'badge' },
	'badge-info-bg': { groupId: 'badge' },
	'badge-info-hover-bg': { groupId: 'badge' },
	'badge-info-border-color': { groupId: 'badge' },
	'badge-info-hover-border-color': { groupId: 'badge' },
	'badge-info-color': { groupId: 'badge' },
	'badge-info-hover-color': { groupId: 'badge' },
	'badge-info-link-color': { groupId: 'badge' },
	'badge-info-link-hover-color': { groupId: 'badge' },
	'badge-warning-bg': { groupId: 'badge' },
	'badge-warning-hover-bg': { groupId: 'badge' },
	'badge-warning-border-color': { groupId: 'badge' },
	'badge-warning-hover-border-color': { groupId: 'badge' },
	'badge-warning-color': { groupId: 'badge' },
	'badge-warning-hover-color': { groupId: 'badge' },
	'badge-warning-link-color': { groupId: 'badge' },
	'badge-warning-link-hover-color': { groupId: 'badge' },
	'badge-danger-bg': { groupId: 'badge' },
	'badge-danger-hover-bg': { groupId: 'badge' },
	'badge-danger-border-color': { groupId: 'badge' },
	'badge-danger-hover-border-color': { groupId: 'badge' },
	'badge-danger-color': { groupId: 'badge' },
	'badge-danger-hover-color': { groupId: 'badge' },
	'badge-danger-link-color': { groupId: 'badge' },
	'badge-danger-link-hover-color': { groupId: 'badge' },
	'badge-light-bg': { groupId: 'badge' },
	'badge-light-hover-bg': { groupId: 'badge' },
	'badge-light-border-color': { groupId: 'badge' },
	'badge-light-hover-border-color': { groupId: 'badge' },
	'badge-light-color': { groupId: 'badge' },
	'badge-light-hover-color': { groupId: 'badge' },
	'badge-light-link-color': { groupId: 'badge' },
	'badge-light-link-hover-color': { groupId: 'badge' },
	'badge-dark-bg': { groupId: 'badge' },
	'badge-dark-hover-bg': { groupId: 'badge' },
	'badge-dark-border-color': { groupId: 'badge' },
	'badge-dark-hover-border-color': { groupId: 'badge' },
	'badge-dark-color': { groupId: 'badge' },
	'badge-dark-hover-color': { groupId: 'badge' },
	'badge-dark-link-color': { groupId: 'badge' },
	'badge-dark-link-hover-color': { groupId: 'badge' },
	'sticker-size': { groupId: 'sticker' },
	'sticker-font-size': { groupId: 'sticker' },
	'sticker-font-weight': { groupId: 'sticker' },
	'sticker-border-width': { groupId: 'sticker' },
	'sticker-border-style': { groupId: 'sticker' },
	'sticker-border-color': { groupId: 'sticker' },
	'sticker-border-radius': { groupId: 'sticker' },
	'sticker-color': { groupId: 'sticker' },
	'sticker-inline-item-font-size': { groupId: 'sticker' },
	'sticker-inside-offset': { groupId: 'sticker' },
	'sticker-outside-offset': { groupId: 'sticker' },
	'sticker-circle-border-radius': { groupId: 'sticker' },
	'sticker-sm': { groupId: 'sticker' },
	'sticker-lg': { groupId: 'sticker' },
	'sticker-xl': { groupId: 'sticker' },
	'sticker-primary-bg': { groupId: 'sticker' },
	'sticker-primary-border-color': { groupId: 'sticker' },
	'sticker-primary-color': { groupId: 'sticker' },
	'sticker-secondary-bg': { groupId: 'sticker' },
	'sticker-secondary-border-color': { groupId: 'sticker' },
	'sticker-secondary-color': { groupId: 'sticker' },
	'sticker-info-bg': { groupId: 'sticker' },
	'sticker-info-border-color': { groupId: 'sticker' },
	'sticker-info-color': { groupId: 'sticker' },
	'sticker-success-bg': { groupId: 'sticker' },
	'sticker-success-border-color': { groupId: 'sticker' },
	'sticker-success-color': { groupId: 'sticker' },
	'sticker-warning-bg': { groupId: 'sticker' },
	'sticker-warning-border-color': { groupId: 'sticker' },
	'sticker-warning-color': { groupId: 'sticker' },
	'sticker-danger-bg': { groupId: 'sticker' },
	'sticker-danger-border-color': { groupId: 'sticker' },
	'sticker-danger-color': { groupId: 'sticker' },
	'sticker-light-bg': { groupId: 'sticker' },
	'sticker-light-border-color': { groupId: 'sticker' },
	'sticker-light-color': { groupId: 'sticker' },
	'sticker-dark-bg': { groupId: 'sticker' },
	'sticker-dark-border-color': { groupId: 'sticker' },
	'sticker-dark-color': { groupId: 'sticker' },
	'btn-font-size': { groupId: 'button' },
	'btn-font-size-mobile': { groupId: 'button' },
	'btn-font-weight': { groupId: 'button' },
	'btn-padding-y': { groupId: 'button' },
	'btn-padding-y-mobile': { groupId: 'button' },
	'btn-padding-x': { groupId: 'button' },
	'btn-padding-x-mobile': { groupId: 'button' },
	'btn-line-height': { groupId: 'button' },
	'btn-border-width': { groupId: 'button' },
	'btn-border-radius': { groupId: 'button' },
	'btn-box-shadow': { groupId: 'button' },
	'btn-cursor': { groupId: 'button' },
	'btn-transition': { groupId: 'button' },
	'btn-focus-width': { groupId: 'button' },
	'btn-focus-box-shadow': { groupId: 'button' },
	'btn-link-disabled-color': { groupId: 'button' },
	'btn-active-box-shadow': { groupId: 'button' },
	'btn-disabled-cursor': { groupId: 'button' },
	'btn-disabled-opacity': { groupId: 'button' },
	'btn-monospaced-size': { groupId: 'button' },
	'btn-monospaced-size-mobile': { groupId: 'button' },
	'btn-monospaced-padding-y': { groupId: 'button' },
	'btn-monospaced-padding-x': { groupId: 'button' },
	'btn-inline-item-font-size': { groupId: 'button' },
	'btn-section-font-size': { groupId: 'button' },
	'btn-section-font-weight': { groupId: 'button' },
	'btn-section-line-height': { groupId: 'button' },
	'btn-block-spacing-y': { groupId: 'button' },
	'btn-group-item-margin-right': { groupId: 'button' },
	'btn-toolbar-spacer-y': { groupId: 'button' },
	'btn-toolbar-spacer-x': { groupId: 'button' },
	'btn-font-size-sm': { groupId: 'button' },
	'btn-font-size-sm-mobile': { groupId: 'button' },
	'btn-padding-y-sm': { groupId: 'button' },
	'btn-padding-y-sm-mobile': { groupId: 'button' },
	'btn-line-height-sm': { groupId: 'button' },
	'btn-border-radius-sm': { groupId: 'button' },
	'btn-inline-item-font-size-sm': { groupId: 'button' },
	'btn-monospaced-size-sm': { groupId: 'button' },
	'btn-monospaced-size-sm-mobile': { groupId: 'button' },
	'btn-monospaced-padding-y-sm': { groupId: 'button' },
	'btn-monospaced-padding-x-sm': { groupId: 'button' },
	'btn-section-font-size-sm': { groupId: 'button' },
	'btn-font-size-lg': { groupId: 'button' },
	'btn-font-size-lg-mobile': { groupId: 'button' },
	'btn-padding-y-lg': { groupId: 'button' },
	'btn-padding-y-lg-mobile': { groupId: 'button' },
	'btn-padding-x-lg': { groupId: 'button' },
	'btn-padding-x-lg-mobile': { groupId: 'button' },
	'btn-line-height-lg': { groupId: 'button' },
	'btn-border-radius-lg': { groupId: 'button' },
	'btn-monospaced-size-lg': { groupId: 'button' },
	'btn-monospaced-size-lg-mobile': { groupId: 'button' },
	'btn-monospaced-padding-y-lg': { groupId: 'button' },
	'btn-monospaced-padding-x-lg': { groupId: 'button' },
	'btn-inline-item-font-size-lg': { groupId: 'button' },
	'btn-section-font-size-lg': { groupId: 'button' },
	'btn-primary': { groupId: 'button' },
	'btn-secondary': { groupId: 'button' },
	'btn-success': { groupId: 'button' },
	'btn-info': { groupId: 'button' },
	'btn-warning': { groupId: 'button' },
	'btn-danger': { groupId: 'button' },
	'btn-light': { groupId: 'button' },
	'btn-dark': { groupId: 'button' },
	'btn-outline-primary': { groupId: 'button' },
	'btn-outline-secondary': { groupId: 'button' },
	'btn-outline-info': { groupId: 'button' },
	'btn-outline-success': { groupId: 'button' },
	'btn-outline-warning': { groupId: 'button' },
	'btn-outline-danger': { groupId: 'button' },
	'btn-outline-light': { groupId: 'button' },
	'breadcrumb-font-size': { groupId: 'breadcrumb' },
	'breadcrumb-font-weight': { groupId: 'breadcrumb' },
	'breadcrumb-padding-y': { groupId: 'breadcrumb' },
	'breadcrumb-padding-x': { groupId: 'breadcrumb' },
	'breadcrumb-margin-bottom': { groupId: 'breadcrumb' },
	'breadcrumb-bg': { groupId: 'breadcrumb' },
	'breadcrumb-border-radius': { groupId: 'breadcrumb' },
	'breadcrumb-text-transform': { groupId: 'breadcrumb' },
	'breadcrumb-item-padding': { groupId: 'breadcrumb' },
	'breadcrumb-link-color': { groupId: 'breadcrumb' },
	'breadcrumb-link-hover-color': { groupId: 'breadcrumb' },
	'breadcrumb-link-text-decoration': { groupId: 'breadcrumb' },
	'breadcrumb-link-hover-text-decoration': { groupId: 'breadcrumb' },
	'breadcrumb-active-color': { groupId: 'breadcrumb' },
	'breadcrumb-active-font-weight': { groupId: 'breadcrumb' },
	'breadcrumb-text-truncate-max-width': { groupId: 'breadcrumb' },
	'breadcrumb-text-truncate-max-width-mobile': { groupId: 'breadcrumb' },
	'breadcrumb-text-truncate-icon-spacer-x': { groupId: 'breadcrumb' },
	'breadcrumb-divider-svg-icon': { groupId: 'breadcrumb' },
	'breadcrumb-divider-svg-icon-width': { groupId: 'breadcrumb' },
	'breadcrumb-divider-svg-icon-height': { groupId: 'breadcrumb' },
	'breadcrumb-divider-font-family': { groupId: 'breadcrumb' },
	'breadcrumb-divider-font-weight': { groupId: 'breadcrumb' },
	'breadcrumb-divider': { groupId: 'breadcrumb' },
	'breadcrumb-divider-color': { groupId: 'breadcrumb' },
	'card-margin-bottom': { groupId: 'card' },
	'card-border-width': { groupId: 'card' },
	'card-border-style': { groupId: 'card' },
	'card-border-color': { groupId: 'card' },
	'card-border-radius': { groupId: 'card' },
	'card-bg': { groupId: 'card' },
	'card-box-shadow': { groupId: 'card' },
	'card-inner-border-radius': { groupId: 'card' },
	'card-rounded-inner-border-radius': { groupId: 'card' },
	'card-rounded-0-inner-border-radius': { groupId: 'card' },
	'card-rounded-circle-inner-border-radius': { groupId: 'card' },
	'card-body-padding-top': { groupId: 'card' },
	'card-body-padding-right': { groupId: 'card' },
	'card-body-padding-bottom': { groupId: 'card' },
	'card-body-padding-left': { groupId: 'card' },
	'card-divider-height': { groupId: 'card' },
	'card-divider-spacer-y': { groupId: 'card' },
	'card-divider-spacer-x': { groupId: 'card' },
	'card-divider-bg': { groupId: 'card' },
	'card-title': { groupId: 'card' },
	'card-title-link': { groupId: 'card' },
	'card-subtitle': { groupId: 'card' },
	'card-subtitle-link': { groupId: 'card' },
	'card-link': { groupId: 'card' },
	'checkbox-position': { groupId: 'card' },
	'form-check-card-checked-box-shadow': { groupId: 'card' },
	'checkbox-left-card-padding': { groupId: 'card' },
	'checkbox-right-card-padding': { groupId: 'card' },
	'card-type-asset': { groupId: 'card' },
	'image-card': { groupId: 'card' },
	'file-card': { groupId: 'card' },
	'user-card': { groupId: 'card' },
	'card-type-directory': { groupId: 'card' },
	'card-section-header-font-size': { groupId: 'card' },
	'card-section-header-font-weight': { groupId: 'card' },
	'card-section-header-padding': { groupId: 'card' },
	'card-section-header-line-height': { groupId: 'card' },
	'card-section-header-margin-bottom': { groupId: 'card' },
	'card-section-header-color': { groupId: 'card' },
	'card-section-header-text-transform': { groupId: 'card' },
	'card-spacer-y': { groupId: 'card' },
	'card-spacer-x': { groupId: 'card' },
	'card-cap-bg': { groupId: 'card' },
	'card-img-overlay-padding': { groupId: 'card' },
	'card-group-margin': { groupId: 'card' },
	'card-deck-margin': { groupId: 'card' },
	'card-columns-count': { groupId: 'card' },
	'card-columns-gap': { groupId: 'card' },
	'card-columns-margin': { groupId: 'card' },
	'dropdown-min-width': { groupId: 'dropdown' },
	'dropdown-min-height': { groupId: 'dropdown' },
	'dropdown-max-width': { groupId: 'dropdown' },
	'dropdown-max-width-mobile': { groupId: 'dropdown' },
	'dropdown-max-height': { groupId: 'dropdown' },
	'dropdown-max-height-mobile': { groupId: 'dropdown' },
	'dropdown-font-size': { groupId: 'dropdown' },
	'dropdown-font-size-mobile': { groupId: 'dropdown' },
	'dropdown-padding-y': { groupId: 'dropdown' },
	'dropdown-spacer': { groupId: 'dropdown' },
	'dropdown-bg': { groupId: 'dropdown' },
	'dropdown-border-width': { groupId: 'dropdown' },
	'dropdown-border-style': { groupId: 'dropdown' },
	'dropdown-border-color': { groupId: 'dropdown' },
	'dropdown-border-radius': { groupId: 'dropdown' },
	'dropdown-box-shadow': { groupId: 'dropdown' },
	'dropdown-item-padding-y': { groupId: 'dropdown' },
	'dropdown-item-padding-x': { groupId: 'dropdown' },
	'dropdown-item-disabled-cursor': { groupId: 'dropdown' },
	'dropdown-item-indicator-size': { groupId: 'dropdown' },
	'dropdown-item-indicator-spacer-x': { groupId: 'dropdown' },
	'dropdown-link-font-weight': { groupId: 'dropdown' },
	'dropdown-link-active-font-weight': { groupId: 'dropdown' },
	'dropdown-link-hover-bg': { groupId: 'dropdown' },
	'dropdown-link-active-bg': { groupId: 'dropdown' },
	'dropdown-link-color': { groupId: 'dropdown' },
	'dropdown-link-hover-color': { groupId: 'dropdown' },
	'dropdown-link-active-color': { groupId: 'dropdown' },
	'dropdown-link-disabled-color': { groupId: 'dropdown' },
	'dropdown-header-font-size': { groupId: 'dropdown' },
	'dropdown-header-font-size-mobile': { groupId: 'dropdown' },
	'dropdown-header-padding-y': { groupId: 'dropdown' },
	'dropdown-header-padding-x': { groupId: 'dropdown' },
	'dropdown-header-margin-top': { groupId: 'dropdown' },
	'dropdown-header-margin-bottom': { groupId: 'dropdown' },
	'dropdown-header-color': { groupId: 'dropdown' },
	'dropdown-header-text-transform': { groupId: 'dropdown' },
	'dropdown-subheader-font-size': { groupId: 'dropdown' },
	'dropdown-subheader-font-weight': { groupId: 'dropdown' },
	'dropdown-subheader-padding-y': { groupId: 'dropdown' },
	'dropdown-subheader-padding-x': { groupId: 'dropdown' },
	'dropdown-subheader-margin-top': { groupId: 'dropdown' },
	'dropdown-subheader-margin-bottom': { groupId: 'dropdown' },
	'dropdown-subheader-color': { groupId: 'dropdown' },
	'dropdown-subheader-text-transform': { groupId: 'dropdown' },
	'dropdown-action-toggle-size': { groupId: 'dropdown' },
	'dropdown-action-toggle-font-size': { groupId: 'dropdown' },
	'dropdown-action-toggle-border-radius': { groupId: 'dropdown' },
	'dropdown-action-toggle-disabled-cursor': { groupId: 'dropdown' },
	'dropdown-action-toggle-disabled-opacity': { groupId: 'dropdown' },
	'dropdown-caption-color': { groupId: 'dropdown' },
	'dropdown-caption-font-size': { groupId: 'dropdown' },
	'dropdown-caption-font-weight': { groupId: 'dropdown' },
	'dropdown-divider-bg': { groupId: 'dropdown' },
	'dropdown-inline-scroller-max-height': { groupId: 'dropdown' },
	'dropdown-inline-scroller-max-height-mobile': { groupId: 'dropdown' },
	'dropdown-wide-width': { groupId: 'dropdown' },
	'dropdown-full-wide-header-spacer-y': { groupId: 'dropdown' },
	'dropdown-alert-font-size': { groupId: 'dropdown' },
	'dropdown-alert-line-height': { groupId: 'dropdown' },
	'dropdown-alert-padding-y': { groupId: 'dropdown' },
	'dropdown-alert-padding-x': { groupId: 'dropdown' },
	'dropdown-alert-margin': { groupId: 'dropdown' },
	'input-height': { groupId: 'input' },
	'input-height-mobile': { groupId: 'input' },
	'input-font-size': { groupId: 'input' },
	'input-font-size-mobile': { groupId: 'input' },
	'input-padding-y': { groupId: 'input' },
	'input-padding-x': { groupId: 'input' },
	'input-line-height': { groupId: 'input' },
	'input-border-top-width': { groupId: 'input' },
	'input-border-right-width': { groupId: 'input' },
	'input-border-bottom-width': { groupId: 'input' },
	'input-border-left-width': { groupId: 'input' },
	'input-border-width': { groupId: 'input' },
	'input-border-color': { groupId: 'input' },
	'input-border-radius': { groupId: 'input' },
	'input-color': { groupId: 'input' },
	'input-bg': { groupId: 'input' },
	'input-box-shadow': { groupId: 'input' },
	'input-transition': { groupId: 'input' },
	'input-placeholder-color': { groupId: 'input' },
	'input-focus-border-color': { groupId: 'input' },
	'input-focus-bg': { groupId: 'input' },
	'input-focus-box-shadow': { groupId: 'input' },
	'input-focus-color': { groupId: 'input' },
	'input-focus-width': { groupId: 'input' },
	'input-placeholder-focus-color': { groupId: 'input' },
	'input-disabled-border-color': { groupId: 'input' },
	'input-disabled-color': { groupId: 'input' },
	'input-disabled-bg': { groupId: 'input' },
	'input-disabled-cursor': { groupId: 'input' },
	'input-disabled-opacity': { groupId: 'input' },
	'input-placeholder-disabled-color': { groupId: 'input' },
	'input-label-font-size': { groupId: 'input' },
	'input-label-font-size-mobile': { groupId: 'input' },
	'input-label-font-weight': { groupId: 'input' },
	'input-label-color': { groupId: 'input' },
	'input-label-margin-bottom': { groupId: 'input' },
	'input-label-for-cursor': { groupId: 'input' },
	'input-label-reference-mark-font-size': { groupId: 'input' },
	'input-label-reference-mark-spacer': { groupId: 'input' },
	'input-label-reference-mark-color': { groupId: 'input' },
	'input-label-reference-mark-vertical-align': { groupId: 'input' },
	'input-label-focus-color': { groupId: 'input' },
	'input-label-disabled-color': { groupId: 'input' },
	'input-label-disabled-cursor': { groupId: 'input' },
	'input-select-padding-top': { groupId: 'input' },
	'input-select-padding-left': { groupId: 'input' },
	'input-select-padding-right': { groupId: 'input' },
	'input-select-padding-bottom': { groupId: 'input' },
	'input-select-icon-color': { groupId: 'input' },
	'input-select-icon': { groupId: 'input' },
	'input-select-bg': { groupId: 'input' },
	'input-select-bg-position': { groupId: 'input' },
	'input-select-bg-size': { groupId: 'input' },
	'input-select-cursor': { groupId: 'input' },
	'input-select-icon-focus-color': { groupId: 'input' },
	'input-select-icon-focus': { groupId: 'input' },
	'input-select-focus-bg': { groupId: 'input' },
	'input-select-icon-disabled-color': { groupId: 'input' },
	'input-select-icon-disabled': { groupId: 'input' },
	'input-textarea-height': { groupId: 'input' },
	'form-check-input-gutter': { groupId: 'input' },
	'form-check-input-margin-y': { groupId: 'input' },
	'form-check-input-margin-x': { groupId: 'input' },
	'form-check-input-cursor': { groupId: 'input' },
	'form-check-input-disabled-cursor': { groupId: 'input' },
	'form-check-label-text-disabled-cursor': { groupId: 'input' },
	'form-check-label-text-padding-left': { groupId: 'input' },
	'form-check-label-text-margin-left': { groupId: 'input' },
	'form-check-label-cursor': { groupId: 'input' },
	'form-check-inline-margin-x': { groupId: 'input' },
	'form-check-inline-input-margin-x': { groupId: 'input' },
	'input-file-cursor': { groupId: 'input' },
	'input-readonly-border-color': { groupId: 'input' },
	'input-readonly-bg': { groupId: 'input' },
	'input-readonly-color': { groupId: 'input' },
	'input-readonly-cursor': { groupId: 'input' },
	'input-readonly-focus-border-color': { groupId: 'input' },
	'input-readonly-focus-bg': { groupId: 'input' },
	'input-readonly-focus-color': { groupId: 'input' },
	'input-height-sm': { groupId: 'input' },
	'input-height-sm-mobile': { groupId: 'input' },
	'input-font-size-sm': { groupId: 'input' },
	'input-font-size-sm-mobile': { groupId: 'input' },
	'input-padding-y-sm': { groupId: 'input' },
	'input-padding-x-sm': { groupId: 'input' },
	'input-line-height-sm': { groupId: 'input' },
	'input-border-radius-sm': { groupId: 'input' },
	'input-height-lg': { groupId: 'input' },
	'input-height-lg-mobile': { groupId: 'input' },
	'input-font-size-lg': { groupId: 'input' },
	'input-font-size-lg-mobile': { groupId: 'input' },
	'input-padding-y-lg': { groupId: 'input' },
	'input-padding-x-lg': { groupId: 'input' },
	'input-line-height-lg': { groupId: 'input' },
	'input-border-radius-lg': { groupId: 'input' },
	'form-group-margin-bottom': { groupId: 'input' },
	'form-group-margin-bottom-mobile': { groupId: 'input' },
	'form-group-autofit-margin-bottom': { groupId: 'input' },
	'form-group-item-label-max-width': { groupId: 'input' },
	'form-group-item-label-spacer': { groupId: 'input' },
	'custom-control-description-font-size': { groupId: 'input-custom' },
	'custom-control-description-padding-left': { groupId: 'input-custom' },
	'custom-control-description-cursor': { groupId: 'input-custom' },
	'custom-control-description-disabled-color': { groupId: 'input-custom' },
	'custom-control-description-disabled-cursor': { groupId: 'input-custom' },
	'custom-control-spacer-x': { groupId: 'input-custom' },
	'custom-control-gutter': { groupId: 'input-custom' },
	'custom-control-indicator-size': { groupId: 'input-custom' },
	'custom-control-indicator-border-width': { groupId: 'input-custom' },
	'custom-control-indicator-border-style': { groupId: 'input-custom' },
	'custom-control-indicator-border-color': { groupId: 'input-custom' },
	'custom-control-indicator-bg': { groupId: 'input-custom' },
	'custom-control-indicator-bg-size': { groupId: 'input-custom' },
	'custom-control-indicator-box-shadow': { groupId: 'input-custom' },
	'custom-control-indicator-focus-box-shadow': { groupId: 'input-custom' },
	'custom-control-indicator-active-border-color': { groupId: 'input-custom' },
	'custom-control-indicator-active-bg': { groupId: 'input-custom' },
	'custom-control-indicator-active-color': { groupId: 'input-custom' },
	'custom-control-indicator-active-box-shadow': { groupId: 'input-custom' },
	'custom-control-indicator-indeterminate-border-color': { groupId: 'input-custom' },
	'custom-control-indicator-disabled-border-color': { groupId: 'input-custom' },
	'custom-control-indicator-disabled-bg': { groupId: 'input-custom' },
	'custom-control-indicator-disabled-cursor': { groupId: 'input-custom' },
	'custom-control-indicator-checked-border-color': { groupId: 'input-custom' },
	'custom-control-indicator-checked-color': { groupId: 'input-custom' },
	'custom-control-indicator-checked-bg': { groupId: 'input-custom' },
	'custom-control-indicator-checked-box-shadow': { groupId: 'input-custom' },
	'custom-control-indicator-active-checked-border-color': { groupId: 'input-custom' },
	'custom-control-indicator-active-checked-bg': { groupId: 'input-custom' },
	'custom-control-indicator-disabled-checked-border-color': { groupId: 'input-custom' },
	'custom-control-indicator-disabled-checked-bg': { groupId: 'input-custom' },
	'custom-checkbox-indicator-border-radius': { groupId: 'input-custom' },
	'custom-checkbox-indicator-icon-indeterminate': { groupId: 'input-custom' },
	'custom-checkbox-indicator-icon-indeterminate-bg-size': { groupId: 'input-custom' },
	'custom-checkbox-indicator-indeterminate-color': { groupId: 'input-custom' },
	'custom-checkbox-indicator-indeterminate-bg': { groupId: 'input-custom' },
	'custom-checkbox-indicator-indeterminate-box-shadow': { groupId: 'input-custom' },
	'custom-checkbox-indicator-icon-checked': { groupId: 'input-custom' },
	'custom-checkbox-indicator-icon-checked-bg-size': { groupId: 'input-custom' },
	'custom-radio-indicator-border-radius': { groupId: 'input-custom' },
	'custom-radio-indicator-disabled-border-color': { groupId: 'input-custom' },
	'custom-radio-indicator-icon-checked': { groupId: 'input-custom' },
	'custom-radio-indicator-icon-checked-bg-size': { groupId: 'input-custom' },
	'custom-radio-indicator-disabled-checked-border-color': { groupId: 'input-custom' },
	'input-group-addon-min-width': { groupId: 'input-group' },
	'input-group-addon-font-weight': { groupId: 'input-group' },
	'input-group-addon-padding-y': { groupId: 'input-group' },
	'input-group-addon-padding-x': { groupId: 'input-group' },
	'input-group-addon-border-color': { groupId: 'input-group' },
	'input-group-addon-color': { groupId: 'input-group' },
	'input-group-addon-bg': { groupId: 'input-group' },
	'input-group-secondary-addon-border-width': { groupId: 'input-group' },
	'input-group-secondary-addon-border-color': { groupId: 'input-group' },
	'input-group-secondary-addon-color': { groupId: 'input-group' },
	'input-group-secondary-addon-bg': { groupId: 'input-group' },
	'input-group-inset-item-color': { groupId: 'input-group' },
	'input-group-addon-min-width-sm': { groupId: 'input-group' },
	'input-group-addon-padding-y-sm': { groupId: 'input-group' },
	'input-group-addon-padding-x-sm': { groupId: 'input-group' },
	'input-group-addon-min-width-lg': { groupId: 'input-group' },
	'input-group-addon-padding-y-lg': { groupId: 'input-group' },
	'input-group-addon-padding-x-lg': { groupId: 'input-group' },
	'input-group-stacked-sm-down': { groupId: 'input-group' },
	'form-control-label-size': { groupId: 'input-group' },
	'input-success-border-color': { groupId: 'input-validation' },
	'input-success-color': { groupId: 'input-validation' },
	'input-success-bg': { groupId: 'input-validation' },
	'input-success-box-shadow': { groupId: 'input-validation' },
	'input-success-select-icon-color': { groupId: 'input-validation' },
	'input-success-select-icon': { groupId: 'input-validation' },
	'input-success-checkbox-label-color': { groupId: 'input-validation' },
	'input-success-label-color': { groupId: 'input-validation' },
	'form-feedback-valid-color': { groupId: 'input-validation' },
	'input-success-focus-border-color': { groupId: 'input-validation' },
	'input-success-focus-color': { groupId: 'input-validation' },
	'input-success-focus-bg': { groupId: 'input-validation' },
	'input-success-focus-box-shadow': { groupId: 'input-validation' },
	'input-warning-border-color': { groupId: 'input-validation' },
	'input-warning-color': { groupId: 'input-validation' },
	'input-warning-bg': { groupId: 'input-validation' },
	'input-warning-box-shadow': { groupId: 'input-validation' },
	'input-warning-select-icon-color': { groupId: 'input-validation' },
	'input-warning-select-icon': { groupId: 'input-validation' },
	'input-warning-checkbox-label-color': { groupId: 'input-validation' },
	'input-warning-label-color': { groupId: 'input-validation' },
	'form-feedback-warning-color': { groupId: 'input-validation' },
	'input-warning-focus-border-color': { groupId: 'input-validation' },
	'input-warning-focus-color': { groupId: 'input-validation' },
	'input-warning-focus-bg': { groupId: 'input-validation' },
	'input-warning-focus-box-shadow': { groupId: 'input-validation' },
	'input-danger-border-color': { groupId: 'input-validation' },
	'input-danger-color': { groupId: 'input-validation' },
	'input-danger-bg': { groupId: 'input-validation' },
	'input-danger-box-shadow': { groupId: 'input-validation' },
	'input-danger-select-icon-color': { groupId: 'input-validation' },
	'input-danger-select-icon': { groupId: 'input-validation' },
	'input-danger-checkbox-label-color': { groupId: 'input-validation' },
	'input-danger-label-color': { groupId: 'input-validation' },
	'form-feedback-invalid-color': { groupId: 'input-validation' },
	'input-danger-focus-border-color': { groupId: 'input-validation' },
	'input-danger-focus-color': { groupId: 'input-validation' },
	'input-danger-focus-bg': { groupId: 'input-validation' },
	'input-danger-focus-box-shadow': { groupId: 'input-validation' },
	'form-feedback-font-size': { groupId: 'input-validation' },
	'form-feedback-font-weight': { groupId: 'input-validation' },
	'form-feedback-margin-top': { groupId: 'input-validation' },
	'form-feedback-indicator-margin-x': { groupId: 'input-validation' },
	'form-text-font-size': { groupId: 'input-validation' },
	'form-text-font-weight': { groupId: 'input-validation' },
	'form-text-margin-top': { groupId: 'input-validation' },
	'form-text-color': { groupId: 'input-validation' },
	'list-group-font-size': { groupId: 'list-group' },
	'list-group-border-width': { groupId: 'list-group' },
	'list-group-border-color': { groupId: 'list-group' },
	'list-group-border-radius': { groupId: 'list-group' },
	'list-group-color': { groupId: 'list-group' },
	'list-group-bg': { groupId: 'list-group' },
	'list-group-box-shadow': { groupId: 'list-group' },
	'list-group-margin-top': { groupId: 'list-group' },
	'list-group-margin-bottom': { groupId: 'list-group' },
	'list-group-hover-bg': { groupId: 'list-group' },
	'list-group-active-border-color': { groupId: 'list-group' },
	'list-group-active-color': { groupId: 'list-group' },
	'list-group-active-bg': { groupId: 'list-group' },
	'list-group-disabled-color': { groupId: 'list-group' },
	'list-group-disabled-bg': { groupId: 'list-group' },
	'list-group-item-padding-y': { groupId: 'list-group' },
	'list-group-item-padding-x': { groupId: 'list-group' },
	'list-group-item-flex-align-items': { groupId: 'list-group' },
	'list-group-item-flex-offset-top': { groupId: 'list-group' },
	'list-group-item-flex-checkbox-offset-top': { groupId: 'list-group' },
	'list-group-item-flex-list-group-title-offset-top': { groupId: 'list-group' },
	'list-group-link-color': { groupId: 'list-group' },
	'list-group-link-hover-color': { groupId: 'list-group' },
	'list-group-link-active-color': { groupId: 'list-group' },
	'list-group-detail-margin-top': { groupId: 'list-group' },
	'list-group-detail-margin-bottom': { groupId: 'list-group' },
	'list-group-notification-item-border-top-width': { groupId: 'list-group' },
	'list-group-notification-item-border-right-width': { groupId: 'list-group' },
	'list-group-notification-item-border-bottom-width': { groupId: 'list-group' },
	'list-group-notification-item-border-left-width': { groupId: 'list-group' },
	'list-group-notification-item-border-top-color': { groupId: 'list-group' },
	'list-group-notification-item-border-right-color': { groupId: 'list-group' },
	'list-group-notification-item-border-bottom-color': { groupId: 'list-group' },
	'list-group-notification-item-border-left-color': { groupId: 'list-group' },
	'list-group-notification-item-active-border-top-color': { groupId: 'list-group' },
	'list-group-notification-item-active-border-right-color': { groupId: 'list-group' },
	'list-group-notification-item-active-border-bottom-color': { groupId: 'list-group' },
	'list-group-notification-item-active-border-left-color': { groupId: 'list-group' },
	'list-group-notification-item': { groupId: 'list-group' },
	'list-group-header-padding-y': { groupId: 'list-group' },
	'list-group-header-padding-x': { groupId: 'list-group' },
	'list-group-header-bg': { groupId: 'list-group' },
	'list-group-header-title': { groupId: 'list-group' },
	'list-group-title': { groupId: 'list-group' },
	'list-group-title-active-color': { groupId: 'list-group' },
	'list-group-title-link': { groupId: 'list-group' },
	'list-group-subtitle': { groupId: 'list-group' },
	'list-group-subtitle-link': { groupId: 'list-group' },
	'list-group-text': { groupId: 'list-group' },
	'list-group-text-active-color': { groupId: 'list-group' },
	'list-group-text-link': { groupId: 'list-group' },
	'list-group-subtext': { groupId: 'list-group' },
	'list-group-subtext-active-color': { groupId: 'list-group' },
	'list-group-subtext-link': { groupId: 'list-group' },
	'list-group-action-color': { groupId: 'list-group' },
	'list-group-action-hover-color': { groupId: 'list-group' },
	'list-group-action-active-color': { groupId: 'list-group' },
	'list-group-action-active-bg': { groupId: 'list-group' },
	'loading-icon-font-size': { groupId: 'loading-animations' },
	'loading-icon-font-size-sm': { groupId: 'loading-animations' },
	'loading-animation': { groupId: 'loading-animations' },
	'loading-animation-light': { groupId: 'loading-animations' },
	'menubar-vertical-transparent-md': { groupId: 'menubar' },
	'menubar-vertical-expand-md': { groupId: 'menubar' },
	'menubar-vertical-expand-lg': { groupId: 'menubar' },
	'menubar-vertical-transparent-lg': { groupId: 'menubar' },
	'modal-backdrop-bg': { groupId: 'modal' },
	'modal-backdrop-opacity': { groupId: 'modal' },
	'modal-transition': { groupId: 'modal' },
	'modal-dialog-margin-y-sm-up': { groupId: 'modal' },
	'modal-dialog-margin': { groupId: 'modal' },
	'modal-content-border-width': { groupId: 'modal' },
	'modal-content-border-color': { groupId: 'modal' },
	'modal-content-border-radius': { groupId: 'modal' },
	'modal-content-bg': { groupId: 'modal' },
	'modal-content-box-shadow-sm-up': { groupId: 'modal' },
	'modal-content-box-shadow-xs': { groupId: 'modal' },
	'modal-inner-padding': { groupId: 'modal' },
	'modal-header-height': { groupId: 'modal' },
	'modal-header-height-mobile': { groupId: 'modal' },
	'modal-header-padding': { groupId: 'modal' },
	'modal-header-border-width': { groupId: 'modal' },
	'modal-header-border-color': { groupId: 'modal' },
	'modal-header-color': { groupId: 'modal' },
	'modal-header-bg': { groupId: 'modal' },
	'modal-title-font-size': { groupId: 'modal' },
	'modal-title-font-size-mobile': { groupId: 'modal' },
	'modal-title-font-weight': { groupId: 'modal' },
	'modal-title-line-height': { groupId: 'modal' },
	'modal-title-text-align': { groupId: 'modal' },
	'modal-title-indicator-font-size': { groupId: 'modal' },
	'modal-title-indicator-spacer-x': { groupId: 'modal' },
	'modal-close-spacer-x': { groupId: 'modal' },
	'modal-body-color': { groupId: 'modal' },
	'modal-body-bg': { groupId: 'modal' },
	'modal-footer-height': { groupId: 'modal' },
	'modal-footer-height-mobile': { groupId: 'modal' },
	'modal-footer-padding-y': { groupId: 'modal' },
	'modal-footer-padding-x': { groupId: 'modal' },
	'modal-footer-border-width': { groupId: 'modal' },
	'modal-footer-border-color': { groupId: 'modal' },
	'modal-footer-color': { groupId: 'modal' },
	'modal-footer-bg': { groupId: 'modal' },
	'modal-footer-box-shadow': { groupId: 'modal' },
	'modal-item-padding-y': { groupId: 'modal' },
	'modal-item-padding-x': { groupId: 'modal' },
	'modal-sm': { groupId: 'modal' },
	'modal-md': { groupId: 'modal' },
	'modal-lg': { groupId: 'modal' },
	'modal-success': { groupId: 'modal' },
	'modal-info': { groupId: 'modal' },
	'modal-warning': { groupId: 'modal' },
	'modal-danger': { groupId: 'modal' },
	'nav-font-size': { groupId: 'nav' },
	'nav-form-padding-top': { groupId: 'nav' },
	'nav-form-padding-right': { groupId: 'nav' },
	'nav-form-padding-bottom': { groupId: 'nav' },
	'nav-form-padding-left': { groupId: 'nav' },
	'nav-item-monospaced-size': { groupId: 'nav' },
	'nav-link-padding-y': { groupId: 'nav' },
	'nav-link-padding-x': { groupId: 'nav' },
	'nav-link-disabled-color': { groupId: 'nav' },
	'nav-link-disabled-cursor': { groupId: 'nav' },
	'nav-btn-padding-y': { groupId: 'nav' },
	'nav-btn-padding-x': { groupId: 'nav' },
	'nav-btn-margin-y': { groupId: 'nav' },
	'nav-btn-margin-x': { groupId: 'nav' },
	'nav-stacked-nav-form-padding-top': { groupId: 'nav' },
	'nav-stacked-nav-form-padding-right': { groupId: 'nav' },
	'nav-stacked-nav-form-padding-bottom': { groupId: 'nav' },
	'nav-stacked-nav-form-padding-left': { groupId: 'nav' },
	'nav-nested-spacer-x': { groupId: 'nav' },
	'nav-nested-margins-spacer-x': { groupId: 'nav' },
	'nav-pills-border-radius': { groupId: 'nav-pills' },
	'nav-pills-link-active-color': { groupId: 'nav-pills' },
	'nav-pills-link-active-bg': { groupId: 'nav-pills' },
	'nav-tabs-font-size': { groupId: 'nav-tabs' },
	'nav-tabs-border-width': { groupId: 'nav-tabs' },
	'nav-tabs-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-border-radius': { groupId: 'nav-tabs' },
	'nav-tabs-link-padding-y': { groupId: 'nav-tabs' },
	'nav-tabs-link-padding-x': { groupId: 'nav-tabs' },
	'nav-tabs-link-color': { groupId: 'nav-tabs' },
	'nav-tabs-link-hover-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-link-active-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-link-active-color': { groupId: 'nav-tabs' },
	'nav-tabs-link-active-bg': { groupId: 'nav-tabs' },
	'nav-tabs-link-show-border-color': { groupId: 'nav-tabs' },
	'nav-tabs-link-show-color': { groupId: 'nav-tabs' },
	'nav-tabs-link-show-bg': { groupId: 'nav-tabs' },
	'nav-tabs-tab-pane-padding': { groupId: 'nav-tabs' },
	'nav-tabs-tab-pane-bg': { groupId: 'nav-tabs' },
	'nav-tabs-tab-pane-border-radius': { groupId: 'nav-tabs' },
	'nav-underline-font-size': { groupId: 'nav-underline' },
	'nav-underline-link-padding-y': { groupId: 'nav-underline' },
	'nav-underline-link-padding-x': { groupId: 'nav-underline' },
	'nav-underline-link-color': { groupId: 'nav-underline' },
	'nav-underline-link-highlight-height': { groupId: 'nav-underline' },
	'nav-underline-link-highlight-content': { groupId: 'nav-underline' },
	'nav-underline-link-highlight-top': { groupId: 'nav-underline' },
	'nav-underline-link-highlight-right': { groupId: 'nav-underline' },
	'nav-underline-link-highlight-bottom': { groupId: 'nav-underline' },
	'nav-underline-link-highlight-left': { groupId: 'nav-underline' },
	'nav-underline-link-hover-color': { groupId: 'nav-underline' },
	'nav-underline-link-active-color': { groupId: 'nav-underline' },
	'nav-underline-link-active-content': { groupId: 'nav-underline' },
	'nav-underline-link-active-highlight-height': { groupId: 'nav-underline' },
	'nav-underline-link-active-highlight': { groupId: 'nav-underline' },
	'nav-underline-link-disabled-color': { groupId: 'nav-underline' },
	'nav-underline-link-disabled-highlight': { groupId: 'nav-underline' },
	'enable-scaling-navbar': { groupId: 'navbar' },
	'navbar-font-size': { groupId: 'navbar' },
	'navbar-padding-y': { groupId: 'navbar' },
	'navbar-padding-x': { groupId: 'navbar' },
	'navbar-border-radius': { groupId: 'navbar' },
	'navbar-nav-link-padding-x': { groupId: 'navbar' },
	'navbar-text-truncate-max-width': { groupId: 'navbar' },
	'navbar-text-truncate-spacer-right': { groupId: 'navbar' },
	'navbar-brand-font-size': { groupId: 'navbar' },
	'navbar-brand-height': { groupId: 'navbar' },
	'navbar-brand-padding-y': { groupId: 'navbar' },
	'navbar-title-font-size': { groupId: 'navbar' },
	'navbar-title-font-weight': { groupId: 'navbar' },
	'navbar-title-margin-bottom': { groupId: 'navbar' },
	'navbar-title-text-transform': { groupId: 'navbar' },
	'navbar-toggler-font-size': { groupId: 'navbar' },
	'navbar-toggler-padding-y': { groupId: 'navbar' },
	'navbar-toggler-padding-x': { groupId: 'navbar' },
	'navbar-toggler-border-radius': { groupId: 'navbar' },
	'navbar-toggler-cursor': { groupId: 'navbar' },
	'navbar-underline-active-bg': { groupId: 'navbar' },
	'navbar-light-color': { groupId: 'navbar' },
	'navbar-light-hover-color': { groupId: 'navbar' },
	'navbar-light-active-color': { groupId: 'navbar' },
	'navbar-light-disabled-color': { groupId: 'navbar' },
	'navbar-light-toggler-border-color': { groupId: 'navbar' },
	'navbar-light-toggler-icon-bg': { groupId: 'navbar' },
	'navbar-dark-color': { groupId: 'navbar' },
	'navbar-dark-hover-color': { groupId: 'navbar' },
	'navbar-dark-active-color': { groupId: 'navbar' },
	'navbar-dark-disabled-color': { groupId: 'navbar' },
	'navbar-dark-toggler-border-color': { groupId: 'navbar' },
	'navbar-dark-toggler-icon-bg': { groupId: 'navbar' },
	'application-bar-size': { groupId: 'navbar-application-bar' },
	'application-bar-dark': { groupId: 'navbar-application-bar' },
	'management-bar-size': { groupId: 'navbar-management-bar' },
	'management-bar-light': { groupId: 'navbar-management-bar' },
	'management-bar-primary': { groupId: 'navbar-management-bar' },
	'navigation-bar-size': { groupId: 'navbar-navigation-bar' },
	'navigation-bar-light': { groupId: 'navbar-navigation-bar' },
	'navigation-bar-secondary': { groupId: 'navbar-navigation-bar' },
	'pagination-font-size': { groupId: 'pagination' },
	'pagination-padding-y': { groupId: 'pagination' },
	'pagination-padding-x': { groupId: 'pagination' },
	'pagination-line-height': { groupId: 'pagination' },
	'pagination-margin-bottom': { groupId: 'pagination' },
	'pagination-border-width': { groupId: 'pagination' },
	'pagination-border-color': { groupId: 'pagination' },
	'pagination-color': { groupId: 'pagination' },
	'pagination-bg': { groupId: 'pagination' },
	'pagination-item-height': { groupId: 'pagination' },
	'pagination-item-margin-y': { groupId: 'pagination' },
	'pagination-item-margin-x': { groupId: 'pagination' },
	'pagination-dropdown-menu-spacer-y': { groupId: 'pagination' },
	'pagination-link-border-radius': { groupId: 'pagination' },
	'pagination-link-cursor': { groupId: 'pagination' },
	'pagination-hover-border-color': { groupId: 'pagination' },
	'pagination-hover-color': { groupId: 'pagination' },
	'pagination-hover-bg': { groupId: 'pagination' },
	'pagination-focus-box-shadow': { groupId: 'pagination' },
	'pagination-active-border-color': { groupId: 'pagination' },
	'pagination-active-color': { groupId: 'pagination' },
	'pagination-active-bg': { groupId: 'pagination' },
	'pagination-disabled-border-color': { groupId: 'pagination' },
	'pagination-disabled-color': { groupId: 'pagination' },
	'pagination-disabled-bg': { groupId: 'pagination' },
	'pagination-disabled-cursor': { groupId: 'pagination' },
	'pagination-disabled-opacity': { groupId: 'pagination' },
	'pagination-disabled-pointer-events': { groupId: 'pagination' },
	'pagination-results-color': { groupId: 'pagination' },
	'pagination-items-per-page-font-size': { groupId: 'pagination' },
	'pagination-items-per-page-border-color': { groupId: 'pagination' },
	'pagination-items-per-page-border-radius': { groupId: 'pagination' },
	'pagination-items-per-page-color': { groupId: 'pagination' },
	'pagination-items-per-page-bg': { groupId: 'pagination' },
	'pagination-items-per-page-hover-border-color': { groupId: 'pagination' },
	'pagination-items-per-page-hover-color': { groupId: 'pagination' },
	'pagination-items-per-page-hover-bg': { groupId: 'pagination' },
	'pagination-font-size-sm': { groupId: 'pagination' },
	'pagination-padding-y-sm': { groupId: 'pagination' },
	'pagination-padding-x-sm': { groupId: 'pagination' },
	'pagination-line-height-sm': { groupId: 'pagination' },
	'pagination-item-height-sm': { groupId: 'pagination' },
	'pagination-link-border-radius-sm': { groupId: 'pagination' },
	'pagination-font-size-lg': { groupId: 'pagination' },
	'pagination-padding-y-lg': { groupId: 'pagination' },
	'pagination-padding-x-lg': { groupId: 'pagination' },
	'pagination-line-height-lg': { groupId: 'pagination' },
	'pagination-item-height-lg': { groupId: 'pagination' },
	'pagination-link-border-radius-lg': { groupId: 'pagination' },
	'panel-margin-bottom': { groupId: 'panel' },
	'panel-border-top-width': { groupId: 'panel' },
	'panel-border-right-width': { groupId: 'panel' },
	'panel-border-bottom-width': { groupId: 'panel' },
	'panel-border-left-width': { groupId: 'panel' },
	'panel-border-style': { groupId: 'panel' },
	'panel-border-color': { groupId: 'panel' },
	'panel-border-radius': { groupId: 'panel' },
	'panel-bg': { groupId: 'panel' },
	'panel-box-shadow': { groupId: 'panel' },
	'panel-header-font-size': { groupId: 'panel' },
	'panel-header-padding-y': { groupId: 'panel' },
	'panel-header-padding-x': { groupId: 'panel' },
	'panel-header-line-height': { groupId: 'panel' },
	'panel-header-border-bottom-width': { groupId: 'panel' },
	'panel-header-offset-border-radius': { groupId: 'panel' },
	'panel-header-link-text-decoration': { groupId: 'panel' },
	'panel-header-link-hover-text-decoration': { groupId: 'panel' },
	'panel-header-collapse-icon-font-size': { groupId: 'panel' },
	'panel-header-collapse-icon-padding-left': { groupId: 'panel' },
	'panel-header-collapse-icon-padding-right': { groupId: 'panel' },
	'panel-header-collapse-icon-top': { groupId: 'panel' },
	'panel-header-collapse-icon-right': { groupId: 'panel' },
	'panel-header-collapse-icon-bottom': { groupId: 'panel' },
	'panel-header-collapse-icon-left': { groupId: 'panel' },
	'panel-title-font-size': { groupId: 'panel' },
	'panel-title-font-weight': { groupId: 'panel' },
	'panel-title-text-transform': { groupId: 'panel' },
	'panel-body-padding-y': { groupId: 'panel' },
	'panel-body-padding-x': { groupId: 'panel' },
	'panel-footer-padding-y': { groupId: 'panel' },
	'panel-footer-padding-x': { groupId: 'panel' },
	'panel-footer-border-top-width': { groupId: 'panel' },
	'panel-footer-offset-border-radius': { groupId: 'panel' },
	'panel-group-panel-margin-bottom': { groupId: 'panel' },
	'panel-group-flush-body-padding': { groupId: 'panel' },
	'panel-group-flush-body-margin-bottom': { groupId: 'panel' },
	'panel-group-flush-collapse-icon-padding-right': { groupId: 'panel' },
	'panel-group-flush-collapse-icon-padding-left': { groupId: 'panel' },
	'panel-group-flush-collapse-icon-right': { groupId: 'panel' },
	'panel-group-flush-collapse-icon-left': { groupId: 'panel' },
	'panel-secondary': { groupId: 'panel' },
	'popover-max-width': { groupId: 'popover' },
	'popover-font-size': { groupId: 'popover' },
	'popover-bg': { groupId: 'popover' },
	'popover-border-width': { groupId: 'popover' },
	'popover-border-color': { groupId: 'popover' },
	'popover-border-radius': { groupId: 'popover' },
	'popover-box-shadow': { groupId: 'popover' },
	'popover-header-font-size': { groupId: 'popover' },
	'popover-header-font-weight': { groupId: 'popover' },
	'popover-header-padding-y': { groupId: 'popover' },
	'popover-header-padding-x': { groupId: 'popover' },
	'popover-header-margin-y': { groupId: 'popover' },
	'popover-header-margin-x': { groupId: 'popover' },
	'popover-header-border-color': { groupId: 'popover' },
	'popover-header-color': { groupId: 'popover' },
	'popover-header-bg': { groupId: 'popover' },
	'popover-body-padding-y': { groupId: 'popover' },
	'popover-body-padding-x': { groupId: 'popover' },
	'popover-body-color': { groupId: 'popover' },
	'popover-inline-scroller-max-height': { groupId: 'popover' },
	'popover-arrow-outer-color': { groupId: 'popover' },
	'popover-arrow-width': { groupId: 'popover' },
	'popover-arrow-height': { groupId: 'popover' },
	'popover-arrow-color': { groupId: 'popover' },
	'popover-arrow-offset': { groupId: 'popover' },
	'popover-bottom-arrow-color': { groupId: 'popover' },
	'popover-bottom-left-arrow-color': { groupId: 'popover' },
	'popover-bottom-right-arrow-color': { groupId: 'popover' },
	'popover-left-arrow-color': { groupId: 'popover' },
	'popover-left-bottom-arrow-color': { groupId: 'popover' },
	'popover-left-top-arrow-color': { groupId: 'popover' },
	'popover-right-arrow-color': { groupId: 'popover' },
	'popover-right-bottom-arrow-color': { groupId: 'popover' },
	'popover-right-top-arrow-color': { groupId: 'popover' },
	'popover-top-arrow-color': { groupId: 'popover' },
	'popover-top-left-arrow-color': { groupId: 'popover' },
	'popover-top-right-arrow-color': { groupId: 'popover' },
	'progress-min-width': { groupId: 'progress-bar' },
	'progress-height': { groupId: 'progress-bar' },
	'progress-font-size': { groupId: 'progress-bar' },
	'progress-border-radius': { groupId: 'progress-bar' },
	'progress-bg': { groupId: 'progress-bar' },
	'progress-box-shadow': { groupId: 'progress-bar' },
	'progress-bar-color': { groupId: 'progress-bar' },
	'progress-bar-bg': { groupId: 'progress-bar' },
	'progress-bar-box-shadow': { groupId: 'progress-bar' },
	'progress-bar-animation-timing': { groupId: 'progress-bar' },
	'progress-bar-transition': { groupId: 'progress-bar' },
	'progress-group-stacked-progress-margin-top': { groupId: 'progress-bar' },
	'progress-group-stacked-progress-margin-bottom': { groupId: 'progress-bar' },
	'progress-group-addon-font-size': { groupId: 'progress-bar' },
	'progress-group-addon-font-weight': { groupId: 'progress-bar' },
	'progress-group-addon-spacer-x': { groupId: 'progress-bar' },
	'progress-group-feedback-color': { groupId: 'progress-bar' },
	'progress-group-subtitle': { groupId: 'progress-bar' },
	'progress-height-lg': { groupId: 'progress-bar' },
	'progress-font-size-lg': { groupId: 'progress-bar' },
	'progress-border-radius-lg': { groupId: 'progress-bar' },
	'progress-bar-success-bg': { groupId: 'progress-bar' },
	'progress-group-feedback-success-color': { groupId: 'progress-bar' },
	'progress-bar-info-bg': { groupId: 'progress-bar' },
	'progress-group-feedback-info-color': { groupId: 'progress-bar' },
	'progress-bar-warning-bg': { groupId: 'progress-bar' },
	'progress-group-feedback-warning-color': { groupId: 'progress-bar' },
	'progress-bar-danger-bg': { groupId: 'progress-bar' },
	'progress-group-feedback-danger-color': { groupId: 'progress-bar' },
	'multi-step-nav-padding-y': { groupId: 'multi-step-nav' },
	'multi-step-nav-padding-x': { groupId: 'multi-step-nav' },
	'multi-step-nav-margin-bottom': { groupId: 'multi-step-nav' },
	'multi-step-icon-size': { groupId: 'multi-step-nav' },
	'multi-step-icon-font-size': { groupId: 'multi-step-nav' },
	'multi-step-icon-font-weight': { groupId: 'multi-step-nav' },
	'multi-step-icon-border-radius': { groupId: 'multi-step-nav' },
	'multi-step-icon-color': { groupId: 'multi-step-nav' },
	'multi-step-icon-bg': { groupId: 'multi-step-nav' },
	'multi-step-icon-hover-color': { groupId: 'multi-step-nav' },
	'multi-step-icon-hover-bg': { groupId: 'multi-step-nav' },
	'multi-step-icon-hover-text-decoration': { groupId: 'multi-step-nav' },
	'multi-step-divider-height': { groupId: 'multi-step-nav' },
	'multi-step-divider-spacer-x': { groupId: 'multi-step-nav' },
	'multi-step-divider-bg': { groupId: 'multi-step-nav' },
	'multi-step-divider-top': { groupId: 'multi-step-nav' },
	'multi-step-indicator-width': { groupId: 'multi-step-nav' },
	'multi-step-indicator-label-max-width': { groupId: 'multi-step-nav' },
	'multi-step-indicator-label-font-size': { groupId: 'multi-step-nav' },
	'multi-step-indicator-label-font-weight': { groupId: 'multi-step-nav' },
	'multi-step-indicator-label-color': { groupId: 'multi-step-nav' },
	'multi-step-title-max-width': { groupId: 'multi-step-nav' },
	'multi-step-title-font-size': { groupId: 'multi-step-nav' },
	'multi-step-title-font-weight': { groupId: 'multi-step-nav' },
	'multi-step-title-margin-bottom': { groupId: 'multi-step-nav' },
	'multi-step-title-color': { groupId: 'multi-step-nav' },
	'multi-step-item-width': { groupId: 'multi-step-nav' },
	'multi-step-item-margin-bottom': { groupId: 'multi-step-nav' },
	'multi-step-item-fixed-width': { groupId: 'multi-step-nav' },
	'multi-step-icon-complete-color': { groupId: 'multi-step-nav' },
	'multi-step-icon-complete-bg': { groupId: 'multi-step-nav' },
	'multi-step-icon-complete-bg-image': { groupId: 'multi-step-nav' },
	'multi-step-icon-complete-bg-position': { groupId: 'multi-step-nav' },
	'multi-step-icon-complete-bg-size': { groupId: 'multi-step-nav' },
	'multi-step-divider-complete-bg': { groupId: 'multi-step-nav' },
	'multi-step-dropdown-indicator-complete-width': { groupId: 'multi-step-nav' },
	'multi-step-dropdown-indicator-complete-icon': { groupId: 'multi-step-nav' },
	'multi-step-icon-active-color': { groupId: 'multi-step-nav' },
	'multi-step-icon-active-bg': { groupId: 'multi-step-nav' },
	'multi-step-icon-active-bg-image': { groupId: 'multi-step-nav' },
	'multi-step-icon-active-bg-position': { groupId: 'multi-step-nav' },
	'multi-step-icon-active-bg-size': { groupId: 'multi-step-nav' },
	'multi-step-divider-active-bg': { groupId: 'multi-step-nav' },
	'multi-step-icon-disabled-color': { groupId: 'multi-step-nav' },
	'multi-step-icon-disabled-bg': { groupId: 'multi-step-nav' },
	'multi-step-icon-disabled-bg-image': { groupId: 'multi-step-nav' },
	'multi-step-icon-disabled-bg-position': { groupId: 'multi-step-nav' },
	'multi-step-icon-disabled-bg-size': { groupId: 'multi-step-nav' },
	'multi-step-icon-disabled-cursor': { groupId: 'multi-step-nav' },
	'multi-step-divider-disabled-bg': { groupId: 'multi-step-nav' },
	'multi-step-title-disabled-color': { groupId: 'multi-step-nav' },
	'multi-step-indicator-label-disabled-color': { groupId: 'multi-step-nav' },
	'sheet-padding-top': { groupId: 'sheet' },
	'sheet-padding-right': { groupId: 'sheet' },
	'sheet-padding-bottom': { groupId: 'sheet' },
	'sheet-padding-left': { groupId: 'sheet' },
	'sheet-border-width': { groupId: 'sheet' },
	'sheet-border-style': { groupId: 'sheet' },
	'sheet-border-color': { groupId: 'sheet' },
	'sheet-border-radius': { groupId: 'sheet' },
	'sheet-bg': { groupId: 'sheet' },
	'sheet-padding-top-mobile': { groupId: 'sheet' },
	'sheet-padding-right-mobile': { groupId: 'sheet' },
	'sheet-padding-bottom-mobile': { groupId: 'sheet' },
	'sheet-padding-left-mobile': { groupId: 'sheet' },
	'sheet-header-margin-bottom': { groupId: 'sheet' },
	'sheet-header-margin-bottom-mobile': { groupId: 'sheet' },
	'sheet-section-margin-bottom': { groupId: 'sheet' },
	'sheet-section-margin-bottom-mobile': { groupId: 'sheet' },
	'sheet-panel-group-margin-bottom': { groupId: 'sheet' },
	'sheet-panel-group-margin-bottom-mobile': { groupId: 'sheet' },
	'sheet-footer-margin-top': { groupId: 'sheet' },
	'sheet-footer-margin-right': { groupId: 'sheet' },
	'sheet-footer-margin-bottom': { groupId: 'sheet' },
	'sheet-footer-margin-left': { groupId: 'sheet' },
	'sheet-footer-margin-top-mobile': { groupId: 'sheet' },
	'sheet-footer-margin-right-mobile': { groupId: 'sheet' },
	'sheet-footer-margin-bottom-mobile': { groupId: 'sheet' },
	'sheet-footer-margin-left-mobile': { groupId: 'sheet' },
	'sheet-footer-btn-block-sm-down': { groupId: 'sheet' },
	'sheet-lg-max-width': { groupId: 'sheet' },
	'sheet-title-font-size': { groupId: 'sheet' },
	'sheet-title-font-weight': { groupId: 'sheet' },
	'sheet-title-line-height': { groupId: 'sheet' },
	'sheet-title-margin-bottom': { groupId: 'sheet' },
	'sheet-title-color': { groupId: 'sheet' },
	'sheet-title-font-size-mobile': { groupId: 'sheet' },
	'sheet-title-margin-bottom-mobile': { groupId: 'sheet' },
	'sheet-subtitle-font-size': { groupId: 'sheet' },
	'sheet-subtitle-font-weight': { groupId: 'sheet' },
	'sheet-subtitle-padding-y': { groupId: 'sheet' },
	'sheet-subtitle-padding-x': { groupId: 'sheet' },
	'sheet-subtitle-line-height': { groupId: 'sheet' },
	'sheet-subtitle-margin-bottom': { groupId: 'sheet' },
	'sheet-subtitle-border-width': { groupId: 'sheet' },
	'sheet-subtitle-border-style': { groupId: 'sheet' },
	'sheet-subtitle-border-color': { groupId: 'sheet' },
	'sheet-subtitle-color': { groupId: 'sheet' },
	'sheet-subtitle-text-transform': { groupId: 'sheet' },
	'sheet-subtitle-heading-text-margin-top': { groupId: 'sheet' },
	'sheet-subtitle-heading-text-margin-bottom': { groupId: 'sheet' },
	'sheet-subtitle-font-size-mobile': { groupId: 'sheet' },
	'sheet-subtitle-margin-bottom-mobile': { groupId: 'sheet' },
	'sheet-subtitle-link-color': { groupId: 'sheet' },
	'sheet-subtitle-link-hover-color': { groupId: 'sheet' },
	'sheet-subtitle-link-text-decoration': { groupId: 'sheet' },
	'sheet-subtitle-link-hover-text-decoration': { groupId: 'sheet' },
	'sheet-subtitle-collapse-icon-padding-left': { groupId: 'sheet' },
	'sheet-subtitle-collapse-icon-padding-right': { groupId: 'sheet' },
	'sheet-subtitle-collapse-icon-top': { groupId: 'sheet' },
	'sheet-subtitle-collapse-icon-right': { groupId: 'sheet' },
	'sheet-subtitle-collapse-icon-bottom': { groupId: 'sheet' },
	'sheet-subtitle-collapse-icon-left': { groupId: 'sheet' },
	'sheet-tertiary-title-font-size': { groupId: 'sheet' },
	'sheet-tertiary-title-font-weight': { groupId: 'sheet' },
	'sheet-tertiary-title-padding-y': { groupId: 'sheet' },
	'sheet-tertiary-title-padding-x': { groupId: 'sheet' },
	'sheet-tertiary-title-line-height': { groupId: 'sheet' },
	'sheet-tertiary-title-margin-bottom': { groupId: 'sheet' },
	'sheet-tertiary-title-color': { groupId: 'sheet' },
	'sheet-tertiary-title-text-transform': { groupId: 'sheet' },
	'sheet-tertiary-title-font-size-mobile': { groupId: 'sheet' },
	'sheet-tertiary-title-margin-bottom-mobile': { groupId: 'sheet' },
	'sheet-text-font-size': { groupId: 'sheet' },
	'sheet-text-font-weight': { groupId: 'sheet' },
	'sheet-text-margin-bottom': { groupId: 'sheet' },
	'sheet-text-color': { groupId: 'sheet' },
	'sheet-text-font-size-mobile': { groupId: 'sheet' },
	'sheet-text-margin-bottom-mobile': { groupId: 'sheet' },
	'sidenav-width': { groupId: 'sidebar' },
	'sidenav-transition': { groupId: 'sidebar' },
	'sidebar-padding-top': { groupId: 'sidebar' },
	'sidebar-padding-right': { groupId: 'sidebar' },
	'sidebar-padding-bottom': { groupId: 'sidebar' },
	'sidebar-padding-left': { groupId: 'sidebar' },
	'sidebar-header-component-title': { groupId: 'sidebar' },
	'sidebar-header-component-subtitle': { groupId: 'sidebar' },
	'sidebar-dt': { groupId: 'sidebar' },
	'sidebar-dd': { groupId: 'sidebar' },
	'sidebar-panel-margin-bottom': { groupId: 'sidebar' },
	'sidebar-list-group-type': { groupId: 'sidebar' },
	'sidebar-list-group-font-size': { groupId: 'sidebar' },
	'sidebar-list-group-border-color': { groupId: 'sidebar' },
	'sidebar-list-group-bg': { groupId: 'sidebar' },
	'sidebar-list-group-item-padding': { groupId: 'sidebar' },
	'sidebar-list-group-autofit-col-padding-y': { groupId: 'sidebar' },
	'sidebar-list-group-autofit-col-padding-x': { groupId: 'sidebar' },
	'sidebar-list-group-sticker-size': { groupId: 'sidebar' },
	'sidebar-light': { groupId: 'sidebar' },
	'sidebar-light-navigation-bar': { groupId: 'sidebar' },
	'table-responsive-margin-bottom': { groupId: 'table' },
	'table-font-size': { groupId: 'table' },
	'table-border-width': { groupId: 'table' },
	'table-border-color': { groupId: 'table' },
	'table-margin-bottom': { groupId: 'table' },
	'table-bg': { groupId: 'table' },
	'table-quick-action-menu-bg': { groupId: 'table' },
	'table-quick-action-menu-align-items': { groupId: 'table' },
	'table-cell-gutters': { groupId: 'table' },
	'table-bordered-border-width': { groupId: 'table' },
	'table-accent-bg': { groupId: 'table' },
	'table-quick-action-menu-accent-bg': { groupId: 'table' },
	'table-quick-action-menu-accent-active-bg': { groupId: 'table' },
	'table-hover-bg': { groupId: 'table' },
	'table-quick-action-menu-hover-bg': { groupId: 'table' },
	'table-active-bg': { groupId: 'table' },
	'table-quick-action-menu-active-bg': { groupId: 'table' },
	'table-disabled-color': { groupId: 'table' },
	'table-disabled-bg': { groupId: 'table' },
	'table-disabled-cursor': { groupId: 'table' },
	'table-disabled-pointer-events': { groupId: 'table' },
	'table-head-height': { groupId: 'table' },
	'table-head-font-size': { groupId: 'table' },
	'table-head-font-weight': { groupId: 'table' },
	'table-head-border-top-width': { groupId: 'table' },
	'table-head-border-bottom-width': { groupId: 'table' },
	'table-head-color': { groupId: 'table' },
	'table-head-bg': { groupId: 'table' },
	'table-head-link': { groupId: 'table' },
	'table-head-title-inline-item-spacer-x': { groupId: 'table' },
	'table-head-title-text-truncate-max-width': { groupId: 'table' },
	'table-data-border-top-width': { groupId: 'table' },
	'table-data-border-right-width': { groupId: 'table' },
	'table-data-border-bottom-width': { groupId: 'table' },
	'table-data-border-left-width': { groupId: 'table' },
	'table-data-border-style': { groupId: 'table' },
	'table-data-border-color': { groupId: 'table' },
	'table-data-vertical-align': { groupId: 'table' },
	'table-cell-padding': { groupId: 'table' },
	'table-cell-padding-sm': { groupId: 'table' },
	'table-cell-expand-min-width': { groupId: 'table' },
	'table-cell-expand-small-width': { groupId: 'table' },
	'table-cell-expand-small-max-width': { groupId: 'table' },
	'table-cell-expand-smaller-width': { groupId: 'table' },
	'table-cell-expand-smaller-max-width': { groupId: 'table' },
	'table-cell-expand-smallest-width': { groupId: 'table' },
	'table-cell-expand-smallest-max-width': { groupId: 'table' },
	'table-divider-font-weight': { groupId: 'table' },
	'table-divider-font-size': { groupId: 'table' },
	'table-divider-padding': { groupId: 'table' },
	'table-divider-color': { groupId: 'table' },
	'table-divider-bg': { groupId: 'table' },
	'table-divider-text-transform': { groupId: 'table' },
	'table-title': { groupId: 'table' },
	'table-title-link': { groupId: 'table' },
	'table-link': { groupId: 'table' },
	'table-action-link': { groupId: 'table' },
	'table-dark-border-color': { groupId: 'table' },
	'table-dark-color': { groupId: 'table' },
	'table-dark-bg': { groupId: 'table' },
	'table-dark-accent-bg': { groupId: 'table' },
	'table-dark-hover-bg': { groupId: 'table' },
	'table-list-font-size': { groupId: 'table' },
	'table-list-margin-top': { groupId: 'table' },
	'table-list-margin-bottom': { groupId: 'table' },
	'table-list-border-y-width': { groupId: 'table' },
	'table-list-border-x-width': { groupId: 'table' },
	'table-list-border-color': { groupId: 'table' },
	'table-list-border-radius': { groupId: 'table' },
	'table-list-color': { groupId: 'table' },
	'table-list-bg': { groupId: 'table' },
	'table-list-quick-action-menu-bg': { groupId: 'table' },
	'table-list-quick-action-menu-align-items': { groupId: 'table' },
	'table-list-accent-bg': { groupId: 'table' },
	'table-list-quick-action-menu-accent-bg': { groupId: 'table' },
	'table-list-quick-action-menu-accent-active-bg': { groupId: 'table' },
	'table-list-hover-bg': { groupId: 'table' },
	'table-list-quick-action-menu-hover-bg': { groupId: 'table' },
	'table-list-active-bg': { groupId: 'table' },
	'table-list-quick-action-menu-active-bg': { groupId: 'table' },
	'table-list-disabled-color': { groupId: 'table' },
	'table-list-disabled-bg': { groupId: 'table' },
	'table-list-disabled-cursor': { groupId: 'table' },
	'table-list-disabled-pointer-events': { groupId: 'table' },
	'table-list-head-height': { groupId: 'table' },
	'table-list-head-font-size': { groupId: 'table' },
	'table-list-head-font-weight': { groupId: 'table' },
	'table-list-head-bg': { groupId: 'table' },
	'table-list-head-vertical-alignment': { groupId: 'table' },
	'table-list-head-link': { groupId: 'table' },
	'table-list-divider-padding-y': { groupId: 'table' },
	'table-list-divider-padding-x': { groupId: 'table' },
	'table-list-title': { groupId: 'table' },
	'table-list-title-link': { groupId: 'table' },
	'table-list-link': { groupId: 'table' },
	'table-list-action-link': { groupId: 'table' },
	'tbar-item-padding-y': { groupId: 'tbar' },
	'tbar-item-padding-x': { groupId: 'tbar' },
	'component-tbar': { groupId: 'tbar' },
	'subnav-tbar': { groupId: 'tbar' },
	'subnav-tbar-component-title': { groupId: 'tbar' },
	'subnav-tbar-component-link': { groupId: 'tbar' },
	'subnav-tbar-light': { groupId: 'tbar' },
	'subnav-tbar-primary': { groupId: 'tbar' },
	'tooltip-max-width': { groupId: 'tooltip' },
	'tooltip-font-size': { groupId: 'tooltip' },
	'tooltip-padding-y': { groupId: 'tooltip' },
	'tooltip-padding-x': { groupId: 'tooltip' },
	'tooltip-margin': { groupId: 'tooltip' },
	'tooltip-border-radius': { groupId: 'tooltip' },
	'tooltip-color': { groupId: 'tooltip' },
	'tooltip-bg': { groupId: 'tooltip' },
	'tooltip-box-shadow': { groupId: 'tooltip' },
	'tooltip-opacity': { groupId: 'tooltip' },
	'tooltip-arrow-width': { groupId: 'tooltip' },
	'tooltip-arrow-height': { groupId: 'tooltip' },
	'tooltip-arrow-color': { groupId: 'tooltip' },
	'tooltip-arrow-offset': { groupId: 'tooltip' },
	'timeline-inner-spacing': { groupId: 'timeline' },
	'timeline-outer-spacing': { groupId: 'timeline' },
	'timeline-border-width': { groupId: 'timeline' },
	'timeline-border-modifier': { groupId: 'timeline' },
	'timeline-border-color': { groupId: 'timeline' },
	'timeline-item-padding-top': { groupId: 'timeline' },
	'timeline-item-padding-bottom': { groupId: 'timeline' },
	'timeline-item-label-color': { groupId: 'timeline' },
	'timeline-increment-bg': { groupId: 'timeline' },
	'timeline-icon-size': { groupId: 'timeline' },
	'timeline-icon-border-width': { groupId: 'timeline' },
	'timeline-icon-border-color': { groupId: 'timeline' },
	'timeline-icon-border-radius': { groupId: 'timeline' },
	'timeline-icon-bg': { groupId: 'timeline' },
	'timeline-icon-active-border-color': { groupId: 'timeline' },
	'timeline-icon-active-bg': { groupId: 'timeline' },
	'timeline-inner-spacing-xl': { groupId: 'timeline' },
	'timeline-outer-spacing-xl': { groupId: 'timeline' },
	'timeline-item-padding-y-xl': { groupId: 'timeline' },
	'toggle-switch-transition': { groupId: 'toggle-switch' },
	'toggle-switch-bar-width': { groupId: 'toggle-switch' },
	'toggle-switch-bar-width-mobile': { groupId: 'toggle-switch' },
	'toggle-switch-bar-height': { groupId: 'toggle-switch' },
	'toggle-switch-bar-height-mobile': { groupId: 'toggle-switch' },
	'toggle-switch-bar-font-size': { groupId: 'toggle-switch' },
	'toggle-switch-bar-font-size-mobile': { groupId: 'toggle-switch' },
	'toggle-switch-bar-padding': { groupId: 'toggle-switch' },
	'toggle-switch-bar-padding-mobile': { groupId: 'toggle-switch' },
	'toggle-switch-bar-border-width': { groupId: 'toggle-switch' },
	'toggle-switch-bar-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-bar-border-radius': { groupId: 'toggle-switch' },
	'toggle-switch-bar-bg': { groupId: 'toggle-switch' },
	'toggle-switch-bar-icon-color': { groupId: 'toggle-switch' },
	'toggle-switch-bar-focus-box-shadow': { groupId: 'toggle-switch' },
	'toggle-switch-button-width': { groupId: 'toggle-switch' },
	'toggle-switch-button-width-mobile': { groupId: 'toggle-switch' },
	'toggle-switch-button-font-size': { groupId: 'toggle-switch' },
	'toggle-switch-button-font-size-mobile': { groupId: 'toggle-switch' },
	'toggle-switch-button-border-width': { groupId: 'toggle-switch' },
	'toggle-switch-button-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-button-border-radius': { groupId: 'toggle-switch' },
	'toggle-switch-button-bg': { groupId: 'toggle-switch' },
	'toggle-switch-button-icon-color': { groupId: 'toggle-switch' },
	'toggle-switch-bar-on-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-bar-on-bg': { groupId: 'toggle-switch' },
	'toggle-switch-bar-on-icon-color': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-border-color': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-border-radius': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-bg': { groupId: 'toggle-switch' },
	'toggle-switch-button-on-icon-color': { groupId: 'toggle-switch' },
	'toggle-switch-disabled-cursor': { groupId: 'toggle-switch' },
	'toggle-switch-disabled-opacity': { groupId: 'toggle-switch' },
};