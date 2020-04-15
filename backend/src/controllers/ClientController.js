
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('clients').count();

        const clients = await connection('clients')
            .limit(6)
            .offset((page - 1) * 6)
            .select('*');
        response.header('X-Total-Count', count['count(*)']);

        return response.json(clients);
    },
    async create(request, response) {
        const { name, email,whatsapp,city,uf ,address, number} = request.body;
        const user_id = request.headers.authorization;
        const [id] = await connection('clients').insert({
            name,
            email,
            whatsapp,
            city,
            uf,
            address,
            number,
            user_id,
        });
        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const clients = await connection('clients')
            .where('id', id)
            .select('user_id')
            .first();

        if (clients.user_id !== user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('clients').where('id', id).delete();

        return response.status(204).send();
    }
};