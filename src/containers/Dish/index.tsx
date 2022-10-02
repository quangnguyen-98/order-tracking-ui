import { FC, useEffect } from 'react';
import { Col, Divider, Row, Layout } from "antd";

import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { RootState } from '~/redux/store';
import { updatePagination, fetchDishes, resetData } from '~/components/Dish/DishTable/reducer';

import { BreadCrumb, Pagination } from '~/sharedComponents';
import DishTable from '~/components/Dish/DishTable';
import DishModal from '~/components/Dish/DishModal';

const DishContainer: FC = () => {
	const dispatch = useAppDispatch();

	const { loading, pagination, sort, filter } = useAppSelector((state: RootState) => state.dishPage.dishTableReducer);
	const { isShow } = useAppSelector((state: RootState) => state.dishPage.dishModalReducer);
	const { page, pageSize, totalItem } = pagination;

	const onChangePage = (page: number) => {
		dispatch(updatePagination({ ...pagination, page }));
	};

	const onChangePageSize = (pageSize: number) => {
		dispatch(updatePagination({ ...pagination, page: 0, pageSize }));
	};

	useEffect(() => {
		//Reload dishes table after 2 minutes
		const timer = setInterval(() => {
			dispatch(fetchDishes({ isShowLoading: false, isAutoFetching: true }));
		}, 120000);
		return () => {
			// Reset data before unmount component 
			dispatch(resetData());
			//Clear timeout before unmount component
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		dispatch(fetchDishes({ isShowLoading: true }));
	}, [sort, filter, pagination.page]);

	return (
		<Layout style={{ background: 'white' }} className='container__main'>
			<Row className='container__dishes'>

				<Col span={24}>
					<BreadCrumb path='Dishes'></BreadCrumb>

					<Divider />

					<DishTable></DishTable>

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
			{isShow && (<DishModal></DishModal>)}

		</Layout>
	);
};

export default DishContainer;
