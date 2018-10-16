const express = require('express');
const app = express();

const PORT = process.env.PORT || 9201;
const server = require('http').createServer(app);

app.use(express.static('public'));

app.set('view engine', 'ejs');

var sitePages = [ 'globals', 'grid', 'typography', 'icons', 'links', 'utilities', 'alert', 'label', 'badge', 'sticker', 'button', 'breadcrumb', 'card', 'dropdown', 'input', 'input-custom', 'input-group', 'input-validation', 'list-group', 'loading-animations', 'menubar', 'modal', 'nav', 'nav-pills', 'nav-tabs', 'nav-underline', 'navbar', 'navbar-application-bar', 'navbar-management-bar', 'navbar-navigation-bar', 'pagination', 'panel', 'popover', 'progress-bar', 'multi-step-nav', 'sheet', 'sidebar', 'table', 'tbar', 'tooltip', 'timeline', 'toggle-switch', ];

var sitePageCtrl = (req, res, next) => {
	var page = req.params.page;
	var pageExists = false;

	var prevPage = sitePages[sitePages.indexOf(page) - 1];
	var nextPage = sitePages[sitePages.indexOf(page) + 1];

	for (var i = 0; i < sitePages.length; i++) {
		if (sitePages[i] === page) {
			pageExists = true;

			break;
		}
	}

	if (pageExists) {
		res.render('pages/index', {
			page: page,
			prevPage: prevPage ? prevPage.replace(/-/g, ' ') : 'home',
			prevPageURL: prevPage ? '/' + prevPage : '/',
			nextPage: nextPage ? nextPage.replace(/-/g, ' ') : undefined,
			nextPageURL: '/' + nextPage,
			showVariableSidebar: true,
		});
	}
	else {
		res.status(404).send('Sorry page does not exist.');
	}
}

app.get('/favicon.ico', (req, res) => {
	res.sendStatus(204);
});

app.get('/import', (req, res, next) => {
	res.render('pages/index', { 
		page: 'import',
	});
});

app.get('/:page', sitePageCtrl);

app.get('/', (req, res, next) => {
	res.render('pages/index', { 
		page: 'home',
		nextPage: sitePages[0].replace(/-/g, ' '),
		nextPageURL: '/' + sitePages[0],
		showVariableSidebar: true,
	});
});

app.get('*', (req, res) => {
  res.status(404).send('Sorry page does not exist.');
});

server.listen(PORT, () => {
	console.log('Clay Paver on http://localhost:' + PORT);
});