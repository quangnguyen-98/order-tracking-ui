import axios from './axios.api';
import { DashboardResponse } from '../types/Common';
import { RootApiEndpoint } from '../constants/appConstant';

export async function getDashboard() {
	try {
		const { data } = await axios.get<DashboardResponse>(`${RootApiEndpoint}/dashboard`);
		return data;
	} catch (err: any) {
		throw err;
	}
}