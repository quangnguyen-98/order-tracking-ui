import { FC, useState, lazy, Suspense } from 'react';
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Button, Col, Row, Layout, Menu, Spin } from 'antd';

import './styles.scss';

const OrderContainer = lazy(() => import('../Order'));
const DishesContainer = lazy(() => import('../Dish'));
const DashboardContainer = lazy(() => import('../Dashboard'));
const NotFoundContainer = lazy(() => import('../NotFound'));

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
							label: 'Orders',
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
						<Col xs={6} sm={3} md={1} lg={1}><span>{collapsed
							? (<Button onClick={() => setCollapsed(!collapsed)}><i className="fas fa-caret-right"></i></Button>)
							: (<Button onClick={() => setCollapsed(!collapsed)}><i className="fas fa-caret-left"></i></Button>)}</span></Col>
						<Col xs={18} sm={21} md={23} lg={23}>
							<span style={{ fontWeight: 'bold' }}>
								<span>&nbsp;<img style={{ marginBottom: '5px', marginRight: '5px' }} src="/favicon.ico" alt="favicon" width="30px" height="30px" />BAEMIN ORDER TRACKING SERVICE</span>
							</span>
						</Col>
					</Row>
				</Header>

				<Content className="site-layout-background" style={{ overflow: 'scroll', padding: 0, marginTop: 15, minHeight: 280 }}
				>
					<Routes>
						<Route path="/" element={<Suspense fallback={<Spinner></Spinner>}><DashboardContainer /></Suspense>}></Route>
						<Route path="/order" element={<Suspense fallback={<Spinner></Spinner>}><OrderContainer /></Suspense>}></Route>
						<Route path="/dishes" element={<Suspense fallback={<Spinner></Spinner>}><DishesContainer /></Suspense>}></Route>
						<Route path="*" element={<Suspense fallback={<Spinner></Spinner>}><NotFoundContainer /></Suspense>}></Route>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};

const Spinner: FC = () => {
	return <Spin style={{ position: 'fixed', top: '50%', left: '50%' }} size="large" />;
};

export default MainContainer;
