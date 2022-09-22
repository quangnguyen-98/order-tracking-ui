import { FC, useEffect } from 'react';
import { Col, Divider, Row, Layout } from "antd";

import { RootState } from '../../redux/store';
import { updatePagination, fetchDishes, resetData, updateSort } from '../../components/Dishes/DishesTable/reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { openDishesModalEdit } from '../../components/Dishes/DishesModal/reducer';
import { Dishes } from '../../types/Dishes';

import BreadCrumb from '../../sharedComponents/BreadCrumb';
import Pagination from '../../sharedComponents/Pagination';
import DishesTable from '../../components/Dishes/DishesTable';
import DishesModal from '../../components/Dishes/DishesModal';

const DishesContainer: FC = () => {
	const dispatch = useAppDispatch();

	const { data, loading, pagination, sort, filter } = useAppSelector((state: RootState) => state.dishesPage.dishesReducer);
	const { isShow } = useAppSelector((state: RootState) => state.dishesPage.dishesModalReducer);
	const { page, pageSize, totalItem } = pagination;

	const onChangePage = (page: number) => {
		dispatch(updatePagination({ ...pagination, page }));
	};

	const onChangePageSize = (pageSize: number) => {
		dispatch(updatePagination({ ...pagination, page: 0, pageSize }));
	};

	const onOpenDishesModal = (isEdit: boolean, data: Dishes) => {
		dispatch(openDishesModalEdit({ isEdit, data }));
	};

	const onUpdateSort = (value: any) => {
		dispatch(updateSort(value));
	};

	useEffect(() => {
		return () => {
			dispatch(resetData());
		};
	}, []);

	useEffect(() => {
		dispatch(fetchDishes({ sort, filter, page, pageSize }, { isShowLoading: true }));
	}, [sort, filter, page]);

	return (
		<Layout style={{ background: 'white' }} className='container--main'>
			<Row className='container__dishes'>

				<Col span={24}>
					<BreadCrumb path='Dishes'></BreadCrumb>

					<Divider />

					<DishesTable
						sort={sort}
						onUpdateSort={onUpdateSort}
						data={data}
						loading={loading}
						onOpenDishesModal={onOpenDishesModal}
					></DishesTable>

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
