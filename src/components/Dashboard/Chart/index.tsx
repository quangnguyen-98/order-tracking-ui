import { FC, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { fetchDashboard, resetData } from './reducer';

import BaseChart from '../../../sharedComponents/BaseChart';

const Chart: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { countOrderByStatus, countOrderByTiming, orderByStatusChart, orderByTimingChart, loading } = useAppSelector(state => state.chartReducer);

  useEffect(() => {
    dispatch(fetchDashboard({ isShowLoading: true }));

    //Reload dashboard infor after 2 minutes
    const timmer = setInterval(() => {
      dispatch(fetchDashboard({ isShowLoading: false }));
    }, 120000);

    return () => {
      // Reset data before unmount component 
      dispatch(resetData());
      //Clear timeout before unmount component
      clearTimeout(timmer);
    };
  }, []);

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row>
            <Button style={{ height: 60 }} onClick={() => { navigate("/order"); }}>
              <span style={{ fontWeight: 'bold' }}>Total number of orders by status:</span>
              <h4 className={'text-primary'}>{countOrderByStatus}</h4>
            </Button>
          </Row>
        </Col>
      </Row>

      <BaseChart loading={loading} chartData={orderByStatusChart} chartTitle={'Current number of orders by status:'} chartName={'Order by status'} ></BaseChart>

      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row>
            <Button style={{ height: 70 }} onClick={() => { navigate("/order"); }}>
              <span style={{ fontWeight: 'bold' }}>Total number of orders by timing:</span>
              <h4 className={'text-primary'}>{countOrderByTiming}</h4>
            </Button>
          </Row>
        </Col>
      </Row>
      <BaseChart loading={loading} chartData={orderByTimingChart} chartTitle={'Current number of orders by timing:'} chartName={'Order by timing'} ></BaseChart>
    </>

  );
};

export default Chart;
