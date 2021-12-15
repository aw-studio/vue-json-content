'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/vue-json-content.cjs.prod.js');
} else {
    module.exports = require('./dist/vue-json-content.cjs.js');
}
