import { FC } from 'react';
import { Layout, Col, Row } from 'antd';

import Chart from '../../components/Dashboard/Chart';
import BreadCrumb from '../../sharedComponents/BreadCrumb';

const Dashboard: FC = () => {
	return (
		<Layout style={{ background: 'white' }} className='container__main'>
			<Row className='container__order'>
				<Col span={24}>
					<BreadCrumb path='Dashboard'></BreadCrumb>
					<Chart></Chart>
				</Col>
			</Row>
		</Layout>
	);
};

export default Dashboard;
