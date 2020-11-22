import { SQSEvent } from 'aws-lambda';
import 'source-map-support/register';

// models
import { ProductModel } from '../models';

// controllers
import { insertProduct } from '../controllers/products.controller';

// validators
import { ProductSchema } from '../models';

// services
import { pushMessage } from '../services';

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

    for (const product of prepareProducts) {
        const isValid = await ProductSchema.isValid(product);

        if (isValid) {
            try {
                const productId = await insertProduct(product);

                pushMessage('Product created!', `${product.title} has been created with id: ${productId}!`);
            } catch (error) {
                console.error(error);
                pushMessage('Error!', `Error while ${product.title} product creation!`);
            }
        }
    }
};
