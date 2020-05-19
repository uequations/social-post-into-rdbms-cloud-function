import querystring from "querystring";
import dbFunction from "../../database";

export async function handler(event, context)

=>
{
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {statusCode: 405, body: "Method Not Allowed"};
    }

    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    const params = querystring.parse(event.body, {parseNumbers: true});

    const results = await dbFunction(params);

    return {
        statusCode: 200,
        body: `query executed`
    };
}
