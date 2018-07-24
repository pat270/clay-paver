var express = require('express');
var app = express();

var PORT = process.env.PORT || 9000;
var server = require('http').createServer(app);

app.use(express.static('public'));

app.set('view engine', 'ejs');

function sitePageCtrl(req, res, next) {
	var page = req.params.page;
	var pageExists = false;
	var sitePages = ['alert', 'badge', 'blockquote', 'breadcrumb', 'button', 'card', 'dropdown', 'figure', 'input-disabled', 'input-readonly', 'input-sizes', 'input-validation', 'input', 'label', 'list-group', 'management-bar', 'modal', 'multi-step-progress-bar', 'nameplate', 'nav-pills', 'nav-tabs', 'nav', 'navbar', 'pager', 'pagination', 'panel', 'popover', 'progress-bar', 'sidebar', 'sticker', 'table', 'timeline', 'toggle-card', 'toggle-switch', 'tooltip', 'typography', 'user-icon', ];

	for (var i = 0; i < sitePages.length; i++) {
		if (sitePages[i] === page) {
			pageExists = true;

			break;
		}
	}

	if (pageExists) {
		res.render('pages/index', {
			page: page,
			showVariableSidebar: true
		});
	}
	else {
		res.status(404).send('Sorry page does not exist.');
	}
}

app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204);
});

app.get('/import', function(req, res, next) {
	res.render('pages/index', { 
		page: 'import'
	});
});

app.get('/:page', sitePageCtrl);

app.get('/', function(req, res, next) {
	res.render('pages/index', { 
		page: 'home',
		showVariableSidebar: true
	});
});

app.get('*', function(req, res){
  res.status(404).send('Sorry page does not exist.');
});

server.listen(PORT, function () {
	console.log('Clay Paver on http://localhost:' + PORT);
});