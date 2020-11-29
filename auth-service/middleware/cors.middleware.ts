import { APIGatewayProxyResult } from 'aws-lambda';

export const corsResponseMiddleware = (originalResponse: APIGatewayProxyResult): APIGatewayProxyResult => {
    return {
        ...originalResponse,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    };
};
