
import {
	Button, Col, Empty, message, Row, Skeleton, Tag, Divider
} from "antd";
import { Table } from 'reactstrap';

import { formatMoney, formatDateTime } from '../../../utils/stringUtils';
import { OrderStatuses, LateStatuses } from '../../../constants/appConstant';

import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { openOrderModalCreate, openOrderModalEdit } from '../../Order/OrderModal/reducer';
import { updateSort, updateFilter } from '../../Order/OrderTable/reducer';

import { Order } from '../../../types/Order';

import ColumnHeader from '../../../sharedComponents/ColumnHeader';
import SearchAndFilter from '../../../sharedComponents/SearchAndFilter';

const { CREATED, ACCEPTED, DRIVERASSIGNED, DELIVERING, DONE, CANCELED } = OrderStatuses;
const { last5min, last10min, last15min, warningOrder, lateOrder } = LateStatuses;

const OrderTable = () => {
	const dispatch = useAppDispatch();

	const { data, loading, sort, filter } = useAppSelector((state: RootState) => state.orderPage.orderReducer);

	const onOpenOrderModal = (isEdit: boolean, data: Order) => {
		dispatch(openOrderModalEdit({ isEdit, data }));
	};

	const onUpdateSort = (value: any) => {
		dispatch(updateSort(value));
	};

	const onUpdateFilter = (value: any) => {
		dispatch(updateFilter(value));
	};

	const renderLateStatusTag = (color: any, title: any) => <Tag style={{ width: '100%', textAlign: 'center' }} color={color}>{title}</Tag>;

	const getLateStatusTag = (item: any) => {
		let currentDate = new Date().getTime();
		let itemDate = new Date(item.statusUpdatedDate).getTime();
		let diffTime = ((currentDate - itemDate) / 1000 / 60);

		let color = '#52c41a';
		let title = 'Normal';

		if ([DELIVERING].includes(item.status)) {
			if (diffTime > 40) {
				return renderLateStatusTag('#cf1322', 'Late');
			};
			if (diffTime > 30) {
				return renderLateStatusTag('#ffc53d', 'Warning');
			};
			return renderLateStatusTag(color, title);
		} else if ([CREATED, ACCEPTED, DRIVERASSIGNED].includes(item.status)) {
			if (diffTime > 15) {
				return renderLateStatusTag('#cf1322', 'Late');
			};
			if (diffTime > 10) {
				return renderLateStatusTag('#ffc53d', 'Warning');
			};
			return renderLateStatusTag(color, title);
		} else if ([DONE, CANCELED].includes(item.status)) {
			return null;
		} else {
			return renderLateStatusTag(color, title);
		}
	};

	const filterOptions = [
		{
			key: last5min,
			displayName: 'Updated within the last 5 minutes',
			value: false
		},
		{
			key: last10min,
			displayName: 'Updated within the last 10 minutes',
			value: false
		},
		{
			key: last15min,
			displayName: 'Updated within the last 15 minutes',
			value: false
		},
		{
			key: warningOrder,
			displayName: 'Warning order',
			value: false
		},
		{
			key: lateOrder,
			displayName: 'Late order',
			value: false
		}
	];

	return (
		<>
			<Row>
				<Col span={4}><Button className="baemin__button" type="primary" onClick={() => { dispatch(openOrderModalCreate()); }}>Create new order</Button></Col>
				<Col span={20}></Col>
			</Row>

			<Divider />

			<SearchAndFilter placeholder={'Search by Order name'} filterOptions={filterOptions} searchField={'orderName'} filter={filter} onUpdateFilter={onUpdateFilter}></SearchAndFilter>

			<Divider />

			<Row justify={'center'}>
				<Col span={24}>
					<Table hover responsive>
						<thead>
							<tr>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='_id' columnCaption='Order Id'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='orderName' columnCaption='Order Name'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='merchantName' columnCaption='Merchant Name'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='riderName' columnCaption='Rider Name'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='totalPrice' columnCaption='Total Price'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='status' columnCaption='Status'></ColumnHeader>
								<ColumnHeader columnCaption='Late Status'></ColumnHeader>
								<ColumnHeader loading={loading} sort={sort} onUpdateSort={onUpdateSort} columnName='statusUpdatedDate' columnCaption='Status Updated Date'></ColumnHeader>
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
														<th className="align-middle text-left"><span style={{ cursor: 'pointer' }} onClick={() => {
															navigator.clipboard.writeText(item._id!.toString());
															message.success('Copied to clipboard !');
														}}>{item._id} </span></th>
														<td className="align-middle">{item.orderName}</td>
														<td className="align-middle">{item.merchantName}</td>
														<td className="align-middle">{item.riderName}</td>
														<td className="align-middle">{formatMoney(item.totalPrice!)}</td>
														<td className="align-middle">{getStatusTag(item.status!)}</td>
														<td className="align-middle">{getLateStatusTag(item)}</td>
														<td className="align-middle">{formatDateTime(item.statusUpdatedDate)}</td>
														<td className="align-middle">{formatDateTime(item.createdDate)}</td>
														<td className="align-middle">{formatDateTime(item.updatedDate)}</td>
														<td className="align-middle">
															<Button onClick={() => { onOpenOrderModal(true, item); }}> <i className="far fa-edit" />
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
										<th colSpan={11} className="align-middle text-left"><Skeleton active /></th>
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

const getStatusTag = (item: string | null) => {
	let color = '';
	let displayName = '';
	switch (item) {
		case CREATED:
			color = '#fa8c16';
			displayName = 'Created';
			break;
		case ACCEPTED:
			color = '#1890ff';
			displayName = 'Accepted';
			break;
		case DRIVERASSIGNED:
			color = '#13c2c2';
			displayName = 'Driver Assigned';
			break;
		case DELIVERING:
			color = '#1d39c4';
			displayName = 'Delivering';
			break;
		case DONE:
			color = '#389e0d';
			displayName = 'Done';
			break;
		case CANCELED:
			color = '#f5222d';
			displayName = 'Canceled';
			break;
		default:
			color = '#fa8c16';
			displayName = 'Canceled';
			break;
	}
	return <Tag style={{ width: '100%', textAlign: 'center' }} color={color}>{displayName}</Tag>;
};

export default OrderTable;
