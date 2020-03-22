
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('first_name');
        table.string('last_name');
        table.string('username');
        table.string('email');
        table.string('password');
        table.string('avatar_url');
        table.text('bio').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('role').references('roles.role_id');
        table.string('status').references('user_status.user_status_id');
        table.unique('email');
        table.unique('username');
    }).createTable('roles', function (table) {
        table.string('role_id').primary();
        table.string('name');
    }).createTable('user_status', function (table) {
        table.string('user_status_id').primary();
        table.string('name');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("users")
    .dropTable("roles")
    .dropTable("user_status")
};
