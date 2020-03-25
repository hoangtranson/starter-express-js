
exports.up = function(knex) {
    return knex.schema.createTable('tokens', function (table) {
        table.increments();
        table.string('user_id').references('users.id');
        table.string('token');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("tokens");
};
