export default interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: number;
    image?: string;
    rating ?:{
        rate: number;
        count: number;
    }
}