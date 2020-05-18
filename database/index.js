import db from 'mysql';
import dbConfig from './dbconfig';

async function init() {
    try {
        const pool = db.createPool(dbConfig);
        console.log('Connection pool started');
        await run(pool);
    } catch (err) {
        console.error('init() error: ' + err.message);
    } finally {
        await closePoolAndExit();
    }
}

/**
 *
 * @param {Pool} [pool]
 * @returns {Promise<void>}
 * @public
 */
async function run(pool) {

    const values = {};
    const tableName = 'uequations.social_post';
    const sql = 'INSERT INTO ' + tableName + ' SET ?';

    try {
        await pool.query(sql, values, callback);
    } catch (err) {
        console.error(err);
    }
}

async function callback(error, results, fields) {
    if (error) throw error;
}

init();
