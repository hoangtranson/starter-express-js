const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'dev.sqlite3'
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 1 }
});

module.exports = knex;