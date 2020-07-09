// Author: Jarrett Cruger -> QR Hook

// Required Modules
var nano = require('nano');
var extend = require('extend');

// Main API Endpoint to initialize a chair instance
module.exports = Chair;

function Chair (options) {
	if(!(this instanceof Chair)) return new Chair(options);
	// Create nano instance to attach to chair to initialize connection
	this.nano = nano(options);
	// Return instance of database for the direct interaction
	return extend(this, this.nano);
}

Chair.prototype.design = Design;
// As I realized, this implementation was quite trivial
function Design (id, obj, callback) {
	var self = this;
	if (/^_design\/(\w|%|\-)+$/.test(id)) {
		obj.language = "javascript";
		this.nano.insert(obj, id, function (err, body, header) {
			if(err && err['status-code'] === 409) {
				self.head(id, function (e, _, header) {
					if(!e && header['etag']) {
						obj._rev = header['etag'].slice(1, -1);
						self.insert(obj, id, callback);
					}
				});
			} else {
				if(typeof callback === 'function') {
					callback(err, body, header);
				}
			}
		});
	} else {
		console.log('Invalid ID');
	}
}

