import { FC, useEffect } from 'react';
import { Col, Row, Empty, Skeleton } from 'antd';
import { Container } from "reactstrap";
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  fetchDashboard
} from './reducer';

const Chart: FC = () => {
  const dispatch = useAppDispatch();
  const { orderByStatus, orderByTiming, loading } = useAppSelector(state => state.chartReducer);


  useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  const optionsA: ApexOptions = {
    chart: {
      type: 'donut',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: true
    },
    labels: orderByStatus.chartData.labels,
    stroke: {
      curve: 'straight'
    },
  };

  const optionsB: ApexOptions = {
    chart: {
      type: 'donut',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: true
    },
    labels: orderByTiming.chartData.labels,
    stroke: {
      curve: 'straight'
    },
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Row style={{ backgroundColor: '#f0f2f4', paddingTop: 7, paddingBottom: 3 }}>
            <Container>
              <div className={'h4 font-weight-bold text-dark'}>Total/Current number of orders by status</div>
            </Container>
          </Row>
          <Row style={{ paddingTop: 10 }}>
            <Col span={24}>
              {!loading
                ? <>
                  {
                    orderByStatus.chartData.series.length > 0 && (
                      <ApexChart
                        options={optionsA}
                        series={orderByStatus.chartData.series}
                        type="donut"
                        width={'100%'}
                        height={250}
                      />
                    )
                  }
                  {
                    orderByStatus.chartData.series.length === 0 && (
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
                : <Skeleton active />
              }
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Row style={{ backgroundColor: '#f0f2f4', paddingTop: 7, paddingBottom: 3 }}>
            <Container>
              <div className={'h4 font-weight-bold text-dark'}>Total/Current number of orders by status</div>
            </Container>
          </Row>
          <Row style={{ paddingTop: 10 }}>
            <Col span={24}>
              {!loading
                ? <>
                  {
                    orderByStatus.chartData.series.length > 0 && (
                      <ApexChart
                        options={optionsB}
                        series={orderByStatus.chartData.series}
                        type="donut"
                        width={'100%'}
                        height={250}
                      />
                    )
                  }
                  {
                    orderByStatus.chartData.series.length === 0 && (
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
                : <Skeleton active />
              }
            </Col>
          </Row>
        </Col>
      </Row>


    </>

  );
};

export default Chart;
