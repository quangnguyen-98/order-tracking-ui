import React, { Fragment, FC } from 'react';
import { Button, Layout, Col, Row, Breadcrumb } from 'antd';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from '../../sharedComponents/Container';

const DriverContainer: FC = () => {
    let navigate = useNavigate();
    const navigatePage = (pageName: string) => {
        navigate(pageName);
    }

    return (
        <Layout className='container'>
            <Container>
                <Row>
                    <Col span={22}>
                        <Breadcrumb>
                            <Breadcrumb.Item>BAEMIN ORDER TRACKING SERVICE</Breadcrumb.Item>
                            <Breadcrumb.Item>Driver Page</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={() => { navigatePage("/") }}>Back to Dashboard</Button>
                    </Col>
                </Row>
            </Container>

        </Layout>
    );
}

export default DriverContainer;
