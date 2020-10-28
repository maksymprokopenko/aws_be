import { DBModel } from '../models';

export const MOCK_DB: DBModel = {
    products: [
        {
            id: '1',
            name: 'Product1',
            description: 'Product Description1',
            price: 100,
        },
        {
            id: '2',
            name: 'Product2',
            description: 'Product Description3',
            price: 200,
        },
    ],
};
