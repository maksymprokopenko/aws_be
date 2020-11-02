import { DBModel } from '../models';

export const MOCK_DB: DBModel = {
    products: [
        {
            id: '1',
            title: 'Pro Staff 97 v13 Tennis Racket',
            description: 'Highlighted by a design that pays tribute to the historic Pro Staff series, the Pro Staff 97 v13 features a new Braid 45 construction that increases precision by adjusting the angle of the double braided fibers for enhanced feel and stability. ',
            price: 220,
            image: 'https://shop.wilson.com/media/catalog/product/cache/38/image/9df78eab33525d08d6e5fb8d27136e95/7/1/71571e7b7d38cd6e0ba1733d82cedc02813c8fe8_WR043811U_1_Pro_Staff_97_V13_BL_RD_YE.jpg',
        },
        {
            id: '2',
            title: 'Blade SW102 Autograph Tennis Racket',
            description: 'The Blade SW102 Autograph pays tribute to Serena’s relentless pursuit to cement her legacy not only as an unrivaled champion on the court but also as a transformative inspiration for many generations to come.',
            price: 250,
            image: 'https://shop.wilson.com/media/catalog/product/cache/38/image/9df78eab33525d08d6e5fb8d27136e95/a/3/a346f5b5ceb2e925e60fbe0187058df473064ea9_WR059111U_1_Blade_SW_102CV_BL_GD.jpg',
        },
    ],
};
