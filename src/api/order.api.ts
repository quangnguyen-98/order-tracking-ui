import axios from './api';
import moment from 'moment';
import { ListOrderResponse, OrderModalResponse } from '../types/User';
import { DateTimeFormat, RootApiEndpoint, DefaulHttpOption } from '../constants/appConstant';
const { MMDDYYYYhhmmA } = DateTimeFormat;

export async function getOrders(body: any) {
	try {
		const { data: response } = await axios.post<ListOrderResponse>(`${RootApiEndpoint}/order/get-list-order`, { ...body }, DefaulHttpOption);
		const orderData = {
			...response,
			data: response.data.map(item => ({ ...item, createdDate: moment(item.createdDate).format(MMDDYYYYhhmmA), updatedDate: moment(item.updatedDate).format(MMDDYYYYhhmmA), originalUpdatedDate: item.updatedDate }))
		};
		return orderData;
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