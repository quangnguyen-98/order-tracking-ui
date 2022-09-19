import axios from './api';
import moment from 'moment';
import { ListOrderResponse, OrderModalResponse } from '../types/User';
import { DateTimeFormat, RootApiEndpoint, DefaulHttpOption } from '../constants/appConstant';
const { MMDDYYYYhhmmA } = DateTimeFormat;

export async function getOrders(body: any) {
	try {
		const { data: response } = await axios.post<ListOrderResponse>(`${RootApiEndpoint}/dishes/get-dishes`, { ...body }, DefaulHttpOption);
		const dishesData = {
			...response,
			data: response.data.map(item => ({ ...item, createdDate: moment(item.createdDate).format(MMDDYYYYhhmmA), updatedDate: moment(item.updatedDate).format(MMDDYYYYhhmmA) }))
		};
		return dishesData;
	} catch (err: any) {
		throw err;
	}

}

export async function postOrders(body: any) {
	try {
		const { data: response } = await axios.post<OrderModalResponse>(`${RootApiEndpoint}/dishes/`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}

}

export async function putOrders(body: any) {
	try {
		const { data: response } = await axios.put<OrderModalResponse>(`${RootApiEndpoint}/dishes/`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}

}