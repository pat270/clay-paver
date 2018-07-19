var concat = require('gulp-concat');
var gulp = require('gulp');

var path = require('path');
var fs = require('fs');

var utils = require('./utils.js');

var GULP_SCSS_DIR = path.join(global.appRoot, 'gulp', 'scss');

var ATLAS_VAR_FILE = path.join(GULP_SCSS_DIR, 'atlas-theme', '_variables.scss');
var BOOTSTRAP_VAR_FILE = path.join(GULP_SCSS_DIR, 'bootstrap', '_variables.scss');
var LEXICON_BASE_VAR_FILE = path.join(GULP_SCSS_DIR, 'lexicon-base', '_variables.scss');

var SASS_VAR_REGEX = /\$(.*?)(?=:)/g;
var SASS_VAL_REGEX = /:(.*?)(?=;)/g;

gulp.task('build:atlas-vars', function() {
	var atlasVarGlob = [
		'src/scss/atlas-theme/variables/_globals.scss',
		'src/scss/atlas-theme/variables/_alerts.scss',
		'src/scss/atlas-theme/variables/_breadcrumbs.scss',
		'src/scss/atlas-theme/variables/_buttons.scss',
		'src/scss/atlas-theme/variables/_cards.scss',
		'src/scss/atlas-theme/variables/_dropdowns.scss',
		'src/scss/atlas-theme/variables/_figures.scss',
		'src/scss/atlas-theme/variables/_forms.scss',
		'src/scss/atlas-theme/variables/_icons.scss',
		'src/scss/atlas-theme/variables/_labels.scss',
		'src/scss/atlas-theme/variables/_badges.scss',
		'src/scss/atlas-theme/variables/_list-group.scss',
		'src/scss/atlas-theme/variables/_modals.scss',
		'src/scss/atlas-theme/variables/_nameplates.scss',
		'src/scss/atlas-theme/variables/_navs.scss',
		'src/scss/atlas-theme/variables/_nav-pills.scss',
		'src/scss/atlas-theme/variables/_nav-tabs.scss',
		'src/scss/atlas-theme/variables/_navbar.scss',
		'src/scss/atlas-theme/variables/_management-bar.scss',
		'src/scss/atlas-theme/variables/_pagination.scss',
		'src/scss/atlas-theme/variables/_pager.scss',
		'src/scss/atlas-theme/variables/_panels.scss',
		'src/scss/atlas-theme/variables/_popovers.scss',
		'src/scss/atlas-theme/variables/_progress-bars.scss',
		'src/scss/atlas-theme/variables/_stickers.scss',
		'src/scss/atlas-theme/variables/_sidebar.scss',
		'src/scss/atlas-theme/variables/_tables.scss',
		'src/scss/atlas-theme/variables/_timelines.scss',
		'src/scss/atlas-theme/variables/_toggle-card.scss',
		'src/scss/atlas-theme/variables/_toggle-switch.scss',
		'src/scss/atlas-theme/variables/_toolbars.scss',
		'src/scss/atlas-theme/variables/_tooltip.scss',
		'src/scss/atlas-theme/variables/_user-icons.scss',
	];

	return gulp.src(atlasVarGlob)
		.pipe(concat('_variables.scss'))
		.pipe(gulp.dest(path.join(GULP_SCSS_DIR, 'atlas-theme')));
});

gulp.task('build:bootstrap-vars', function() {
	return gulp.src('src/scss/bootstrap/_variables.scss')
		.pipe(gulp.dest(path.join(GULP_SCSS_DIR, 'bootstrap')));
});

