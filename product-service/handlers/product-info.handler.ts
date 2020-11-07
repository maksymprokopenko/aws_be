import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

// controllers
import { getProductById } from '../controllers';

// models
import { ResponseTypes } from '../models';

// middleware
import { corsResponseMiddleware } from '../middleware';

export const productInfoFn: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    // if no ID GET parameter provided return an error
    if (!event || !event.queryStringParameters || !event.queryStringParameters.id) {
        return corsResponseMiddleware({
            statusCode: ResponseTypes.BAD_REQUEST,
            body: 'ID parameter is required!',
        });
    }

    const { id } = event.queryStringParameters;
    const product = await getProductById(id);

    // if no product found with such ID
    if (!product) {
        return corsResponseMiddleware({
            statusCode: ResponseTypes.NOT_FOUND,
            body: 'No product found!',
        });
    }

    return corsResponseMiddleware({
        statusCode: ResponseTypes.SUCCESS,
        body: JSON.stringify(product),
    });
};
