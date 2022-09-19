import {
	Button, Col, Divider, Input, Modal, Row,
} from "antd";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
	onChangeOrderFormValue, resetData, updateOrder, createOrder
} from './reducer';

const ModalCreateEditDishes = () => {
	const dispatch = useAppDispatch();
	const { isEdit, isShow, data, loading } = useAppSelector(state => state.orderModalReducer);

	const onSubmitData = () => {
		if (!isEdit) {
			dispatch(createOrder(data));
		} else {
			dispatch(updateOrder(data));
		}
	};

	return (
		<Modal
			width={'80%'}
			title={!isEdit ? 'Add Dishes' : 'Edit Dishes'}
			footer={null}
			closable={false}
			open={isShow}
			centered
		>
			<>
				<Row gutter={[10, 10]}>
					<h5>Dishes Id</h5>
					<Input value={data!._id} size="large" disabled
						placeholder="Dishes Id"
					/>
				</Row>
				<Row gutter={[10, 10]}>
					<h5>Dishes Name</h5>
					<Input value={data!.name} size="large"
						placeholder="Dishes Name" onChange={(e) => {
							dispatch(onChangeOrderFormValue({ fieldName: 'name', value: e.target.value }));
						}}
					/>
				</Row>
				<Row gutter={[10, 10]}>
					<h5>Price</h5>
					<Input value={data!.price} size="large" placeholder="Price"
						onChange={(e) => {
							dispatch(onChangeOrderFormValue({ fieldName: 'price', value: e.target.value }));
						}}
					/>
				</Row>
			</>

			<Divider />
			<Row gutter={[10, 0]} justify={'end'}>
				<Col>
					<Button size={'middle'} style={{
						width: '100%',
					}} type={'primary'} loading={loading}
						onClick={() => { onSubmitData(); }}
					>{!isEdit ? 'Add' : 'Save'}
					</Button>
				</Col>
				<Col>
					<Button size={'middle'} style={{ width: '100%' }} onClick={() => {
						dispatch(resetData());
					}}>Close</Button>
				</Col>

			</Row>
		</Modal>
	);
};

export default ModalCreateEditDishes;