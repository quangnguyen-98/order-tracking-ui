import axios from './axios.api';
import { ListDishesResponse, DishesModalResponse } from '../types/Dishes';
import { RootApiEndpoint, DefaulHttpOption } from '../constants/appConstant';

export async function getDishes(body: any) {
	try {
		const { data } = await axios.post<ListDishesResponse>(`${RootApiEndpoint}/dishes/get-list-dishes`, { ...body }, DefaulHttpOption);
		return data;
	} catch (err: any) {
		throw err;
	}

}

export async function postDishes(body: any) {
	try {
		const { data: response } = await axios.post<DishesModalResponse>(`${RootApiEndpoint}/dishes`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}

}

export async function putDishes(body: any) {
	try {
		const { data: response } = await axios.put<DishesModalResponse>(`${RootApiEndpoint}/dishes`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}

}