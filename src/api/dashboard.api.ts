import axios from './axios.api';
import { DashboardResponse } from '../types/Common';

export async function getDashboard() {
		const { data } = await axios.get<DashboardResponse>(`/dashboard`);
		return data;
}