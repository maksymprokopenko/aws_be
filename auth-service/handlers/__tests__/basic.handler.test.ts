import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { basicAuthorizer } from '../basic.handler';

beforeEach(() => {
    process.env.test = 'TEST';
});

test('basicAuthorizer', () => {
    const prepareToken = Buffer.from('test:TEST').toString('base64');
    const prepareEvent = {
        authorizationToken: prepareToken,
    } as APIGatewayTokenAuthorizerEvent;

    basicAuthorizer(prepareEvent, null, () => {});
});
