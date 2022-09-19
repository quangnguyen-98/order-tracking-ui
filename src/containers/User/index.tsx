import { FC, useEffect } from 'react';
import { RootState } from '../../redux/store';
import { Container } from 'reactstrap';
import { Col, Divider, Row, Layout } from "antd";

import { updatePagination, fetchOrder, resetData, updateSort } from './reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { openOrderModalEdit } from '../../components/User/OrderModal/reducer';
import { Order } from '../../types/User';

import BreadCrumb from '../../sharedComponents/BreadCrumb';
import Pagination from '../../sharedComponents/Pagination';
import OrderTable from '../../components/User/OrderTable';
import OrderModal from '../../components/User/OrderModal';

const UserContainer: FC = () => {
    const dispatch = useAppDispatch();

    const { data, loading, pagination, sort, filter } = useAppSelector((state: RootState) => state.orderReducer);
    const { isShow } = useAppSelector((state: RootState) => state.orderModalReducer);
    const { page, pageSize, totalItem } = pagination;

    const onChangePage = (page: number) => {
        dispatch(updatePagination({ ...pagination, page }));
    };

    const onChangePageSize = (pageSize: number) => {
        dispatch(updatePagination({ ...pagination, page: 0, pageSize }));
    };

    const onOpenOrderModal = (isEdit: boolean, data: Order) => {
        dispatch(openOrderModalEdit({ isEdit, data }));
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
        dispatch(fetchOrder({ sort, filter, page, pageSize }));
    }, [sort, filter, page]);

    return (
        <Layout className='container'>
            <Container>
                <Row className='container__user'>

                    <Col span={24}>
                        <BreadCrumb path='User' subPath='Order'></BreadCrumb>

                        <Divider />

                        <OrderTable sort={sort}
                            onUpdateSort={onUpdateSort}
                            data={data}
                            loading={loading}
                            onOpenOrderModal={onOpenOrderModal}
                        ></OrderTable>

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
            </Container>
            {isShow && (<OrderModal></OrderModal>)}

        </Layout>
    );
};

export default UserContainer;
