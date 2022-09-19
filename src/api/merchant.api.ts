import axios from './api';
import moment from 'moment';
import { ListDishesResponse, DishesModalResponse } from '../types/Merchant';
import { DateTimeFormat, RootApiEndpoint, DefaulHttpOption } from '../constants/appConstant';
const { MMDDYYYYhhmmA } = DateTimeFormat;

export async function getDishes(body: any) {
	try {
		const { data: response } = await axios.post<ListDishesResponse>(`${RootApiEndpoint}/dishes/get-dishes`, { ...body }, DefaulHttpOption);
		const dishesData = {
			...response,
			data: response.data.map(item => ({ ...item, createdDate: moment(item.createdDate).format(MMDDYYYYhhmmA), updatedDate: moment(item.updatedDate).format(MMDDYYYYhhmmA) }))
		};
		return dishesData;
	} catch (err: any) {
		throw err;
	}

}

export async function postDishes(body: any) {
	try {
		const { data: response } = await axios.post<DishesModalResponse>(`${RootApiEndpoint}/dishes/`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}

}

export async function putDishes(body: any) {
	try {
		const { data: response } = await axios.put<DishesModalResponse>(`${RootApiEndpoint}/dishes/`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}

}