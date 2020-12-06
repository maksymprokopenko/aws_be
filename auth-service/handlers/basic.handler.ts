import {
    APIGatewayTokenAuthorizerEvent,
    APIGatewayAuthorizerResult,
} from 'aws-lambda';
import 'source-map-support/register';

export const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent, _context, cb) => {
    const { authorizationToken } = event;

    if (!authorizationToken) {
        cb('Unauthorized');

        return;
    }

    const token = authorizationToken.split(' ')[1];
    const buff = Buffer.from(token, 'base64');
    const decodedToken = buff.toString('utf-8');
    const splitToken = decodedToken.split('=');
    const userName = splitToken[0];
    const userPass = splitToken[1];
    const isAuthorized = userName === 'maksymprokopenko' && !!userPass && process.env.maksymprokopenko === userPass;


    if (isAuthorized) {
        const policy = preparePolicy(token, event.methodArn);

        cb(null, policy);
    } else {
        cb('Unauthorized');
    }
};

const preparePolicy = (principalId: string, resource: string, effect: string = 'Allow'): APIGatewayAuthorizerResult => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
    };
};
