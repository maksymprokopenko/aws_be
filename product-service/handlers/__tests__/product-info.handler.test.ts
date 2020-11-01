import { APIGatewayProxyResult } from 'aws-lambda';

// handlers
import { productInfoFn } from '../product-info.handler';

// models
import { ResponseTypes } from '../../models';

// mocks
import { MOCK_DB } from './../../mocks/db';

describe('productInfoFn', () => {
    test('should return product if ID provided in GET params', async () => {
        const mockEvent = {
            queryStringParameters: {
                id: MOCK_DB.products[0].id,
            },
        } as any;
        const mockResult: APIGatewayProxyResult = {
            statusCode: ResponseTypes.SUCCESS,
            body: JSON.stringify(MOCK_DB.products[0]),
        };
        const result: APIGatewayProxyResult = await productInfoFn(mockEvent, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toBe(mockResult.statusCode);
        expect(result.body).toBe(mockResult.body);
    });

    test('should return error response if no ID param provided', async () => {
        const mockEvent = {
            queryStringParameters: {
                test: MOCK_DB.products[0].id,
            },
        } as any;
        const result: APIGatewayProxyResult = await productInfoFn(mockEvent, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toBe(ResponseTypes.BAD_REQUEST);
        expect(result.body).toBe('ID parameter is required!');
    });

    test('should return error response if no product found', async () => {
        const mockEvent = {
            queryStringParameters: {
                id: '123',
            },
        } as any;
        const result: APIGatewayProxyResult = await productInfoFn(mockEvent, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toBe(ResponseTypes.NOT_FOUND);
        expect(result.body).toBe('No product found!');
    });
});
