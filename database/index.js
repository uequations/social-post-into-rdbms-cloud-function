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
        const connection = db.createConnection(dbConfig);
        console.log('connection pool started');
        await run(connection, sqlParams);
    } catch (err) {
        console.error('error: ' + err.message);
    }
}

/**
 *
 * @param {Connection} [connection]
 * @param {object} [values]
 * @returns {Promise<PermissionStatus>}
 */
async function run(connection, values) {
    console.log('sql params: ' + values['test_varchar_column']);
    const tableName = process.env.MYSQL_TABLE_NAME;
    const sql = 'INSERT INTO ' + tableName + ' SET ?';

    try {
        connection.query(sql, values, callback);
    } catch (err) {
        console.error('error: ' + err);
        throw err;
    } finally {
        connection.end();
    }
}

/**
 *
 * @param [error]
 * @param [results]
 * @param [fields]
 * @returns {Promise<unknown>}
 */
async function callback(error, results, fields) {
    if (error) {
        console.error("error: ", error);
        throw error
    }
    console.log('query executed');
    const affectedRows = JSON.parse(JSON.stringify(results))['affectedRows'];
    console.log('affectedRows: ', affectedRows);
}
