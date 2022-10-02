import { FC, useEffect } from 'react';
import { Col, Divider, Row, Layout } from "antd";

import { RootState } from '~/redux/store';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { updatePagination, fetchOrders, resetData } from '~/components/Order/OrderTable/reducer';

import { BreadCrumb, Pagination } from '~/sharedComponents';
import OrderTable from '~/components/Order/OrderTable';
import OrderModal from '~/components/Order/OrderModal';

const UserContainer: FC = () => {
	const dispatch = useAppDispatch();

	const { loading, pagination, sort, filter } = useAppSelector((state: RootState) => state.orderPage.orderTableReducer);
	const { isShow } = useAppSelector((state: RootState) => state.orderPage.orderModalReducer);
	const { page, pageSize, totalItem } = pagination;

	const onChangePage = (page: number) => {
		dispatch(updatePagination({ ...pagination, page }));
	};

	const onChangePageSize = (pageSize: number) => {
		dispatch(updatePagination({ ...pagination, page: 0, pageSize }));
	};

	useEffect(() => {
		// Reload order table after 2 minutes
		const timer = setInterval(() => {
			dispatch(fetchOrders({ isShowLoading: false, isAutoFetching: true }));
		}, 120000);

		return () => {
			// Reset data before unmount component 
			dispatch(resetData());
			// Clear timeout before unmount component
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		dispatch(fetchOrders({ isShowLoading: true }));
	}, [sort, filter, pagination.page]);

	return (
		<Layout style={{ background: 'white' }} className='container__main'>
			<Row className='container__order'>
				<Col span={24}>
					<BreadCrumb path='Orders'></BreadCrumb>

					<Divider />

					<OrderTable></OrderTable>

					<Divider />

					<Pagination
						loading={loading}
						page={page}
						pageSize={pageSize}
						totalItem={totalItem}
						onChangePage={onChangePage}
						onChangePageSize={onChangePageSize}
					/>
				</Col>
			</Row>
			{isShow && (<OrderModal></OrderModal>)}
		</Layout>
	);
};

export default UserContainer;
