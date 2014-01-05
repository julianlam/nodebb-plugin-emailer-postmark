var	fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	Postmark = require("postmark")(Meta.config['postmark:apiKey']);
	Emailer = {};

Emailer.send = function(data) {
	// Update the API key, if necessary
	// if (PostageApp.getApiKey && PostageApp.setApiKey && PostageApp.getApiKey() !== Meta.config['postageapp:apiKey']) {
	// 	PostageApp.setApiKey(Meta.config['postageapp:apiKey']);
	// }

    Postmark.send({
        "From": data.from,
        "To": data.to,
        "Subject": data.subject,
        "TextBody": data.plaintext,
        "HtmlBody": data.html
    }, function (err) {
		if (!err) {
			winston.info('[emailer.postmark] Sent `' + data.template + '` email to uid ' + data.uid);
		} else {
			winston.warn('[emailer.postmark] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
			winston.error('[emailer.postmark] ' + err.message);
		}
	});
}

Emailer.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/plugins/emailer-postmark',
			"icon": 'fa-envelope-o',
			"name": 'Emailer (Postmark)'
		});

		return custom_header;
	},
	route: function(custom_routes, callback) {
		fs.readFile(path.join(__dirname, 'admin.tpl'), function(err, tpl) {
			custom_routes.routes.push({
				route: '/plugins/emailer-postmark',
				method: "get",
				options: function(req, res, callback) {
					callback({
						req: req,
						res: res,
						route: '/plugins/emailer-postmark',
						name: 'Emailer (Postmark)',
						content: tpl
					});
				}
			});

			callback(null, custom_routes);
		});
	}
};

module.exports = Emailer;