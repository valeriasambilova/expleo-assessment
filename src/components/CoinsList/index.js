import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin, Avatar, Descriptions } from 'antd';

import coingecko from '../../api/coingecko';
import './style.css';

const roundNumberToTwoDecimals = (numString) =>
  Number(Math.round(numString + 'e+2') + 'e-2').toFixed(2);

const CoinsList = ({ onRowClick = null }) => {
  const [data, setData] = useState([]);
  const [initialDataLoading, setInitialDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const renderListItem = (item) => (
    <List.Item
      className='coins-list-item'
      key={item.id}
      onClick={() => onRowClick(item)}
    >
      <List.Item.Meta
        avatar={<Avatar src={item.image} alt={item.name} size='large' />}
        title={item.name}
        description={
          <Descriptions column={3} size='small'>
            <Descriptions.Item label='Symbol' span={3}>
              {item.symbol}
            </Descriptions.Item>
            <Descriptions.Item label='Current Price'>
              {`€ ${roundNumberToTwoDecimals(item.current_price)}`}
            </Descriptions.Item>
            <Descriptions.Item label='High 24-hour Price'>
              {`€ ${roundNumberToTwoDecimals(item.high_24h)}`}
            </Descriptions.Item>
            <Descriptions.Item label='Low 24-hour Price'>
              {`€ ${roundNumberToTwoDecimals(item.low_24h)}`}
            </Descriptions.Item>
          </Descriptions>
        }
      />
    </List.Item>
  );

  const fetchData = async (page) => {
    const res = await coingecko.get('/coins/markets', {
      params: {
        vs_currency: 'eur',
        per_page: 10,
        page,
      },
    });

    return res.data || [];
  };

  useEffect(() => {
    setLoading(true);
    fetchData(page).then((result) => {
      setData((previousData) => [...previousData, ...result]);
      if (result.length < 10) setHasMore(false);
      setLoading(false);
      if (page === 1) setInitialDataLoading(false);
    });
  }, [page]);

  return (
    <div className='coins-list coins-list--height'>
      <InfiniteScroll
        className='coins-list--height'
        initialLoad={false}
        pageStart={1}
        loadMore={(pageToLoad) => setPage(pageToLoad)}
        hasMore={!loading && hasMore}
        loader={<Spin key={0} />}
        threshold={1}
        useWindow={false}
      >
        <List
          dataSource={data}
          renderItem={renderListItem}
          loading={initialDataLoading}
        />
      </InfiniteScroll>
    </div>
  );
};

export default CoinsList;
