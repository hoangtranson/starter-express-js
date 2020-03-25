const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  try {

    await knex('users').del();
    await knex('roles').del();
    await knex('user_status').del();

    await knex("users").insert({
      first_name: "Hoang",
      last_name: "Tran",
      username: "admin",
      email: "admin@yopmail.com",
      password: bcrypt.hashSync('admin', 8),
      avatar_url: "",
      bio: "I am ...",
      role: "admin",
      status: "active"
    });

    await knex("roles").insert([
      {
        role_id: "admin",
        name: "Administrator"
      },
      {
        role_id: "dev",
        name: "Developer"
      },
      {
        role_id: "qc",
        name: "Quality Controller"
      },
      {
        role_id: "ba",
        name: "Business Analytic"
      },
    ]);

    await knex("user_status").insert([
      {
        user_status_id: "active",
        name: "Active"
      },
      {
        user_status_id: "disabled",
        name: "Disabled"
      }
    ]);
  } catch (err) {
    console.error(err);
  }
};
