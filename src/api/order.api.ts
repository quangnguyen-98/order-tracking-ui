import axios from './axios.api';
import { ListOrderResponse, OrderModalResponse } from '../types/Order';
import { RootApiEndpoint, DefaulHttpOption } from '../constants/appConstant';

export async function getOrders(body: any) {
	try {
		const { data } = await axios.post<ListOrderResponse>(`${RootApiEndpoint}/order/get-list-order`, { ...body }, DefaulHttpOption);
		return data;
	} catch (err: any) {
		throw err;
	}
}

export async function postOrders(body: any) {
	try {
		const { data: response } = await axios.post<OrderModalResponse>(`${RootApiEndpoint}/order`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}
}

export async function putOrders(body: any) {
	try {
		const { data: response } = await axios.put<OrderModalResponse>(`${RootApiEndpoint}/order`, { ...body }, DefaulHttpOption);
		return response;
	} catch (err: any) {
		throw err;
	}
}