gulp.task('build:bootstrap-mixins', function() {
	var bootstrapMixinsGlob = [
		'src/scss/bootstrap/mixins/_hide-text.scss',
		'src/scss/bootstrap/mixins/_opacity.scss',
		'src/scss/bootstrap/mixins/_image.scss',
		'src/scss/bootstrap/mixins/_labels.scss',
		'src/scss/bootstrap/mixins/_reset-filter.scss',
		'src/scss/bootstrap/mixins/_resize.scss',
		'src/scss/bootstrap/mixins/_responsive-visibility.scss',
		'src/scss/bootstrap/mixins/_size.scss',
		'src/scss/bootstrap/mixins/_tab-focus.scss',
		'src/scss/bootstrap/mixins/_reset-text.scss',
		'src/scss/bootstrap/mixins/_text-emphasis.scss',
		'src/scss/bootstrap/mixins/_text-overflow.scss',
		'src/scss/bootstrap/mixins/_vendor-prefixes.scss',
		'src/scss/bootstrap/mixins/_alerts.scss',
		'src/scss/bootstrap/mixins/_buttons.scss',
		'src/scss/bootstrap/mixins/_panels.scss',
		'src/scss/bootstrap/mixins/_pagination.scss',
		'src/scss/bootstrap/mixins/_list-group.scss',
		'src/scss/bootstrap/mixins/_nav-divider.scss',
		'src/scss/bootstrap/mixins/_forms.scss',
		'src/scss/bootstrap/mixins/_progress-bar.scss',
		'src/scss/bootstrap/mixins/_table-row.scss',
		'src/scss/bootstrap/mixins/_background-variant.scss',
		'src/scss/bootstrap/mixins/_border-radius.scss',
		'src/scss/bootstrap/mixins/_gradients.scss',
		'src/scss/bootstrap/mixins/_clearfix.scss',
		'src/scss/bootstrap/mixins/_center-block.scss',
		'src/scss/bootstrap/mixins/_nav-vertical-align.scss',
		'src/scss/bootstrap/mixins/_grid-framework.scss',
		'src/scss/bootstrap/mixins/_grid.scss',
	];

	return gulp.src(bootstrapMixinsGlob)
		.pipe(concat('_mixins.scss'))
		.pipe(gulp.dest(path.join(GULP_SCSS_DIR, 'bootstrap')));
});

gulp.task('build:bootstrap-components', function() {
	var bootstrapComponentsGlob = [
		'src/scss/bootstrap/_normalize.scss',
		'src/scss/bootstrap/_print.scss',
		'src/scss/bootstrap/_glyphicons.scss',
		'src/scss/bootstrap/_scaffolding.scss',
		'src/scss/bootstrap/_type.scss',
		'src/scss/bootstrap/_code.scss',
		'src/scss/bootstrap/_grid.scss',
		'src/scss/bootstrap/_tables.scss',
		'src/scss/bootstrap/_forms.scss',
		'src/scss/bootstrap/_buttons.scss',
		'src/scss/bootstrap/_component-animations.scss',
		'src/scss/bootstrap/_dropdowns.scss',
		'src/scss/bootstrap/_button-groups.scss',
		'src/scss/bootstrap/_input-groups.scss',
		'src/scss/bootstrap/_navs.scss',
		'src/scss/bootstrap/_navbar.scss',
		'src/scss/bootstrap/_breadcrumbs.scss',
		'src/scss/bootstrap/_pagination.scss',
		'src/scss/bootstrap/_pager.scss',
		'src/scss/bootstrap/_labels.scss',
		'src/scss/bootstrap/_badges.scss',
		'src/scss/bootstrap/_jumbotron.scss',
		'src/scss/bootstrap/_thumbnails.scss',
		'src/scss/bootstrap/_alerts.scss',
		'src/scss/bootstrap/_progress-bars.scss',
		'src/scss/bootstrap/_media.scss',
		'src/scss/bootstrap/_list-group.scss',
		'src/scss/bootstrap/_panels.scss',
		'src/scss/bootstrap/_responsive-embed.scss',
		'src/scss/bootstrap/_wells.scss',
		'src/scss/bootstrap/_close.scss',
		'src/scss/bootstrap/_modals.scss',
		'src/scss/bootstrap/_tooltip.scss',
		'src/scss/bootstrap/_popovers.scss',
		'src/scss/bootstrap/_carousel.scss',
		'src/scss/bootstrap/_utilities.scss',
		'src/scss/bootstrap/_responsive-utilities.scss',
	];

	return gulp.src(bootstrapComponentsGlob)
		.pipe(concat('_components.scss'))
		.pipe(gulp.dest(path.join(GULP_SCSS_DIR, 'bootstrap')));
});

