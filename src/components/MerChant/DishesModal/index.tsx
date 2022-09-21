import {
	Button, Col, Divider, Input, Modal, Row, notification
} from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
	onChangeDishesFormValue, resetData, updateDishes, createDishes
} from './reducer';

import './styles.scss';

const ModalCreateEditDishes = () => {
	const dispatch = useAppDispatch();
	const { isEdit, isShow, data, loading } = useAppSelector(state => state.dishesPage.dishesModalReducer);

	const onSubmitData = () => {

		if (!data.name) {
			return notification.error({ message: 'please enter dishes name!' });
		}

		if (!data.price || Number(data.price) <= 0) {
			return notification.error({ message: 'The price must be equal or greater than 1!' });
		}

		if (!isEdit) {
			let params = {
				name: data.name,
				price: Number(data.price),
			};
			dispatch(createDishes(params));
		} else {
			let params = {
				_id: data._id,
				name: data.name,
				price: Number(data.price),
			};
			dispatch(updateDishes(params));
		}
	};

	return (
		<Modal
			className={'modal__dishes'}
			width={'80%'}
			title={!isEdit ? 'Add Dishes' : 'Edit Dishes'}
			footer={null}
			closable={false}
			open={isShow}
			centered
		>
			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Dishes Id:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!._id} size="large" disabled placeholder="Dishes Id" />
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Dishes Name:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!.name} size="large"
						placeholder="Dishes Name" onChange={(e) => {
							dispatch(onChangeDishesFormValue({ fieldName: 'name', value: e.target.value }));
						}}
					/>
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Price:</h6>
				</Col>
				<Col span={20}>
					<Input type="number" value={data!.price} size="large" placeholder="Price"
						onChange={(e) => {
							dispatch(onChangeDishesFormValue({ fieldName: 'price', value: e.target.value }));
						}}
					/>
				</Col>
			</Row>

			<Divider />

			<Row gutter={[10, 0]} justify={'end'}>
				<Col>
					<Button size={'middle'} style={{ width: '100%' }} type={'primary'} loading={loading} onClick={() => { onSubmitData(); }}>{!isEdit ? 'Add' : 'Save'}
					</Button>
				</Col>
				<Col>
					<Button size={'middle'} style={{ width: '100%' }} onClick={() => { dispatch(resetData()); }}>Close</Button>
				</Col>
			</Row>
		</Modal>
	);
};

export default ModalCreateEditDishes;