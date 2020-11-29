import {
    APIGatewayTokenAuthorizerEvent,
    APIGatewayAuthorizerResult,
} from 'aws-lambda';
import 'source-map-support/register';

export const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent, _context, cb) => {
    const { authorizationToken } = event;
    const buff = Buffer.from(authorizationToken, 'base64');
    const decodedToken = buff.toString('utf-8');

    console.log('KEK', authorizationToken, decodedToken);

    const splitToken = decodedToken.split(':');
    const userName = splitToken[0];
    const userPass = splitToken[1];
    const isAuthorized = process.env[userName] === userPass;

    if (isAuthorized) {
        console .log('DONE');

        cb();
    } else {
        console.log('FORBIDDEN');

        cb();
    }
};

const preparePolicy = (principalId: string): APIGatewayAuthorizerResult => {
    return {
        principalId,
        policyDocument: '' as any,
    };
};
