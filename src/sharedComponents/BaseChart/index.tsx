import { Col, Row, Skeleton, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import { Empty } from '~/sharedComponents';

type BaseChartProps = {
	loading: boolean;
	countTitle: string;
	countOrderNumber: number;
	chartData: any;
	chartTitle: string;
	chartName: string;
};

const BaseChart = (props: BaseChartProps) => {
	const navigate = useNavigate();
	const { loading, chartData, chartTitle, chartName, countTitle, countOrderNumber } = props;

	const options: ApexOptions = {
		chart: {
			type: 'bar',
			height: 10,
			zoom: {
				enabled: true
			}
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				horizontal: true,
			}
		},
		dataLabels: {
			enabled: false
		},
		xaxis: {
			categories: chartData.labels,
		}
	};

	const series = [{
		name: chartName,
		data: chartData.series
	}];

	return (
		<>
			<Row gutter={[10, 10]}>
				<Col span={24}>
					<Row>
						<Button style={{ height: 60 }} onClick={() => { navigate("/order"); }}>
							<span style={{ fontWeight: 'bold' }}>{countTitle}</span>
							<h4 className={'text-primary'}>{countOrderNumber}</h4>
						</Button>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Row style={{ backgroundColor: '#f0f2f4', padding: '10px 2px 3px 20px', paddingBottom: 3 }}>
						<div className={'h6 font-weight-bold text-dark'}>{chartTitle}</div>
					</Row>
					<Row>
						<Col span={24}>
							{!loading
								? <>
									{
										chartData.series.length > 0 && (
											<ApexChart options={options} series={series} type="bar" height={180} />
										)
									}
									{
										chartData.series.length === 0 && (
											<Empty description={'No data found'} />
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

export default BaseChart;
