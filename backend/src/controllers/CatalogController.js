
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('catalog').count();

        const catalog = await connection('catalog')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');
        response.header('X-Total-Count', count['count(*)']);

        return response.json(catalog);
    },
    async create(request, response) {
        const { title, description } = request.body;
        const user_id = request.headers.authorization;
        const [id] = await connection('catalog').insert({
            title,
            description,
            user_id,
        });
        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const catalog = await connection('catalog')
            .where('id', id)
            .select('user_id')
            .first();

        if (catalog.user_id !== user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('catalog').where('id', id).delete();

        return response.status(204).send();
    }
};