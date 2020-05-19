import querystring from "querystring";
import dbFunction from "../../database";

export async function handler(event, context) {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {statusCode: 405, body: "Method Not Allowed"};
    }
    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    const params = querystring.parse(event.body, {parseNumbers: true});

    return await dbFunction(params)
        .then((response) => {
            console.log("success");
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
