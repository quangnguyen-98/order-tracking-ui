import React, { Fragment, FC, useEffect } from 'react';
import { Button, Layout, Col, Row, Breadcrumb } from 'antd';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RootState } from '../../redux/store';
import Container from '../../sharedComponents/Container';
import { fetchProducts } from './reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hook';


const MerchantContainer: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const navigatePage = (pageName: string) => {
        navigate(pageName);
    }

    const { products } = useAppSelector((state: RootState) => state.merchantReducer);
    // const { products } = useSelector((state: RootState) => state.merchantReducer);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <Layout className='container'>
            <Container>
                <Row >
                    <Col span={22}>
                        <Breadcrumb>
                            <Breadcrumb.Item>BAEMIN ORDER TRACKING SERVICE</Breadcrumb.Item>
                            <Breadcrumb.Item>Merchant Page</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={() => { navigatePage("/") }}>Back to Dashboard</Button>
                    </Col>
                </Row>

                {products.map(item => {
                    return (
                        <>
                            <Row>
                                <Col span={4}>
                                    {item.name}
                                </Col>
                                <Col span={4}>
                                    {item.avatar}
                                </Col>
                                <Col span={4}>
                                    {item.price}
                                </Col>
                                <Col span={4}>
                                    {item.quantity}
                                </Col>
                                <Col span={4}>
                                    {item.id}
                                </Col>
                                <Col span={4}>
                                    {item.createdAt}
                                </Col>

                            </Row>
                            <div>
                                ====================
                            </div>
                        </>
                    )
                })}
            </Container>

        </Layout>
    );
}

export default MerchantContainer;
