import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

// controllers
import { getAllProducts } from '../controllers';

export const productInfoFn: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
    const allProducts = await getAllProducts();

    return {
        statusCode: 200,
        body: 'Product GET: ' + JSON.stringify(allProducts),
    };
};
