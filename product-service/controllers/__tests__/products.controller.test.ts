// models
import { ProductModel } from '../../models/product.model';

// controllers
import { getAllProducts, getProductById } from '../products.controller';

// mocks
import { MOCK_DB } from '../../mocks/db';

test('getAllProducts should return all products', () => {
    getAllProducts().then((data: ProductModel[]) => {
        expect(data).toBe(MOCK_DB.products);
    });
});

test('getProductById should return product by ID', () => {
    getProductById(MOCK_DB.products[0].id).then((product: ProductModel) => {
        expect(product).toBe(MOCK_DB.products[0]);
    });
});

test('should return null if no product found by ID', () => {
    getProductById('123').then((product: ProductModel) => {
        expect(product).toBeNull();
    });
});
