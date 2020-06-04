import dbFunction from "../../database";

export async function handler(event, context, callback) {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {statusCode: 405, body: "Method Not Allowed"};
    }
    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    const params = JSON.parse(event.body);

    return await dbFunction(params)
        .then((query) => {
            console.log("success");

            if (typeof query !== 'undefined') {
                console.log('query executed')
            }

            return callback(null, {
                statusCode: 200,
                body: `query executed`
            });
        })
        .catch(reason => {
            console.error("error: ", JSON.stringify(reason));
            return callback(null, {
                statusCode: 403,
                body: JSON.stringify(reason)
            })
        });
}
