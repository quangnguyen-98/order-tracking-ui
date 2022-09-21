
import {
	Button, Col, Empty, message, Row, Skeleton, Divider
} from "antd";
import { Table } from 'reactstrap';

import { formatMoney } from '../../../utils/stringUtils';
import { useAppDispatch } from '../../../redux/hook';
import { openDishesModalCreate } from '../DishesModal/reducer';

import { Dishes } from '../../../types/Merchant';

import ColumnHeader from '../../../sharedComponents/ColumnHeader';

interface MerchantTableProps {
	data: Dishes[];
	loading: boolean;
	sort: any;
	onUpdateSort: Function;
	onOpenDishesModal: Function;
}

const MerchantTable = (props: MerchantTableProps) => {
	const { data, loading, onOpenDishesModal: onOpenMerchantModal, sort, onUpdateSort } = props;
	const dispatch = useAppDispatch();
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
														<td className="align-middle">{item.createdDate}</td>
														<td className="align-middle">{item.updatedDate}</td>
														<td className="align-middle">
															<Button onClick={() => {
																onOpenMerchantModal(true, item);
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

export default MerchantTable;
