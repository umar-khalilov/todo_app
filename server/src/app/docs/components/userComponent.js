'use strict';

const userComponent = {
    id: {
        type: 'integer',
        format: 'int64',
        readOnly: true,
        example: 1,
        description: 'Primary key',
    },
    name: {
        type: 'string',
        example: 'Arnold',
        description: 'The name of user',
    },
    surname: {
        type: 'string',
        example: 'Schwarzenegger',
        description: 'The surname of user',
    },
    email: {
        type: 'string',
        format: 'email',
        example: 'arnold@schwarzenegger.com',
        description: 'Contact email of the user',
    },
    avatar: {
        type: 'string',
        format: 'binary',
        example:
            'https://upload.wikimedia.org/wikipedia/commons/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg',
        description: 'The path to the avatar image',
    },
    birthday: {
        type: 'string',
        format: 'date',
        pattern: /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        example: '1947-07-30',
        description: 'The date of birth',
    },
    isMale: {
        type: 'boolean',
        example: true,
        description: 'Is male or not',
    },
    password: {
        type: 'string',
        format: 'password',
        pattern:
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
        example: 'test1234UeO9P)@',
        writeOnly: true,
    },
    createdAt: {
        type: 'string',
        format: 'date-time',
        readOnly: true,
        description: 'The created date of instance',
        example: new Date().toISOString(),
    },
    updatedAt: {
        type: 'string',
        format: 'date-time',
        readOnly: true,
        description: 'The updated date of instance',
        example: new Date().toISOString(),
    },
};

module.exports = { userComponent };
