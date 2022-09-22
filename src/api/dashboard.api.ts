import axios from './api';
import { RootApiEndpoint} from '../constants/appConstant';

export async function getDashboard() {
	try {
		const { data } = await axios.get<any>(`${RootApiEndpoint}/dashboard`);
		return data;
	} catch (err: any) {
		throw err;
	}
}