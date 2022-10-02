import axios from 'axios';
import { RootApiEndpoint, DefaulHttpOption } from '~/constants/appConstant';

export default axios.create({
  baseURL: RootApiEndpoint,
  timeout: 30000,
  headers: DefaulHttpOption.headers
});
