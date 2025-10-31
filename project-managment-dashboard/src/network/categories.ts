import type { Category } from "../domain-models";
import { instance } from "./instance";

interface RequestFetchAllCategoriesArgs {
    
    options?:{
        signal:AbortSignal;
    }
}
interface RequestFetchAllCategoriesResult {
data : Category[]
}


const requestFetchAllCategories = async ({
    options,
  }: RequestFetchAllCategoriesArgs): Promise<RequestFetchAllCategoriesResult> => {
    const { data } = await instance.get<Category[]>(`/products/categories `, {
      signal: options?.signal,
    });
  
  console.log(data,"where is my data?");
  
    return { data };
  };
  export { requestFetchAllCategories };