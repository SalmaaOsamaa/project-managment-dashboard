import type { Product } from "../domain-models";
import { instance } from "./instance";

interface RequestFetchAllProductsArgs {
    
    options?:{
        signal:AbortSignal;
    }
}
interface RequestFetchAllProductsResult {
data : Product[]
}


const requestFetchAllProducts = async ({
    options,
  }: RequestFetchAllProductsArgs): Promise<RequestFetchAllProductsResult> => {
    const { data } = await instance.get<Product[]>(`/products`, {
      signal: options?.signal,
    });
  
    return { data };
  };

  interface RequestEditProductArgs {
    product_id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
    options?: {
        signal: AbortSignal;
    };
  }

  interface RequestEditProductResult {
    data: Product;
  }

  const requestEditProduct = async ({
    options,
    product_id,
    ...requestBody
  }: RequestEditProductArgs): Promise<RequestEditProductResult> => {
    const {
      data,
    } = await instance({
      method: "put",
      url: `/products/${product_id}`,
      data: requestBody,
      signal: options?.signal,
    });
  
    return { data };
  };


export { requestFetchAllProducts, requestEditProduct };