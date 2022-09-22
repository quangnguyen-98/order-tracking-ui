import { Col, Row, Breadcrumb as AntdBreadcrumb } from 'antd';

type ContainerProps = {
	path: string;
};

const Breadcrumb = (props: ContainerProps) => {
	return (
		<Row>
			<Col span={24}>
				<AntdBreadcrumb>
					<AntdBreadcrumb.Item>TRACKING SERVICE</AntdBreadcrumb.Item>
					<AntdBreadcrumb.Item>{props.path}</AntdBreadcrumb.Item>
				</AntdBreadcrumb>
			</Col>
		</Row>
	);
};

export default Breadcrumb;
