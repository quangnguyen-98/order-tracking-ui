import { FC, useEffect } from 'react';
import { Col, Divider, Row, Layout } from "antd";

import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { RootState } from '../../redux/store';
import { updatePagination, fetchDishes, resetData } from '../../components/Dishes/DishesTable/reducer';

import BreadCrumb from '../../sharedComponents/BreadCrumb';
import Pagination from '../../sharedComponents/Pagination';
import DishesTable from '../../components/Dishes/DishesTable';
import DishesModal from '../../components/Dishes/DishesModal';

const DishesContainer: FC = () => {
	const dispatch = useAppDispatch();

	const { loading, pagination, sort, filter } = useAppSelector((state: RootState) => state.dishesPage.dishesReducer);
	const { isShow } = useAppSelector((state: RootState) => state.dishesPage.dishesModalReducer);
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
			dispatch(fetchDishes({ isShowLoading: false }));
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
		<Layout style={{ background: 'white' }} className='container--main'>
			<Row className='container__dishes'>

				<Col span={24}>
					<BreadCrumb path='Dishes'></BreadCrumb>

					<Divider />

					<DishesTable></DishesTable>

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
			{isShow && (<DishesModal></DishesModal>)}

		</Layout>
	);
};

export default DishesContainer;