gulp.task('build:lexicon-base-vars', function() {
	var lexiconBaseVarGlob = [
		'src/scss/lexicon-base/variables/_globals.scss',
		'src/scss/lexicon-base/variables/_alerts.scss',
		'src/scss/lexicon-base/variables/_breadcrumbs.scss',
		'src/scss/lexicon-base/variables/_buttons.scss',
		'src/scss/lexicon-base/variables/_cards.scss',
		'src/scss/lexicon-base/variables/_dropdowns.scss',
		'src/scss/lexicon-base/variables/_forms.scss',
		'src/scss/lexicon-base/variables/_figures.scss',
		'src/scss/lexicon-base/variables/_icons.scss',
		'src/scss/lexicon-base/variables/_labels.scss',
		'src/scss/lexicon-base/variables/_badges.scss',
		'src/scss/lexicon-base/variables/_management-bar.scss',
		'src/scss/lexicon-base/variables/_modals.scss',
		'src/scss/lexicon-base/variables/_list-group.scss',
		'src/scss/lexicon-base/variables/_loaders.scss',
		'src/scss/lexicon-base/variables/_nameplates.scss',
		'src/scss/lexicon-base/variables/_navs.scss',
		'src/scss/lexicon-base/variables/_navbar.scss',
		'src/scss/lexicon-base/variables/_pagination.scss',
		'src/scss/lexicon-base/variables/_panels.scss',
		'src/scss/lexicon-base/variables/_progress-bars.scss',
		'src/scss/lexicon-base/variables/_toolbars.scss',
		'src/scss/lexicon-base/variables/_side-navigation.scss',
		'src/scss/lexicon-base/variables/_sidebar.scss',
		'src/scss/lexicon-base/variables/_stickers.scss',
		'src/scss/lexicon-base/variables/_tables.scss',
		'src/scss/lexicon-base/variables/_timelines.scss',
		'src/scss/lexicon-base/variables/_toggle-card.scss',
		'src/scss/lexicon-base/variables/_toggle-switch.scss',
		'src/scss/lexicon-base/variables/_tooltip.scss',
		'src/scss/lexicon-base/variables/_type.scss',
		'src/scss/lexicon-base/variables/_user-icons.scss',
	];

	return gulp.src(lexiconBaseVarGlob)
		.pipe(concat('_variables.scss'))
		.pipe(gulp.dest(path.join(GULP_SCSS_DIR, 'lexicon-base')));
});

gulp.task('build:lexicon-base-mixins', function() {
	var lexiconBaseMixinsGlob = [
		'src/scss/lexicon-base/mixins/_alerts.scss',
		'src/scss/lexicon-base/mixins/_aspect-ratio.scss',
		'src/scss/lexicon-base/mixins/_buttons.scss',
		'src/scss/lexicon-base/mixins/_dropdowns.scss',
		'src/scss/lexicon-base/mixins/_figures.scss',
		'src/scss/lexicon-base/mixins/_forms.scss',
		'src/scss/lexicon-base/mixins/_list-group.scss',
		'src/scss/lexicon-base/mixins/_loaders.scss',
		'src/scss/lexicon-base/mixins/_monospace.scss',
		'src/scss/lexicon-base/mixins/_nameplates.scss',
		'src/scss/lexicon-base/mixins/_nav-nested.scss',
		'src/scss/lexicon-base/mixins/_simple-flexbox-grid.scss',
		'src/scss/lexicon-base/mixins/_timelines.scss',
		'src/scss/lexicon-base/mixins/_toggle-switch.scss',
		'src/scss/lexicon-base/mixins/_type.scss',
		'src/scss/lexicon-base/mixins/_user-icons.scss',
	];

	return gulp.src(lexiconBaseMixinsGlob)
		.pipe(concat('_mixins.scss'))
		.pipe(gulp.dest(path.join(GULP_SCSS_DIR, 'lexicon-base')));
});

gulp.task('build:lexicon-base-components', function() {
	var lexiconBaseComponentsGlob = [
		'src/scss/lexicon-base/_alerts.scss',
		'src/scss/lexicon-base/_aspect-ratio.scss',
		'src/scss/lexicon-base/_badges.scss',
		'src/scss/lexicon-base/_breadcrumbs.scss',
		'src/scss/lexicon-base/_button-groups.scss',
		'src/scss/lexicon-base/_buttons.scss',
		'src/scss/lexicon-base/_cards.scss',
		'src/scss/lexicon-base/_clamp.scss',
		'src/scss/lexicon-base/_crop-image.scss',
		'src/scss/lexicon-base/_grid.scss',
		'src/scss/lexicon-base/_icons.scss',
		'src/scss/lexicon-base/_input-groups.scss',
		'src/scss/lexicon-base/_forms.scss',
		'src/scss/lexicon-base/_form-validation.scss',
		'src/scss/lexicon-base/_figures.scss',
		'src/scss/lexicon-base/_labels.scss',
		'src/scss/lexicon-base/_list-group.scss',
		'src/scss/lexicon-base/_navs.scss',
		'src/scss/lexicon-base/_navbar.scss',
		'src/scss/lexicon-base/_nav-tabs.scss',
		'src/scss/lexicon-base/_management-bar.scss',
		'src/scss/lexicon-base/_pager.scss',
		'src/scss/lexicon-base/_pagination.scss',
		'src/scss/lexicon-base/_panels.scss',
		'src/scss/lexicon-base/_popovers.scss',
		'src/scss/lexicon-base/_progress-bars.scss',
		'src/scss/lexicon-base/_sidebar.scss',
		'src/scss/lexicon-base/_side-navigation.scss',
		'src/scss/lexicon-base/_stickers.scss',
		'src/scss/lexicon-base/_tables.scss',
		'src/scss/lexicon-base/_tooltip.scss',
		'src/scss/lexicon-base/_toggle-card.scss',
		'src/scss/lexicon-base/_toggle-switch.scss',
		'src/scss/lexicon-base/_type.scss',
		'src/scss/lexicon-base/_user-icons.scss',
		'src/scss/lexicon-base/_dropdowns.scss',
		'src/scss/lexicon-base/_modals.scss',
		'src/scss/lexicon-base/_nameplates.scss',
		'src/scss/lexicon-base/_timelines.scss',
		'src/scss/lexicon-base/_toolbars.scss',
		'src/scss/lexicon-base/_nav-tabs-scroll.scss',
		'src/scss/lexicon-base/_list-group-deprecated.scss',
		'src/scss/lexicon-base/_loaders.scss',
		'src/scss/lexicon-base/_simple-flexbox-grid.scss',
	];

	return gulp.src(lexiconBaseComponentsGlob)
		.pipe(concat('_components.scss'))
		.pipe(gulp.dest(path.join(GULP_SCSS_DIR, 'lexicon-base')));
});

