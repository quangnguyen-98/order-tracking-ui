import { useState, FC } from 'react';
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Button, Col, Row, Layout, Menu } from 'antd';

import OrderContainer from '../Order';
import DishesContainer from '../Dishes';
import DashboardContainer from '../Dashboard';
import NotFoundContainer from '../NotFound';

import './styles.scss';

const { Header, Content, Sider } = Layout;

const MainContainer: FC = () => {
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);

	const getActiveRoute = (pathName: any): any => {
		switch (pathName) {
			case '/':
				return ['1'];
			case '/order':
				return ['2'];
			case '/dishes':
				return ['3'];
			default:
				return null;
		}
	};

	const route = getActiveRoute(location.pathname);

	return (
		<Layout>
			<Sider trigger={null} theme="light" width={200} className="site-layout-background" collapsible collapsed={collapsed}>
				<Menu
					mode="inline"
					defaultSelectedKeys={['1']}
					selectedKeys={route}
					items={[
						{
							key: '1',
							icon: <NavLink to="/" className="nav-link"><i className="fas fa-chart-line"></i></NavLink>,
							label: 'Dashboard',
						},
						{
							key: '2',
							icon: <NavLink to="/order" className="nav-link"><i className="fa-solid fa-file-invoice-dollar"></i></NavLink>,
							label: 'Order',
						},
						{
							key: '3',
							icon: <NavLink to="/dishes" className="nav-link"><i className="fa-solid fa-burger"></i></NavLink>,
							label: 'Dishes',
						},
					]}
				/>
			</Sider>
			<Layout className="site-layout" style={{ padding: '0 24px 0 24px' }}>
				<Header className="site-layout-background">
					<Row>
						<Col span={1}><span>{collapsed
							? (<Button onClick={() => setCollapsed(!collapsed)}><i className="fas fa-caret-right"></i></Button>)
							: (<Button onClick={() => setCollapsed(!collapsed)}><i className="fas fa-caret-left"></i></Button>)}</span></Col>
						<Col span={23}>
							<span style={{ fontWeight: 'bold' }}>
								<span>&nbsp;<img style={{ marginBottom: '5px', marginRight: '5px' }} src="/favicon.ico" alt="favicon" width="30px" height="30px" />BAEMIN ORDER TRACKING SERVICE</span>
							</span>
						</Col>
					</Row>
				</Header>

				<Content className="site-layout-background" style={{ padding: 0, marginTop: 15, minHeight: 280 }}
				>
					<Routes>
						<Route path="/" element={<DashboardContainer />}></Route>
						<Route path="/order" element={<OrderContainer />}></Route>
						<Route path="/dishes" element={<DishesContainer />}></Route>
						<Route path='*' element={<NotFoundContainer />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainContainer;
