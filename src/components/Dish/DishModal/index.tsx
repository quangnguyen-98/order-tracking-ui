import {
	Button, Col, Divider, Input, Modal, Row, notification
} from "antd";

import { useAppDispatch, useAppSelector } from '~/redux/hook';
import {
	onChangeDishesFormValue, resetData, updateDish, createDish
} from './reducer';

const ModalCreateEditDish = () => {
	const dispatch = useAppDispatch();
	const { isEdit, isShow, data, loading } = useAppSelector(state => state.dishPage.dishModalReducer);

	const onSubmitData = () => {

		if (!data.name) {
			return notification.error({ message: 'Please enter dish name!' });
		}

		if (!data.price || Number(data.price) <= 0) {
			return notification.error({ message: 'The price must be equal or greater than 1!' });
		}

		if (!isEdit) {
			let params = {
				name: data.name,
				price: Number(data.price),
			};
			dispatch(createDish(params));
		} else {
			let params = {
				_id: data._id,
				name: data.name,
				price: Number(data.price),
			};
			dispatch(updateDish(params));
		}
	};

	return (
		<Modal
			className={'modal__dishes'}
			width={'80%'}
			title={!isEdit ? 'Add Dish' : 'Edit Dish'}
			footer={null}
			closable={false}
			open={isShow}
			centered
		>
			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Dish Id:</h6>
				</Col>
				<Col span={20}>
					<Input value={data!._id} size="large" disabled placeholder="Dish Id" />
				</Col>
			</Row>

			<Row className="text-end" justify="end" align="middle" gutter={[10, 10]}>
				<Col span={4}>
					<h6>Dish Name:</h6>
				</Col>
				<Col span={20}>
					<Input disabled={loading} value={data!.name} size="large"
						placeholder="Dish Name" onChange={(e) => {
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
					<Input disabled={loading} type="number" value={data!.price} size="large" placeholder="Price"
						onChange={(e) => {
							dispatch(onChangeDishesFormValue({ fieldName: 'price', value: e.target.value }));
						}}
					/>
				</Col>
			</Row>

			<Divider />

			<Row gutter={[10, 0]} justify={'end'}>
				<Col>
					<Button className="baemin__button" size={'middle'} type={'primary'} loading={loading} onClick={() => { onSubmitData(); }}>{!isEdit ? 'Add' : 'Save'}
					</Button>
				</Col>
				<Col>
					<Button size={'middle'} loading={loading} onClick={() => { dispatch(resetData()); }}>Close</Button>
				</Col>
			</Row>
		</Modal>
	);
};

export default ModalCreateEditDish;
