import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

// controllers
import { getAllProducts } from '../controllers';

// models
import { ResponseTypes } from '../models';

// middleware
import { corsResponseMiddleware } from '../middleware';

export const productListFn: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
    const allProducts = await getAllProducts();

    return corsResponseMiddleware({
        statusCode: ResponseTypes.SUCCESS,
        body: JSON.stringify(allProducts),
    });
};