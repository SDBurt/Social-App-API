import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
    success,
    failure
} from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: process.env.user_table,
        Key: {
            handle: event.pathParameters.handle
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            return success({
                status: true,
                handle: result.Item.handle,
                email: result.Item.email,
                userId: result.Item.userId
            });
        } else {
            return success({
                status: false,
                message: "user not found"
            });
        }
    } catch (e) {
        return failure({
            status: false,
            error: e
        });
    }
}