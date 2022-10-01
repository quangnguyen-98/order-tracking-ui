import axios from './axios.api';
import { ListDishesResponse, DishesModalResponse } from '../types/Dishes';

export async function getDishes(body: any) {
	const { data } = await axios.post<ListDishesResponse>(`/dishes/get-list-dishes`, { ...body });
	return data;
}

export async function postDishes(body: any) {
	const { data: response } = await axios.post<DishesModalResponse>(`/dishes`, { ...body });
	return response;
}

export async function putDishes(body: any) {
	const { data: response } = await axios.put<DishesModalResponse>(`/dishes`, { ...body });
	return response;
}