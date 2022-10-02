import axios from './axios.api';
import { ListDishResponse, DishModalResponse } from '~/types/Dish';

export async function getDishes(body: any) {
	const { data } = await axios.post<ListDishResponse>(`/dishes/get-list-dishes`, { ...body });
	return data;
}

export async function postDish(body: any) {
	const { data: response } = await axios.post<DishModalResponse>(`/dishes`, { ...body });
	return response;
}

export async function putDish(body: any) {
	const { data: response } = await axios.put<DishModalResponse>(`/dishes`, { ...body });
	return response;
}
