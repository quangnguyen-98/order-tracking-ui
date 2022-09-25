import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { fetchDashboard, resetData } from './reducer';

import BaseChart from '../../../sharedComponents/BaseChart';

const Chart: FC = () => {
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
      <BaseChart loading={loading} countTitle={'Total number of orders by status:'} countOrderNumber={countOrderByStatus} chartData={orderByStatusChart} chartTitle={'Current number of orders by status:'} chartName={'Order by status'} ></BaseChart>
      <BaseChart loading={loading} countTitle={'Total number of orders by timing:'} countOrderNumber={countOrderByTiming} chartData={orderByTimingChart} chartTitle={'Current number of orders by timing:'} chartName={'Order by timing'} ></BaseChart>
    </>

  );
};

export default Chart;
