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

// validators
import { ProductSchema } from '../models';

export const productListFn: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    switch (event.httpMethod) {
        case 'POST': {
            const product: ProductModel = JSON.parse(event.body);
            const isProductValid = await ProductSchema.isValid(product);

            if (!isProductValid) {
                return corsResponseMiddleware({
                    statusCode: ResponseTypes.BAD_REQUEST,
                    body: 'Course data is not valid.',
                });
            }

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