gulp.task('build:atlas-all', function() {
	var scssGlob = [
		'src/scss/lexicon-base/mixins/_global-functions.scss',
		'gulp/scss/atlas-theme/_variables.scss',
		'gulp/scss/bootstrap/_variables.scss',
		'gulp/scss/bootstrap/_mixins.scss',
		'gulp/scss/bootstrap/_components.scss',
		'gulp/scss/lexicon-base/_variables.scss',
		'gulp/scss/lexicon-base/_mixins.scss',
		'gulp/scss/lexicon-base/_components.scss',
	];

	return gulp.src(scssGlob)
		.pipe(concat('_atlas-all.scss'))
		.pipe(gulp.dest(GULP_SCSS_DIR));
});

gulp.task('build:variables', ['build:atlas-vars', 'build:bootstrap-vars', 'build:lexicon-base-vars']);

gulp.task('build', ['build:variables'], function() {
	var content = '<form action="<%- page %>" class="clay-variable-editor" method="post">';

	var createFormData = function(names, values) {
		for (var j = 0; j < names.length; j++) {
			content += '<div class="bootstrap-var form-group" id="' + names[j] + '"><label class="control-label">';
			content += '$' + names[j];
			content += '<input class="form-control" name="clay[' + names[j] + ']" placeholder="' + utils.replaceDoubleToSingleQuote(values[j]) + '" value="<%- postVal[\'' + names[j] + '\'] %>" type="text"></input>';
			content += '</label></div>';
		}

		return content;
	};

	function formatSassValues(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].substring(1, arr[i].length).trim();
		}

		return arr;
	}

	var atlasVars = fs.readFileSync(ATLAS_VAR_FILE).toString().match(SASS_VAR_REGEX);
	var atlasValues = fs.readFileSync(ATLAS_VAR_FILE).toString().match(SASS_VAL_REGEX);

	var bootstrapVars = fs.readFileSync(BOOTSTRAP_VAR_FILE).toString().match(SASS_VAR_REGEX);
	var bootstrapValues = fs.readFileSync(BOOTSTRAP_VAR_FILE).toString().match(SASS_VAL_REGEX);

	var lexiconBaseVars = fs.readFileSync(LEXICON_BASE_VAR_FILE).toString().match(SASS_VAR_REGEX);
	var lexiconBaseValues = fs.readFileSync(LEXICON_BASE_VAR_FILE).toString().match(SASS_VAL_REGEX);

	var projectVars = atlasVars.concat(bootstrapVars).concat(lexiconBaseVars);
	var projectValues = atlasValues.concat(bootstrapValues).concat(lexiconBaseValues);

	var uniqueValues = [];
	var uniqueVars = projectVars.filter(function(el, index, self) {
		if (index == self.indexOf(el)) {
			uniqueValues.push(projectValues[self.indexOf(el)]);
		}

		return index == self.indexOf(el);
	});

	createFormData(formatSassValues(uniqueVars), formatSassValues(uniqueValues));

	content += '<input class="btn btn-primary clay-variable-editor-submit" name="clayVariableEditorSubmit" type="submit" value="Submit"></input><input class="btn btn-warning clay-variable-editor-download" name="clayVariableEditorSubmit" type="submit" value="Download"></input></form>';

	fs.writeFile(
		path.join(global.appRoot, 'views', 'partials', 'variables.ejs'),
		content,
		function (error) {
			if (error) {
				console.log(error);
			}
		}
	);
});