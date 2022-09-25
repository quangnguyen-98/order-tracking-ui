import { useState, useEffect } from 'react';
import {
	Button, Col, Divider, Input, Modal, Row, Select, Empty, Tag, Spin, notification
} from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { formatMoney, convertCurrency } from '../../../utils/appUtils';
import { OrderStatuses } from '../../../constants/appConstant';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
	onChangeOrderFormValue, resetData, createOrder, updateOrder, updatePaymentStatus, getAllDishes, onChangeDishesSelectOption, onChangedishesQuantity
} from './reducer';

import { OrderStatusesList, OrderStatusColor, InitialPaypalOptions } from '../../../constants/appConstant';

const { Option } = Select;
const { CREATED, ACCEPTED, DRIVERASSIGNED, DELIVERING, DONE, CANCELED } = OrderStatuses;
const { CreatedColor, AcceptedColor, DriverassignedColor, DeliveringColor, DoneColor, CanceledColor } = OrderStatusColor;

const ModalCreateEditOrder = () => {
	const dispatch = useAppDispatch();
	const [statusSelectedOption, setStatusSelectedOption] = useState('');

	const { isEdit, isShow, data, loading, dishesOptionData, selectedDishes, dishesQuantity } = useAppSelector(state => state.orderPage.orderModalReducer);

	const onSubmitData = () => {
		if (!data.orderName) {
			return notification.error({ message: 'Please enter Order Name before add to order!' });
		}

		if (data.dishes.length <= 0) {
			return notification.error({ message: 'Please add at least 1 dish before ordering!' });
		}

		if (!isEdit) {
			dispatch(createOrder({ ...data, status: statusSelectedOption }));
		} else {
			dispatch(updateOrder({ ...data, status: statusSelectedOption }));
		}
	};

	const onChangeDishesSelect = (value: string) => {
		dispatch(onChangeDishesSelectOption(value));
	};

	const onAddDishesToOrder = () => {
		if (!selectedDishes) {
			return notification.error({ message: 'Please select dishes before add to order!' });
		}

		if (!dishesQuantity || Number(dishesQuantity) <= 0) {
			return notification.error({ message: 'The quantity must be equal or greater than 1!' });
		}

		const existedDishes = data.dishes.find(item => item._id === selectedDishes);
		if (existedDishes) {
			return notification.error({ message: 'This dishes already exists on order list!' });
		}

		let selectedDishesValue = dishesOptionData.find(item => item._id === selectedDishes);

		let selectedDishesValueWithQuantityMapped = [{
			...selectedDishesValue,
			quantity: dishesQuantity
		}];

		const mappedData = [
			...data.dishes,
			...selectedDishesValueWithQuantityMapped
		].map(item => ({
			_id: item._id,
			name: item.name,
			price: item.price,
			quantity: item.quantity,
		}));

		dispatch(onChangeOrderFormValue({ fieldName: 'dishes', value: mappedData }));
	};

	const onRemoveDishesFromOrder = (idItem: string) => {
		const removedData = data.dishes.filter(item => item._id !== idItem);
		dispatch(onChangeOrderFormValue({ fieldName: 'dishes', value: removedData }));
	};

	const getOrderStatusOptions = (): any[] => {
		let listAccesibleStatusByCurrenStatus: any[] = [];
		switch (data.status) {
			case CREATED:
				listAccesibleStatusByCurrenStatus = [CREATED, ACCEPTED, CANCELED];
				break;
			case ACCEPTED:
				listAccesibleStatusByCurrenStatus = [ACCEPTED, DRIVERASSIGNED, CANCELED];
				break;
			case DRIVERASSIGNED:
				listAccesibleStatusByCurrenStatus = [DRIVERASSIGNED, DELIVERING, CANCELED];
				break;
			case DELIVERING:
				listAccesibleStatusByCurrenStatus = [DELIVERING, DONE, CANCELED];
				break;
			case DONE:
				listAccesibleStatusByCurrenStatus = [DONE];
				break;
			case CANCELED:
				listAccesibleStatusByCurrenStatus = [CANCELED];
				break;
			default:
				break;
		}

		return OrderStatusesList.filter(item => listAccesibleStatusByCurrenStatus.includes(item.value));
	};

	const getOptionStatusName = (item: any) => {
		let color = '';
		switch (item.value) {
			case CREATED:
				color = CreatedColor;
				break;
			case ACCEPTED:
				color = AcceptedColor;
				break;
			case DRIVERASSIGNED:
				color = DriverassignedColor;
				break;
			case DELIVERING:
				color = DeliveringColor;
				break;
			case DONE:
				color = DoneColor;
				break;
			case CANCELED:
				color = CanceledColor;
				break;
			default:
				break;
		}
		return <span style={{ color, fontWeight: 'bold' }}>{item.displayName}</span>;
	};


	useEffect(() => {
		setStatusSelectedOption(data.status!);
		dispatch(getAllDishes());
	}, []);

	const isDisabledEditByStatus = [ACCEPTED, DRIVERASSIGNED, DELIVERING, DONE, CANCELED].includes(data.status!);
	const isDisabled = loading || isDisabledEditByStatus;

	const isDisabledEditByStatus2 = [DRIVERASSIGNED, DELIVERING, DONE, CANCELED].includes(data.status!);
	const isOrderInformationDisabled = loading || isDisabledEditByStatus2;

	const isDoneOrCanceledStatus = [DONE, CANCELED].includes(data.status!);

	const isAcceptedStatus = [ACCEPTED].includes(data.status!);

	const orderStatusOptions = getOrderStatusOptions();

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
					<Input value={data._id} size="large" disabled placeholder="Order Id" />
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Order Status:</h6>
				</Col>
				<Col span={20}>
					<Select className="text-start" value={statusSelectedOption} style={{ width: '100%' }} size={'large'} disabled={isDoneOrCanceledStatus || loading || !isEdit} onChange={(value) => {
						setStatusSelectedOption(value);
					}}>
						{orderStatusOptions.map(item => (
							// <Option key={item.value} value={item.value}><span style={{ color: 'red'}}>{item.displayName}</span></Option>
							<Option key={item.value} value={item.value}>{getOptionStatusName(item)}</Option>
						))}
					</Select>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Order Name:</h6>
				</Col>
				<Col span={20}>
					<Input disabled={isOrderInformationDisabled} value={data.orderName} size="large" placeholder="Order Name" onChange={(e) => {
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
					<Input disabled={isOrderInformationDisabled} value={data?.address} size="large" placeholder="Address" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'address', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Merchant Name:</h6>
				</Col>
				<Col span={20}>
					<Input disabled={isOrderInformationDisabled} value={data?.merchantName} size="large" placeholder="Merchant Name" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'merchantName', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Merchant Address:</h6>
				</Col>
				<Col span={20}>
					<Input disabled={isOrderInformationDisabled} value={data?.merchantAddress} size="large" placeholder="Merchant Address" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'merchantAddress', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Rider Name:</h6>
				</Col>
				<Col span={20}>
					<Input disabled={isOrderInformationDisabled} value={data?.riderName} size="large" placeholder="Rider Name" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'riderName', value: e.target.value }));
					}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Total Price:</h6>
				</Col>
				<Col span={20}>
					<Input disabled type="number" value={formatMoney(Number(data.totalPrice))} size="large" placeholder="Total Price" onChange={(e) => {
						dispatch(onChangeOrderFormValue({ fieldName: 'totalPrice', value: e.target.value }));
					}} />
				</Col>
			</Row>

			<Divider />
			{!isDisabledEditByStatus && (
				<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
					<Col span={4}>
						<h6>Add Dishes section:</h6>
					</Col>
					<Col span={20}>
						<Row className="text-start" justify="end" align="middle" gutter={[10, 10]}>
							<Col span={8}>
								<Select disabled={loading} value={selectedDishes} style={{ width: '100%' }} size="large" placeholder="Select Dishes" onChange={onChangeDishesSelect}>
									{dishesOptionData.map(item => (
										<Option key={item._id} value={item._id}>{item.name}</Option>
									))}
								</Select>
							</Col>
							<Col span={6}>
								<Input disabled type="number" value={formatMoney(Number(dishesOptionData.find(item => item._id === selectedDishes)?.price))} size="large" placeholder=" Price" onChange={(e) => {
									dispatch(onChangeOrderFormValue({ fieldName: 'Price', value: e.target.value }));
								}} />
							</Col>
							<Col span={6}>
								<Input disabled={loading} type="number" min="1" value={dishesQuantity} size="large" placeholder="Quantity" onChange={(e) => {
									dispatch(onChangedishesQuantity(Number(e.target.value)));
								}} />
							</Col>
							<Col span={4}>
								<Button className="baemin__button" disabled={loading} type={'primary'} size="large" style={{ width: '100%' }} onClick={onAddDishesToOrder}>Add</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			)}

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}></Col>
				<Col className="text-start" span={20}>

					<Row justify="end" align="top" gutter={[10, 10]}>
						<Col span={24}>
							<h6>List Dishes:</h6>
						</Col>
					</Row>

					<Divider />

					{data.dishes.length > 0 ?
						<Row className="text-start" justify="end" align="middle" gutter={[10, 10]}>
							<Col span={8}><h6>Dishes Name:</h6></Col>
							<Col span={6}><h6>Price:</h6></Col>
							<Col span={6}><h6>Quantity:</h6></Col>
							<Col span={4}></Col>
						</Row>
						:
						<Row justify={'center'} style={{ height: '30%' }}>
							<Col>
								<Empty
									description={<span>Please add dishes to order</span>}
								/>
							</Col>
						</Row>
					}

					<Row className="text-end" justify="end" align="top" gutter={[10, 10]}>
						<Col span={24}>
							{data.dishes.map((item) => (
								<Row key={item._id} gutter={[10, 10]}>
									<Col span={8}><Input disabled value={item.name} size="large" onChange={(e) => { }} /></Col>
									<Col span={6}><Input disabled type="number" value={formatMoney(item.price)} size="large" /></Col>
									<Col span={6}><Input disabled type="number" value={item.quantity} size="large" /></Col>
									<Col className="text-start" span={4}><Button disabled={isDisabled} type={'primary'} danger size="large" onClick={() => { onRemoveDishesFromOrder(item._id!); }}>Remove</Button></Col>
								</Row>
							))}
						</Col>
					</Row>
				</Col>
			</Row>

			<Divider />

			<Row gutter={[10, 0]} justify={'end'}>
				<Col span={4}>
				</Col><Col span={6}>
					{data.wasPurchasedOnline ? <Tag style={{ width: '100%', textAlign: 'center' }} color={DoneColor}>Order already purchased online</Tag> :
						<>{isAcceptedStatus && (<>
							{loading ?
								(<Spin></Spin>) : (<PayPalScriptProvider options={InitialPaypalOptions}>
									<PayPalButtons style={{ layout: "horizontal", height: 30 }}
										createOrder={(orderData, actions) => {
											return actions.order.create({
												purchase_units: [
													{
														amount: {
															value: convertCurrency(data.totalPrice, 'USD')
														}
													}
												]
											});
										}}
										onApprove={(data, actions) => {
											return actions.order!.capture().then((details) => {
												dispatch(updatePaymentStatus());
											});
										}} />
								</PayPalScriptProvider>)}
						</>)

						}
						</>}
				</Col>
				<Col span={10}>
				</Col>
				<Col span={2}>
					<Button disabled={isDoneOrCanceledStatus} className="baemin__button" size={'middle'} type={'primary'} loading={loading} onClick={() => { onSubmitData(); }}>{!isEdit ? 'Add' : 'Save'}</Button>
				</Col>
				<Col span={2}>
					<Button size={'middle'} disabled={loading} onClick={() => { dispatch(resetData()); }}>Close</Button>
				</Col>
			</Row>
		</Modal>
	);
};

export default ModalCreateEditOrder;