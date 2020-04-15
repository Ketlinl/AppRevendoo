
exports.up = function(knex) {
    return  knex.schema.createTable('clients', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('address').notNullable();
        table.decimal('number').notNullable();


        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');

    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('clients');
};
