import { BrandModel } from "../parameters/brand.models";
import { CategoryModel } from "../parameters/category.models";

export class ProductModel {
    id?: String;
    code: String;
    name: String;
    price: number;
    description: String;
    stock: number;
    rate: number;
    categoryId: String;
    brandId: String;
    brand: BrandModel;
    category: CategoryModel;
}