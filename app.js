const clayLatestVersion = '2.3.3';
const clayAvailableVersions = [];

const express = require('express');
const app = express();

const ejs = require('ejs');

const PORT = process.env.PORT || 9201;
const server = require('http').createServer(app);

app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const sitePages = [ 'globals', 'grid', 'typography', 'icons', 'links', 'utilities', 'alert', 'label', 'badge', 'sticker', 'button', 'breadcrumb', 'card', 'dropdown', 'input', 'input-custom', 'input-group', 'input-validation', 'list-group', 'loading-animations', 'menubar', 'modal', 'nav', 'nav-pills', 'nav-tabs', 'nav-underline', 'navbar', 'navbar-application-bar', 'navbar-management-bar', 'navbar-navigation-bar', 'pagination', 'panel', 'popover', 'progress-bar', 'multi-step-nav', 'sheet', 'sidebar', 'table', 'tbar', 'tooltip', 'timeline', 'toggle-switch', ];

const sitePageCtrl = (req, res, next) => {
	const page = req.params.page;
	const version = req.params.version;

	let pageExists = false;

	const prevPage = sitePages[sitePages.indexOf(page) - 1];
	const nextPage = sitePages[sitePages.indexOf(page) + 1];

	res.locals = {
		printInputs: (arr) => {
			var svgIconsPath = '../../../images/' + version + '/icons/icons.svg';

			return ejs.renderFile(__dirname + '/views/partials/functions/printInputs.ejs', { arr: arr, svgIconsPath: svgIconsPath }, (err, str) => {
				if (!err) {
					return str;
				}
				else {
					console.log(err.toString());
				}
			});
		}
	};

	for (let i = 0; i < sitePages.length; i++) {
		if (sitePages[i] === page) {
			pageExists = true;

			break;
		}
	}

	if (!pageExists) {
		render404Ctrl(req, res, next);

		return;
	}

	res.render('pages/' + version + '/index', {
		currentVersion: version,
		page: page,
		prevPage: prevPage ? prevPage.replace(/-/g, ' ') : 'home',
		prevPageURL: prevPage ? '/' + version + '/' + prevPage : '/' + version + '/',
		nextPage: nextPage ? nextPage.replace(/-/g, ' ') : undefined,
		nextPageURL: '/' + version + '/' + nextPage,
		showVariableSidebar: true,
		sitePages: sitePages,
	});
}

const render404Ctrl = (req, res, next) => {
	res.status(404).render('pages/404', {
		clayLatestVersion: clayLatestVersion,
		clayAvailableVersions: clayAvailableVersions,
	});
}

app.get('/:version/import', (req, res, next) => {
	const version = req.params.version;

	res.render('pages/' + version + '/index', {
		currentVersion: version,
		page: 'import',
		sitePages: sitePages,
	});
});

app.get('/:version/:page', sitePageCtrl);

app.get('/:version', (req, res, next) => {
	const version = req.params.version;

	res.locals = {
		printInputs: (arr) => {
			var svgIconsPath = '../../../images/' + version + '/icons/icons.svg';

			return ejs.renderFile(__dirname + '/views/partials/functions/printInputs.ejs', { arr: arr, svgIconsPath: svgIconsPath }, (err, str) => {
				if (!err) {
					return str;
				}
				else {
					console.log(err.toString());
				}
			});
		}
	};

	if (clayAvailableVersions.indexOf(version) === -1 && version !== clayLatestVersion) {
		render404Ctrl(req, res, next);

		return;
	}

	res.render('pages/' + version + '/index', { 
		currentVersion: version,
		page: 'home',
		nextPage: sitePages[0].replace(/-/g, ' '),
		nextPageURL: '/' + version + '/' + sitePages[0],
		showVariableSidebar: true,
		sitePages: sitePages,
	});
});

app.get('/', (req, res, next) => {
	res.render('pages/index', {
		clayLatestVersion: clayLatestVersion,
		clayAvailableVersions: clayAvailableVersions,
	});
});

app.get('*', render404Ctrl);

server.listen(PORT, () => {
	console.log('Clay Paver on http://localhost:' + PORT);
});