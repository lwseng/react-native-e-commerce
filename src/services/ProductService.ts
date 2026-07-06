import ApiClient from "./base/ApiClient";
import { Product } from "../types/Product";
import Api from "../constants/Api";

const ProductService = {
    getProducts: async (): Promise<Product[]> => {
        const response = await ApiClient.get(Api.endpoints.products)
        return response.data
    },

    getProductById: async (id: number): Promise<Product> => {
        const response = await ApiClient.get(Api.endpoints.productsById(id))
        return response.data
    },

    getCategories: async (): Promise<string[]> => {
        const response = await ApiClient.get(Api.endpoints.category)
        return response.data
    },

    getProductByCategory: async (category: string): Promise<Product[]> => {
        const response = await ApiClient.get(Api.endpoints.productsByCategory(category))
        return response.data
    }
}

export default ProductService