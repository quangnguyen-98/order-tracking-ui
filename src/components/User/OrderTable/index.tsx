
import {
	Button, Col, Empty, message, Row, Skeleton, Tag, Divider, Input, Popover
} from "antd";
import { Table } from 'reactstrap';
import { useAppDispatch } from '../../../redux/hook';
import { formatMoney } from '../../../utils/stringUtils';
import { Order } from '../../../types/User';
import { openOrderModalCreate } from '../../User/OrderModal/reducer';

import ColumnHeader from '../../../sharedComponents/ColumnHeader';
import SearchAndFilter from '../../../sharedComponents/SearchAndFilter';


interface OrderTableProps {
	data: Order[];
	loading: boolean;
	sort: any;
	filter: any;
	onUpdateSort: Function;
	onUpdateFilter: Function;
	onOpenOrderModal: Function;
}

const OrderTable = (props: OrderTableProps) => {
	const { data, loading, onOpenOrderModal, sort, onUpdateSort, filter } = props;
	const dispatch = useAppDispatch();

	const getStatusTag = (item: string | null) => {
		let color = '';
		let displayName = '';
		switch (item) {
			case 'CREATED':
				color = '#fa8c16';
				displayName = 'Created';
				break;
			case 'ACCEPTED':
				color = '#389e0d';
				displayName = 'Accepted';
				break;
			case 'DRIVERASSIGNED':
				color = '#13c2c2';
				displayName = 'Driver Assigned';
				break;
			case 'DELIVERING':
				color = '#1d39c4';
				displayName = 'Delivering';
				break;
			case 'DONE':
				color = '#389e0d';
				displayName = 'Done';
				break;
			case 'CANCELED':
				color = '#f5222d';
				displayName = 'Canceled';
				break;
			default:
				color = '#fa8c16';
				displayName = 'Canceled';
				break;
		}
		return <Tag color={color}>{displayName}</Tag>;
	};

	const getLateStatusTag = (item: any) => {
		let currentDate = new Date().getTime();
		let itemDate = new Date(item.originalUpdatedDate).getTime();
		let diffTime = ((currentDate - itemDate) / 1000 / 60);
		if (item.status === 'DONE') {
			return null;
		}

		if (item.status === 'DELIVERING') {
			if (diffTime > 40) {
				return <Tag color={'#cf1322'}>Late order</Tag>;
			};
			if (diffTime > 10) {
				return <Tag color={'#ffc53d'}>Warning order</Tag>;
			};
			// return <Tag color={color}>{displayName}</Tag>;
		} else {
			if (diffTime > 15) {
				return <Tag color={'#cf1322'}>Late order</Tag>;
			};
			if (diffTime > 10) {
				return <Tag color={'#ffc53d'}>Warning order</Tag>;
			};
		}

		return null;
	};

	const onSearch = (value: any) => {
		props.onUpdateFilter(value);
	};

	const filterOptions = [
		{
			key: 'last5min',
			displayName: 'Updated last 5 min',
			value: false
		},
		{
			key: 'last10min',
			displayName: 'Updated last 10 min',
			value: false
		},
		{
			key: 'last15min',
			displayName: 'Updated last 15 min',
			value: false
		}
	];

	return (
		<>
			<Row>
				<Col span={4}><Button style={{ width: '100%' }} className="baemin__button" type="primary" onClick={() => { dispatch(openOrderModalCreate()); }}>Create new order</Button></Col>
				<Col span={20}></Col>
			</Row>

			<Divider />

			<SearchAndFilter placeholder={'Search by Order name'} filterOptions={filterOptions} searchField={'orderName'} filter={filter} onSearch={onSearch}></SearchAndFilter>

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
														<td className="align-middle">{item.createdDate}</td>
														<td className="align-middle">{item.updatedDate}</td>
														<td className="align-middle">
															<Button onClick={() => {
																onOpenOrderModal(true, item);
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
										<th colSpan={10} className="align-middle text-left"><Skeleton active /></th>
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

export default OrderTable;