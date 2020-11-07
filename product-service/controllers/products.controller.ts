// models
import { ProductModel } from '../models/product.model';

// db
import { MOCK_DB } from '../mocks/db';

export const getAllProducts = async (): Promise<ProductModel[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_DB.products);
        }, 2000);
    });
};

export const getProductById = async (searchId: string): Promise<ProductModel> => {
    return new Promise((resolve) => {
        const product = MOCK_DB.products.find(({ id }) => id === searchId);

        setTimeout(() => {
            resolve(product);
        }, 2000);
    });
};
