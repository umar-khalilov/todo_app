'use strict';
const { ListTags } = require('./listTags');

const tags = {
    tags: [
        { name: ListTags.Auth },
        { name: ListTags.Users },
        { name: ListTags.Tasks },
    ],
};

module.exports = { tags };
