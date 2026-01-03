const { pool } = require('../config/database');

const userModel = {
  // Get all users
  findAll: async (limit = 100, offset = 0) => {
    const query = `
      SELECT id, name, email, created_at 
      FROM users 
      ORDER BY id ASC 
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  },

  // Get user by ID
  findById: async (id) => {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Get user by email
  findByEmail: async (email) => {
    const query = 'SELECT id, name, email, created_at FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  },

  // Create user
  create: async (name, email) => {
    const query = `
      INSERT INTO users (name, email) 
      VALUES ($1, $2) 
      RETURNING id, name, email, created_at
    `;
    const result = await pool.query(query, [name, email]);
    return result.rows[0];
  },

  // Update user
  update: async (id, name, email) => {
    const query = `
      UPDATE users 
      SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3 
      RETURNING id, name, email, created_at, updated_at
    `;
    const result = await pool.query(query, [name, email, id]);
    return result.rows[0] || null;
  },

  // Delete user
  delete: async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id, name, email';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Count users
  count: async () => {
    const query = 'SELECT COUNT(*) as total FROM users';
    const result = await pool.query(query);
    return parseInt(result.rows[0].total);
  },
};

module.exports = userModel;

