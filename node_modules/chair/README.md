Chair
====
Relax, here is a nice comfy chair for your [CouchDB][couchdb].

Install
-------
With [npm][npm] do

```
npm install chair
```

About:
------
CouchDB module that wraps the clean api of [nano][nano] and steals a feature from
[cradle][cradle]. I found myself including both cradle and nano in a project
just to use the easy design document saving of cradle. I decided in order to
keep everything minimal, to implement a way to save views, allowing my views to
be more reusable and removing the dependency of cradle.

Use Cases:
----------
```js
// Same API as nano
var chair = require('chair')('http://localhost:5984/test');
```
Example design doc (written as a module)
```js
module.exports = {
    views: {
        findAll: {
            map: function (doc) {
                emit(doc);
            }
        }
    }
};
```
Design doc can be written as regular javascript and easily added to a database
```js
var designDoc = require('./designDoc');

chair.design('_design/test', designDoc, function (err, body, header) {
    if(!err) {
        // Should show successful insert
        // The logic is set to auto replace on conflict
    }
});
```

TODO:
-----
* View saving functions
* Tests
* Docs (Check out [nano][nano] docs for most of the query functions)

License
======
MIT

Thanks
======
To both @dscape and @cloudhead for both of their modules.

[nano]: https://github.com/dscape/nano
[cradle]: https://github.com/cloudhead/cradle
[couchdb]: http://couchdb.apache.org/
[npm]: http://npmjs.org
