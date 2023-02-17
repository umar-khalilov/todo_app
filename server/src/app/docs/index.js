'use strict';
const { basicInfo } = require('./basicInfo');
const { servers } = require('./servers');
const { tags } = require('./tags');
const { components } = require('./components');
const { paths } = require('./paths');

const docs = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...paths,
};

module.exports = { docs };
