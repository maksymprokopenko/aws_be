import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

// controllers
import { importController } from '../controllers';

export const importProducts: APIGatewayProxyHandler = (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    return importController(event);
}
