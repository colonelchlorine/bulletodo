var connect = require('connect'),
	app = connect().use(connect.static(__dirname))
				   .use(connect.logger('dev'));

app.listen(8080);