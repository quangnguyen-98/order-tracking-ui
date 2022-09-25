
import {
	Button, Col, Empty, message, Row, Skeleton, Divider
} from "antd";
import { Table } from 'reactstrap';

import { formatMoney, formatDateTime } from '../../../utils/appUtils';

import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';

import { openDishesModalCreate, openDishesModalEdit } from '../DishesModal/reducer';
import { updateSort } from './reducer';

import { Dishes } from '../../../types/Dishes';

import ColumnHeader from '../../../sharedComponents/ColumnHeader';

const DishesTable = () => {
	const dispatch = useAppDispatch();

	const { data, loading, sort } = useAppSelector((state: RootState) => state.dishesPage.dishesReducer);

	const onOpenDishesModal = (isEdit: boolean, data: Dishes) => {
		dispatch(openDishesModalEdit({ isEdit, data }));
	};

	const onUpdateSort = (value: any) => {
		dispatch(updateSort(value));
	};


	return (
		<>
			<Row>
				<Col span={4}>
					<Button className="baemin__button" type="primary" onClick={() => { dispatch(openDishesModalCreate()); }}>Create new dishes</Button>
				</Col>
				<Col span={20}>
				</Col>
			</Row>

			<Divider />

			<Row justify={'center'}>
				<Col span={24}>

					<Table hover responsive>
						<thead>
							<tr>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='_id' columnCaption='Dishes Id'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='name' columnCaption='Dishes Name'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='price' columnCaption='Price'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='createdDate' columnCaption='Created Date'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='updatedDate' columnCaption='Updated Date'></ColumnHeader>
								<ColumnHeader columnCaption='Action'></ColumnHeader>
							</tr>
						</thead>

						<>
							{!loading
								? <>
									{
										data && data.map((item) => {
											return (
												<tbody key={item._id}>
													<tr>
														<th className=" align-middle text-left"><span style={{ cursor: 'pointer' }} onClick={() => {
															navigator.clipboard.writeText(item._id!.toString());
															message.success('Copied to clipboard !');
														}}>{item._id} </span></th>
														<td className="align-middle">{item.name}</td>
														<td className="align-middle">{formatMoney(item.price!)}</td>
														<td className="align-middle">{formatDateTime(item.createdDate)}</td>
														<td className="align-middle">{formatDateTime(item.updatedDate)}</td>
														<td className="align-middle">
															<Button onClick={() => {
																onOpenDishesModal(true, item);
															}}> <i className="far fa-edit" />
															</Button>
														</td>
													</tr>
												</tbody>
											);
										})
									}
								</>
								:
								<tbody>
									<tr>
										<th colSpan={6} className="align-middle text-left"><Skeleton active /></th>
									</tr>
								</tbody>
							}
						</>
					</Table>
				</Col>
			</Row>
			{
				data.length === 0 && !loading && (
					<Row justify={'center'} style={{ height: '30%' }}>
						<Col>
							<Empty
								description={<span>No data found</span>}
							/>
						</Col>
					</Row>
				)
			}
		</>
	);
};

export default DishesTable;
