import { SQSEvent } from 'aws-lambda';
import 'source-map-support/register';

// models
import { ProductModel } from '../models';

// controllers
import { insertProducts } from '../controllers/products.controller';

// services
import { pushMessage } from '../services';

const prepareString = (strings: string[]): string => {
    return strings.join(', ');
};

export const catalogBatchProcessFn = async (event: SQSEvent): Promise<any> => {
    const prepareProductRecords: { [key: string]: string }[] = event.Records.map(({ body }) => JSON.parse(body));
    const prepareProducts = prepareProductRecords.map((productRecord) => {
        const prepareProduct = Object.entries(productRecord);
        const keys = prepareProduct[0][0].split(';');
        const values = prepareProduct[0][1].split(';');

        return {
            [keys[0]]: values[0],
            [keys[1]]: values[1],
            [keys[2]]: +values[2],
            [keys[3]]: values[3],
            [keys[4]]: +values[4],
        } as unknown as ProductModel;
    });
    const productIds = await insertProducts(prepareProducts);

    pushMessage('Product created!', `${prepareString(productIds)} has been created!`);
};
