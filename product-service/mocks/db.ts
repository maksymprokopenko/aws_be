import { DBModel } from '../models';

export const MOCK_DB: DBModel = {
    products: [
        {
            id: '1',
            title: 'Product1',
            description: 'Product Description1',
            price: 100,
        },
        {
            id: '2',
            title: 'Product2',
            description: 'Product Description3',
            price: 200,
        },
    ],
};
