import * as yup from 'yup';

export interface ProductModel {
    id?: string;
    title: string;
    description: string;
    price: number;
    image: string;
    count: number;
}

export const ProductSchema = yup.object().shape({
    id: yup.string().notRequired(),
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    image: yup.string().notRequired(),
    count: yup.number().required(),
});
