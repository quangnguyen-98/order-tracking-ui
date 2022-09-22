import { FC, useEffect } from 'react';
import { RootState } from '../../redux/store';
import { Col, Divider, Row, Layout } from "antd";

import { updatePagination, fetchOrder, resetData, updateSort, updateFilter } from '../../components/Order/OrderTable/reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { openOrderModalEdit } from '../../components/Order/OrderModal/reducer';
import { Order } from '../../types/Order';

import BreadCrumb from '../../sharedComponents/BreadCrumb';
import Pagination from '../../sharedComponents/Pagination';
import OrderTable from '../../components/Order/OrderTable';
import OrderModal from '../../components/Order/OrderModal';

const UserContainer: FC = () => {
	const dispatch = useAppDispatch();

	const { data, loading, pagination, sort, filter } = useAppSelector((state: RootState) => state.orderPage.orderReducer);
	const { isShow } = useAppSelector((state: RootState) => state.orderPage.orderModalReducer);
	const { page, pageSize, totalItem } = pagination;

	const onChangePage = (page: number) => {
		dispatch(updatePagination({ ...pagination, page }));
	};

	const onChangePageSize = (pageSize: number) => {
		dispatch(updatePagination({ ...pagination, page: 0, pageSize }));
	};

	const onOpenOrderModal = (isEdit: boolean, data: Order) => {
		dispatch(openOrderModalEdit({ isEdit, data }));
	};

	const onUpdateSort = (value: any) => {
		dispatch(updateSort(value));
	};

	const onUpdateFilter = (value: any) => {
		dispatch(updateFilter(value));
	};

	useEffect(() => {
		return () => {
			dispatch(resetData());
		};
	}, []);

	useEffect(() => {
		dispatch(fetchOrder({ sort, filter, page, pageSize }, { isShowLoading: true }));
	}, [sort, filter, page]);

	return (
		<Layout style={{ background: 'white' }} className='container--main'>
			<Row className='container__order'>
				<Col span={24}>
					<BreadCrumb path='Order'></BreadCrumb>

					<Divider />

					<OrderTable
						sort={sort}
						filter={filter}
						onUpdateSort={onUpdateSort}
						data={data}
						loading={loading}
						onOpenOrderModal={onOpenOrderModal}
						onUpdateFilter={onUpdateFilter}
					></OrderTable>

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
