import {
    APIGatewayEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
} from 'aws-lambda';
import 'source-map-support/register';

// controllers
import { getAllProducts, insertProduct } from '../controllers';

// models
import { ResponseTypes, ProductModel } from '../models';

// middleware
import { corsResponseMiddleware } from '../middleware';

export const productListFn: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    switch (event.httpMethod) {
        case 'POST': {
            const product: ProductModel = JSON.parse(event.body);

            try {
                const data = await insertProduct(product);
        
                return corsResponseMiddleware({
                    statusCode: ResponseTypes.SUCCESS,
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.log('ERROR', error);
            }
        }
        // make GET as default request
        default: {
            try {
                const data = await getAllProducts();
        
                return corsResponseMiddleware({
                    statusCode: ResponseTypes.SUCCESS,
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.log('ERROR', error);
            }
        }
    }

    
};