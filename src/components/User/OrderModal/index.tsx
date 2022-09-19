import {
	Button, Col, Divider, Input, Modal, Row, Select
} from "antd";
import { Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
	onChangeOrderFormValue, resetData, updateOrder, createOrder
} from './reducer';
import { OrderStatuses } from '../../../types/User';


import './styles.scss';

const { Option } = Select;

const ModalCreateEditOrder = () => {
	const dispatch = useAppDispatch();
	const { isEdit, isShow, data, loading } = useAppSelector(state => state.orderModalReducer);

	const onSubmitData = () => {
		if (!isEdit) {
			dispatch(createOrder(data));
		} else {
			dispatch(updateOrder(data));
		}
	};

	const children: React.ReactNode[] = [];
	for (let i = 10; i < 36; i++) {
		children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
	}

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	return (
		<Modal
			className={'modal__order'}
			width={'80%'}
			title={!isEdit ? 'Add Order' : 'Edit Order'}
			footer={null}
			closable={false}
			open={isShow}
			centered
		>
			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Order Id:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!._id} size="large" disabled placeholder="Order Id" />
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Order Name:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!.orderName} size="large" placeholder="Order Name" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'orderName', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Address:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!.address} size="large" placeholder="Address" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'address', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Merchant Address:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!.merchantAddress} size="large" placeholder="Merchant Address" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'merchantAddress', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Merchant Name:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!.merchantName} size="large" placeholder="Merchant Name" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'merchantName', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Total Price:</h6>
				</Col>
				<Col span={20}>
					<Input disabled type="number" value={data!.totalPrice} size="large" placeholder="Total Price" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'totalPrice', value: e.target.value }));
					}} />
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Rider Name:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!.riderName} size="large" placeholder="Rider Name" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'riderName', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Status:</h6>
				</Col>
				<Col span={20}>

					<Select className="text-start" value={data!.status?.toString()} style={{ width: '100%' }} size={'large'} disabled={!isEdit} onChange={(value) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'status', value: value }));
					}}>
						{OrderStatuses.map(item => (
							<Option key={item.value} value={item.value}>{item.displayName}</Option>
						))}
					</Select>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Rider Name:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!.riderName} size="large" placeholder="Rider Name" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'riderName', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Add Dishes:</h6>
				</Col>
				<Col className="text-start" span={16}>
					<Select style={{ width: '100%' }} size="large" placeholder="Select Dishes" onChange={handleChange}>
						{children}
					</Select>
				</Col>
				<Col span={4}>
					<Button type={'primary'} size="large" style={{ width: '100%' }} onClick={() => { }}>Add Dishes</Button>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
				</Col>
				<Col className="text-start" span={20}>
					<Row className="text-end" justify="end" align="top" gutter={[10, 10]}>
						{data.dishes.map((item) => (
							<>

								<Col span={14}>
									<Input type="number" value={data!.totalPrice} size="large" placeholder="Total Price" onChange={(e) => {
										dispatch(onChangeOrderFormValue({ fieldName: 'totalPrice', value: e.target.value }));
									}} />
								</Col>

								<Col span={8}>
									<Input type="number" value={data!.totalPrice} size="large" placeholder="Total Price" onChange={(e) => {
										dispatch(onChangeOrderFormValue({ fieldName: 'totalPrice', value: e.target.value }));
									}} />
								</Col>

								<Col className="text-start" span={2}>
									<Button type={'primary'} danger style={{ width: '100%' }} size="large" onClick={() => { }}>X</Button>
								</Col>
							</>
						))}

					</Row>
				</Col>
			</Row>

			<Divider />

			<Row gutter={[10, 0]} justify={'end'}>
				<Col>
					<Button size={'middle'} style={{ width: '100%' }} type={'primary'} loading={loading} onClick={() => { onSubmitData(); }}>{!isEdit ? 'Add' : 'Save'}</Button>
				</Col>
				<Col>
					<Button size={'middle'} style={{ width: '100%' }} onClick={() => { dispatch(resetData()); }}>Close</Button>
				</Col>
			</Row>
		</Modal>
	);
};

export default ModalCreateEditOrder;