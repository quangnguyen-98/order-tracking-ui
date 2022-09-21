import { useState, useCallback } from 'react';
import { Col, Row, Popover, Button, Input, Checkbox } from 'antd';
import { debounce } from 'lodash';

const { Search } = Input;
type SearchAndFilterProps = {
	filter: any;
	searchField: string;
	filterOptions: any;
	placeholder: string;
	onSearch: Function;
};

const SearchAndFilter = (props: SearchAndFilterProps) => {
	const [searchValue, setsearchValue] = useState('');
	const [filterOptions, setFilterOptions] = useState(props.filterOptions);

	const handleFilterByPreviousTime = (selectedItem: any) => {
		const { filter } = props;
		if (selectedItem.value) {
			switch (selectedItem.key) {
				case 'last5min':
					return {
						...filter,
						updatedDate: { "$gt": new Date(new Date().getTime() - (1000 * 60 * 5)).toISOString() }
					};
				case 'last10min':
					return {
						...filter,
						updatedDate: { "$gt": new Date(new Date().getTime() - (1000 * 60 * 10)).toISOString() }
					};
				case 'last15min':
					return {
						...filter,
						updatedDate: { "$gt": new Date(new Date().getTime() - (1000 * 60 * 15)).toISOString() }
					};
				default:
					return {
						...filter,
					};
			}
		} else {
			return {};
		}

	};

	const onChangeFilterOption = (selectedItem: any) => {
		const newFilter = filterOptions.map((item: any) => ({ ...item, value: item.key === selectedItem.key ? !item.value : false }));
		selectedItem.value = !selectedItem.value;
		setFilterOptions(newFilter);

		props.onSearch(handleFilterByPreviousTime(selectedItem));
	};

	const content = (
		<Row style={{ width: '100%', height: '90px', fontWeight: 'bold' }}>
			<Col span={24}>
				{filterOptions.map((item: any) => (
					<Row key={item.key}> <Checkbox checked={item.value} onChange={() => { onChangeFilterOption(item); }}>{item.displayName}</Checkbox></Row>
				))}
			</Col>
		</Row>
	);

	const onSearchUsingDebounce = useCallback(debounce((value) => props.onSearch(value), 800), []);

	const onChangeSearchValue = (event: any) => {
		const { filter, searchField } = props;
		setsearchValue(event.target.value);
		if (!event.target.value.trim()) {
			onSearchUsingDebounce({});
		} else {
			const filterParam = {
				...filter,
				searchField,
				searchText: event.target.value
			};
			onSearchUsingDebounce(filterParam);
		}
	};

	return (
		<Row>
			<Col span={4}>
				<Search value={searchValue} placeholder={props.placeholder} style={{ width: '100%' }} onChange={onChangeSearchValue} />
			</Col>
			<Col span={18}>

			</Col>
			<Col span={2}>
				<Popover placement="bottomRight" content={content} trigger="click">
					<Button style={{ width: '100%' }}>Filter</Button>
				</Popover>
			</Col>
		</Row>
	);
};

export default SearchAndFilter;
