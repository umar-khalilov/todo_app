'use strict';

const tokensComponent = {
    access: {
        type: 'string',
        example:
            'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidG9tQGhhbmtzLmNvbSIsInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJpYXQiOjE2NzkyMzUwNTUsImV4cCI6MTY3OTQwNzg1NX0.13fylSc60k1LHfsWH3ZfgfLUEBOpVobAVePi_JwOmc2OR6IusvGvKxTi_NmgPPtu',
        description: 'The access token data',
    },
    refresh: {
        type: 'string',
        example:
            'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidG9tQGhhbmtzLmNvbSIsInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJpYXQiOjE2NzkyMzUwNTUsImV4cCI6MTY3OTQwNzg1NX0.13fylSc60k1LHfsWH3ZfgfLUEBOpVobAVePi_JwOmc2OR6IusvGvKxTi_NmgPPtu',
        description: 'The refresh token data',
    },
};

module.exports = { tokensComponent };
