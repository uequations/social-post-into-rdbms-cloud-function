import db from 'mysql';
import dbConfig from './dbconfig';

/**
 *
 * @param {object} [params]
 * @returns {Promise<PermissionStatus>}
 */
export default async function apply(params) {

    console.log('params: ', JSON.parse(JSON.stringify(params)));

    const sqlParams = {
        test_varchar_column: params['strange']
    };

    try {
        const pool = db.createPool(dbConfig);
        console.log('connection pool started');
        await run(pool, sqlParams);
    } catch (err) {
        console.error('error: ' + err.message);
    }
}

/**
 *
 * @param {Pool} [pool]
 * @param {object} [values]
 * @returns {Promise<PermissionStatus>}
 */
async function run(pool, values) {
    console.log('sql params: ' + values['test_varchar_column']);
    const tableName = process.env.MYSQL_TABLE_NAME;
    console.log('updating the table: ' + tableName);
    const sql = 'INSERT INTO ' + tableName + ' SET ?';

    try {
        pool.query(sql, values, callback);
    } catch (err) {
        console.error('error: ' + err);
        throw err;
    }
}

/**
 *
 * @param error
 * @param results
 * @param fields
 * @returns {Promise<unknown>}
 */
async function callback(error, results, fields) {
    if (error) {
        console.error("error: ", error);
        throw error
    }
    console.log('query executed without error');
    const affectedRows = JSON.parse(JSON.stringify(results))['affectedRows'];
    console.log('affectedRows: ', affectedRows);
}
