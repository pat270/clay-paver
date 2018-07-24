function ClayPaver() {
}

$(function() {
	var cpSpinnerTPL = '<div class="cp-loading"><div class="cp-loading-spinner"><div class="lds-heart-container"><div class="lds-heart"><div class="lds-heart-icon"></div></div></div><span class="cp-loading-msg">Loading...</span></div></div>';

	var cpStatusBarTPL = '<div class="cp-status-bar"><span class="cp-status-bar-msg"></span></div>';

	// Local Forage

	var dbName = 'cpDB';
	var tableName = 'defaultTheme';

	cpDB = localforage.createInstance({
		name: dbName,
		storeName: tableName
	});

	cpDBThemes = localforage.createInstance({
		name: dbName,
		storeName: 'themes'
	});

	cpDBThemes.getItem('currentTheme').then(function(value) {
		if (!value) {
			cpDBThemes.setItem(tableName, tableName);
			cpDBThemes.setItem('currentTheme', tableName).then(function() {
				cpDBThemes.getItem('currentTheme').then(function(value) {
					console.log(value);
				});
			});
		}
	});

	// ClayPaver

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

	ClayPaver.compileSass = function() {
		var sbVariableGroup = '';

		cpDBThemes.getItem('currentTheme').then(function(value) {
			cpDB.config({
				name: 'cpDB',
				storeName: value
			});

			cpDB = localforage.createInstance({
				name: 'cpDb',
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
					$('.cp-loading .cp-loading-msg').text('');

					if (atlasFontAwesome.length) {
						$('#atlasFontAwesome').html(result.text);
					}
					else {
						$('head').prepend('<style id="atlasFontAwesome">' + result.text + '</style>');
					}

					if (result.status) {
						setTimeout(function() {
							ClayPaver.showStatusBar('There was an error, check the browser console.');
						}, 750);

						console.log(result.formatted);
					}

					$('.cp-loading').remove();

					ClayPaver.removeStatusBar();

					Turbolinks.clearCache();
				});
			});

		});
	};

	ClayPaver.getVarName = function(item) {
		return item.substring(5, item.length - 1);
	};

	ClayPaver.populateForm = function() {
		var formId = $('.cp-variables-form').attr('id');

		if ($('.cp-variables-form').length) {
			$('.cp-variables-form .cp-form-control').val('');

			cpDBThemes.getItem('currentTheme').then(function(value) {
				cpDB.config().storeName = value;

				cpDB = localforage.createInstance({
					name: 'cpDb',
					storeName: value
				});

				cpDB.getItem(compileOrder[formId]).then(function(value) {
					for (var item in value) {
						$('#' + item).val(value[item]);
					}
				}).catch(function(err) {
					console.log(err);
				});
			});
		}
	};

	ClayPaver.setVariableGroup = function(groupId, formValues) {
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
	};

	ClayPaver.listThemes = function() {
		cpDBThemes.iterate(function(value, key, iterationNumber) {
			console.log(key + ': ' + value);
		});
	};

	ClayPaver.updateSwitchThemesDD = function() {
		$('#cpSwitchThemes + .clay-paver-dropdown-menu li:not(:first-child)').remove();

		cpDBThemes.iterate(function(value, key, iterationNumber) {
			var liTPL = '';

			if (key !== 'currentTheme') {
				liTPL = '<li><a class="clay-paver-page-link" data-theme="' + value + '" data-toggle="switch-theme" href="">' + value + '</a></li>';
			}

			$('#cpSwitchThemes').closest('.dropdown').find('.clay-paver-dropdown-menu').append(liTPL);
		});
	};

	ClayPaver.updateThemeName = function () {
		cpDBThemes.getItem('currentTheme').then(function(value) {
			$('#cpThemeName').text(value);
		});
	};

	ClayPaver.removeStatusBar = function() {
		$('.cp-status-bar').remove();
	};

	ClayPaver.showStatusBar = function(msg) {
		if (!$('.cp-status-bar').length) {
			$('body').append(cpStatusBarTPL);
		}

		$('.cp-status-bar-msg').text(msg);

		setTimeout(function() {
			$('.cp-status-bar').css({ opacity: 1 });
		}, 0);
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
			$('.cp-loading .cp-loading-msg').text('Compiling Sass...');

			setTimeout(function() {
				$('.cp-loading .cp-loading-msg').text("I'm almost done...");
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

		var formControl = $(this).closest('.cp-form-group').find('.cp-form-control');

		if (formControl.val()) {
			formControl.val('');
		}
		else {
			formControl.val('!default');
		}
	});

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

	doc.on('click', '#cpSwitchThemes', function(event) {
		ClayPaver.updateSwitchThemesDD();
	});

	// Populate Form

	doc.on('turbolinks:load', function() {
		ClayPaver.populateForm();
		ClayPaver.updateThemeName();
	});
});