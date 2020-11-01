import { APIGatewayProxyResult } from 'aws-lambda';

// handlers
import { productListFn } from '../products.handler';

// models
import { ResponseTypes } from '../../models';

// mocks
import { MOCK_DB } from './../../mocks/db';

describe('productListFn', () => {
    test('should return list of products with 200 code', async () => {
        const mockResult: APIGatewayProxyResult = {
            statusCode: ResponseTypes.SUCCESS,
            body: JSON.stringify(MOCK_DB.products),
        };
        const result: APIGatewayProxyResult = await productListFn(null, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toBe(mockResult.statusCode);
        expect(result.body).toBe(mockResult.body);
    });
});
