import { Col, Row, Pagination as AntdPagination } from 'antd';


type PaginationProps = {
    loading: boolean;
    page: number;
    pageSize: number;
    totalItem: number;
    onChangePage: Function;
    onChangePageSize: Function;
};

const Pagination = (props: PaginationProps) => {

    const { loading, page, pageSize, totalItem, onChangePage, onChangePageSize } = props;

    return (
        <Row gutter={[5, 5]} justify={'end'} align={'middle'} style={{ marginRight: 50 }}>
            <Col xs={24} sm={24} md={14} lg={16} style={{ textAlign: 'right' }}>
                <AntdPagination
                    disabled={loading}
                    pageSize={pageSize || 10}
                    current={(page + 1) || 1}
                    total={totalItem}
                    onChange={(page, pageSize) => { onChangePage(page - 1); }}
                    onShowSizeChange={(current, size) => {
                        onChangePageSize(size);
                    }}
                />
            </Col>
        </Row>
    );
};

export default Pagination;
