import { FC, useEffect } from 'react';
import { Col, Divider, Row, Layout } from "antd";

import { RootState } from '../../redux/store';
import { updatePagination, fetchDishes, resetData, updateSort } from '../../components/MerChant/DishesTable/reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { openDishesModalEdit } from '../../components/MerChant/DishesModal/reducer';
import { Dishes } from '../../types/Merchant';

import BreadCrumb from '../../sharedComponents/BreadCrumb';
import Pagination from '../../sharedComponents/Pagination';
import DishesTable from '../../components/MerChant/DishesTable';
import DishesModal from '../../components/MerChant/DishesModal';

const MerchantContainer: FC = () => {
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
		dispatch(fetchDishes({ sort, filter, page, pageSize }));
	}, [sort, filter, page]);

	return (
		<Layout className='container--main'>
			<Row className='container__merchant'>

				<Col span={24}>
					<BreadCrumb path='Merchant' subPath='Dishes'></BreadCrumb>

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

export default MerchantContainer;
