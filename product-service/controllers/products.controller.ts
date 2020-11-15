import { Client, QueryConfig } from 'pg';

// models
import { ProductModel } from '../models/product.model';

export const getAllProducts = async (): Promise<ProductModel[]> => {
    const dbConnection = new Client();

    try {
        await dbConnection.connect();

        const { rows: products } = await dbConnection.query(`
            select id, title, description, price, photo_url, stocks.count from products
            inner join stocks
            on products.id = stocks.product_id
        `);

        return products;
    } catch (error) {
        console.log(error);
    } finally {
        dbConnection.end();
    }
};

export const getProductById = async (productId: string): Promise<ProductModel> => {
    const dbConnection = new Client();
    const prepareQuery: QueryConfig = {
        text: `
            select id, title, description, price, photo_url, stocks.count from products
            inner join stocks
            on products.id = stocks.product_id
            where id = $1
        `,
        values: [ productId ],
    };

    try {
        await dbConnection.connect();

        const { rows: products } = await dbConnection.query(prepareQuery);

        return products[0];
    } catch (error) {
        console.log(error);
    } finally {
        dbConnection.end();
    }
};

export const insertProduct = async (product: ProductModel): Promise<string> => {
    const dbConnection = new Client();
    const prepareQuery: QueryConfig = {
        text: `
            with first_insert as (
                insert into products ( title, description, price, photo_url )
                values ( $1, $2, $3, $4 )
                returning id
            )
            insert into stocks ( product_id , count )
            values ( ( select id from first_insert ), $5 )
            returning product_id
        `,
        values: [ product.title, product.description, product.price, product.image, product.count ],
    };

    try {
        await dbConnection.connect();

        const { rows } = await dbConnection.query(prepareQuery);

        return rows[0].product_id;
    } catch (error) {
        console.log(error);
    } finally {
        dbConnection.end();
    }
};
