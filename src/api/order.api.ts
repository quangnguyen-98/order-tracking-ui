import axios from './axios.api';
import { ListOrderResponse, OrderModalResponse } from '~/types/Order';

export async function getOrders(body: any) {
	const { data } = await axios.post<ListOrderResponse>(`/order/get-list-order`, { ...body });
	return data;
}

export async function postOrder(body: any) {
	const { data: response } = await axios.post<OrderModalResponse>(`/order`, { ...body });
	return response;
}

export async function putOrder(body: any) {
	const { data: response } = await axios.put<OrderModalResponse>(`/order`, { ...body });
	return response;
}

export async function putOderPaymentStatus(body: any) {
	const { data: response } = await axios.put<OrderModalResponse>(`/order/paymentstatus`, { ...body });
	return response;
}
