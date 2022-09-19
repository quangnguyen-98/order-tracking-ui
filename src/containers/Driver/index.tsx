import { FC } from 'react';
import { Layout } from 'antd';
import BreadCrumb from '../../sharedComponents/BreadCrumb';
import { Container } from 'reactstrap';

const DriverContainer: FC = () => {


	return (
		<Layout className='container'>
			<Container>
				<BreadCrumb path='Driver' subPath=''></BreadCrumb>
			</Container>
		</Layout>
	);
};

export default DriverContainer;
