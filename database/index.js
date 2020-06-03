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
    console.log('object type: ', typeof params)

    const sqlParams = {
        post_title: params['post_title'],
        primary_reference_url: params['primary_reference_url'],
        hash_tags: params['hash_tags'],
        associated_twitter_influencer: params['associated_twitter_influencer'],
        social_post_shortened: params['social_post_shortened'],
        social_post: params['social_post'],
        blog_text: params['blog_text'],
        backlinks: params['backlinks'],
        datetime_accessed: params['datetime_accessed']
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
    console.log('sql params: ' + JSON.stringify(values));

    const sql = escape`INSERT INTO SocialPost (post_title,
primary_reference_url,
hash_tags,
associated_twitter_influencer,
social_post_shortened,
social_post,
blog_text,
backlinks) VALUES (${values['post_title']},
${values['primary_reference_url']},
${values['hash_tags']},
${values['associated_twitter_influencer']},
${values['social_post_shortened']},
${values['social_post']},
${values['blog_text']},
${values['backlinks']})`;

    try {
        const results = connection.query(sql);
        await connection.end();
        return results;
    } catch (err) {
        console.error('error: ' + err);
        return {err};
    }
}
