import querystring from "querystring";
import dbFunction from "../../database";

export async function socialPost(event, context) {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {statusCode: 405, body: "Method Not Allowed"};
    }
    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    const params = querystring.parse(event.body);

    return await dbFunction(params)
        .then((query) => {
            console.log("success");

            if (typeof query !== 'undefined') {
                console.log('query executed')
            }

            return {
                statusCode: 200,
                body: `query executed`
            };
        })
        .catch(reason => {
            console.error("error: ", JSON.stringify(reason));
            return {
                statusCode: 403,
                body: JSON.stringify(reason)
            }
        });
}