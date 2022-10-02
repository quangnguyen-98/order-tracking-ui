import { Empty as AntdEmpty, Col, Row } from 'antd';

type EmptyProps = {
  description: string;
};

const Emtpy = (props: EmptyProps) => {
  const { description } = props;

  return (
    <Row justify={'center'} style={{ height: '30%' }}>
      <Col>
        <AntdEmpty
          description={<span>{description}</span>}
        />
      </Col>
    </Row>
  );
};

export default Emtpy;
