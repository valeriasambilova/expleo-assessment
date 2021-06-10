import { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const CURRENCY = 'eur';

const roundNumberToTwoDecimals = (num) =>
  Number(Math.round(num + 'e+2') + 'e-2');

const CoinsList = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 50,
  });
  const [loading, setLoading] = useState(false);

  const renderPrice = (price) => roundNumberToTwoDecimals(parseFloat(price));
  const onTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const fetchData = async (paginationParams) => {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: CURRENCY,
          per_page: paginationParams.pageSize,
          page: paginationParams.current,
        },
      }
    );

    return res.data || [];
  };

  useEffect(() => {
    setLoading(true);
    fetchData(pagination).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [pagination]);

  return (
    <Table
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={onTableChange}
    >
      <Column
        title='Image'
        dataIndex='image'
        align='center'
        render={(imageSrc, record) => (
          <img src={imageSrc} alt={record.name} width={50}></img>
        )}
      />
      <Column title='Name' dataIndex='name' />
      <Column title='Symbol' dataIndex='symbol' align='center' />

      <ColumnGroup title={`Price (${CURRENCY.toUpperCase()})`}>
        <Column
          title='Current'
          dataIndex='current_price'
          align='right'
          render={(price) => renderPrice(price)}
        />
        <Column
          title='High 24-hour'
          dataIndex='high_24h'
          align='right'
          render={(price) => renderPrice(price)}
        />
        <Column
          title='Low 24-hour'
          dataIndex='low_24h'
          align='right'
          render={(price) => renderPrice(price)}
        />
      </ColumnGroup>
    </Table>
  );
};

export default CoinsList;
