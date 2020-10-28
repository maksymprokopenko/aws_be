import { APIGatewayProxyResult } from 'aws-lambda';

// handlers
import { productInfoFn } from '../product-info.handler';

// mocks
import { MOCK_DB } from './../../mocks/db';

describe('productInfoFn', () => {
    test('should return list of products with 200 code', async () => {
        const mockResult: APIGatewayProxyResult = {
            statusCode: 200,
            body: `Product GET: ${JSON.stringify(MOCK_DB.products)}`,
        };
        const result: APIGatewayProxyResult = await productInfoFn(null, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toBe(mockResult.statusCode);
        expect(result.body).toBe(mockResult.body);
    });
});
