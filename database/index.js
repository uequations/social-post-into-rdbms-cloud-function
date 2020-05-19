import db, {ServerlessMysql} from 'serverless-mysql';
import {dbConfig} from "./dbconfig";

const escape = require('sql-template-strings');

/**
 *
 * @param {ParsedUrlQuery} [params]
 * @returns {Promise<Query>}
 */
export default async function apply(params) {

    console.log('params: ', JSON.parse(JSON.stringify(params)));

    const sqlParams = {
        test_varchar_column: params['strange']
    };

    try {
        const connection = db(dbConfig);
        console.log('connection');
        return run(connection, sqlParams);
    } catch (err) {
        console.error('error: ' + err.message);
    }
}

/**
 *
 * @param {ServerlessMysql} [connection]
 * @param {object} [values]
 */
async function run(connection, values) {
    console.log('sql params: ' + values['test_varchar_column']);
    const tableName = process.env.MYSQL_TABLE_NAME;
    const sql = escape`INSERT INTO TestTable (test_varchar_column) VALUES (${values['test_varchar_column']})`;

    try {
        const results = connection.query(sql);
        await connection.end();
        return results;
    } catch (err) {
        console.error('error: ' + err);
        return {err};
    }
}
