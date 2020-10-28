import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

// controllers
import { getAllProducts } from '../controllers';

export const productListFn: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
    const allProducts = await getAllProducts();

    return {
        statusCode: 200,
        body: `All products GET: ${JSON.stringify(allProducts)}`,
    };
};