
import { v4 as uuidv4 } from 'uuid';
import client from '../../../config/sqlDB.js';

export async function createNewChatInDatabase(super_user_id, admin_id) {
    if (!super_user_id || !admin_id) {
        throw new Error('Both super_user_id and admin_id are required.');
    }
    const ucid = uuidv4();
    const query = `
        INSERT INTO Chat (ucid, party1_superuser_id, party2_admin_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [ucid, super_user_id, admin_id];
    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        // Unique constraint violation (superuser-admin pair)
        if (error.code === '23505') {
            throw new Error('A chat between this super user and admin already exists.');
        }
        // Foreign key violation
        if (error.code === '23503') {
            throw new Error('Invalid super_user_id or admin_id.');
        }
        // Other database errors
        throw new Error('Failed to create chat: ' + error.message);
    }
}