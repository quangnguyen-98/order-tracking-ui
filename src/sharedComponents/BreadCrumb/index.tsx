import { Button, Col, Row, Breadcrumb as AntdBreadcrumb } from 'antd';
import { useNavigate } from "react-router-dom";
type ContainerProps = {
	path: string;
	subPath: string;
};

const Breadcrumb = (props: ContainerProps) => {
	let navigate = useNavigate();
	const navigatePage = (pageName: string) => {
		navigate(pageName);
	};

	return (
		<Row>
			<Col span={20}>
				<AntdBreadcrumb>
					<AntdBreadcrumb.Item>BAEMIN ORDER TRACKING SERVICE</AntdBreadcrumb.Item>
					<AntdBreadcrumb.Item>{props.path}</AntdBreadcrumb.Item>
					<AntdBreadcrumb.Item>{props.subPath}</AntdBreadcrumb.Item>
				</AntdBreadcrumb>
			</Col>
			<Col span={4}>
				<Button className="baemin__button" type="primary" onClick={() => { navigatePage("/"); }}>Back to Dashboard</Button>
			</Col>
		</Row>
	);
};

export default Breadcrumb;
