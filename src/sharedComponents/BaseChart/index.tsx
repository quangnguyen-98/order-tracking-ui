import { Col, Row, Empty, Skeleton } from 'antd';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type BaseChartProps = {
	loading: boolean;
	chartData: any;
	chartTitle: string;
	chartName: string;
};

const BaseChart = (props: BaseChartProps) => {
	const { loading, chartData, chartTitle, chartName } = props;

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
										<Row justify={'center'} style={{ height: '150px' }}>
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
	);
};

export default BaseChart;
