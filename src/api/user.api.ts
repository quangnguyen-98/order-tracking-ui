import axios from './api';
import { Product } from '../types/Merchant/Product';

// export interface Product {
//   id: string
//   name: string
//   avatar: string
//   quantity: number
//   price: number
//   createdAt: string
// }


export async function getProducts() {
    const { data } = await axios.get<Product[]>('https://6325d37e4cd1a2834c4545e1.mockapi.io/api/v1/products');
    return data
}
