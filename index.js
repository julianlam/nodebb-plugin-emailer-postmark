(function() {
	'use strict';
	/* globals require, module */

	var	winston = module.parent.require('winston'),
		Meta = module.parent.require('./meta'),

		Postmark = require('postmark')(Meta.config['postmark:apiKey']),
		Emailer = {};

	Emailer.init = function(data, callback) {
		function render(req, res) {
			res.render('admin/plugins/emailer-postmark', {});
		}

		data.router.get('/admin/plugins/emailer-postmark', data.middleware.admin.buildHeader, render);
		data.router.get('/api/admin/plugins/emailer-postmark', render);

		callback();
	};

	Emailer.send = function(data, callback) {
		Postmark.send({
			'From': data.from,
			'To': data.to,
			'Subject': data.subject,
			'TextBody': data.plaintext,
			'HtmlBody': data.html
		}, function (err) {
			if (!err) {
				winston.info('[emailer.postmark] Sent `' + data.template + '` email to uid ' + data.uid);
			} else {
				winston.warn('[emailer.postmark] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
				winston.error('[emailer.postmark] ' + err.message);
			}

			callback();
		});
	};

	Emailer.admin = {
		menu: function(custom_header, callback) {
			custom_header.plugins.push({
				'route': '/plugins/emailer-postmark',
				'icon': 'fa-envelope-o',
				'name': 'Emailer (Postmark)'
			});

			callback(null, custom_header);
		}
	};

	module.exports = Emailer;
})();