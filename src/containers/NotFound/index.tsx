import { FC } from 'react';
import { Layout, Result } from 'antd';

const NotFound: FC = () => {
	return (
		<Layout style={{ background: 'white' }} className='container--main'>

			<Result
				status="404"
				title="404"
				subTitle="Page not found!"
			/>
		</Layout>
	);
};

export default NotFound;
