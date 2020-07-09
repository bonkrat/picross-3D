// Author: Jarrett Cruger -> QR Hook

var config = require('./config.json');
var chair = require('../')(config);

chair.design('_design/temp', require('./view'), function (err, body, header) {
    if(!err) {
        console.log(body);
        console.log(header);
        chair.view('temp', 'findAll', function (err, body) {
            if(!err) {
                console.log(body);
            }
        });
    }
});
