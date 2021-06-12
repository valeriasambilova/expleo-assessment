import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin, Avatar, Descriptions } from 'antd';

import coingecko from '../../api/coingecko';
import {
  getDecimalNumberWithTwoDecimals,
  convertExponentialToDecimal,
} from './helpers';
import './style.css';

const CoinsList = ({ onRowClick = null }) => {
  const [data, setData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const renderItem = (item) => (
    <List.Item
      className={onRowClick ? 'coins-list--pointer' : ''}
      key={item.id}
      onClick={() => onRowClick && onRowClick(item)}
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
              {renderPrice(item.current_price)}
            </Descriptions.Item>
            <Descriptions.Item label='High 24-hour Price'>
              {renderPrice(item.high_24h)}
            </Descriptions.Item>
            <Descriptions.Item label='Low 24-hour Price'>
              {renderPrice(item.low_24h)}
            </Descriptions.Item>
          </Descriptions>
        }
      />
    </List.Item>
  );

  const renderPrice = (number) => {
    if (!number) return '–';

    const decimalNumber = convertExponentialToDecimal(number);
    return `€ ${
      decimalNumber < 1
        ? decimalNumber
        : getDecimalNumberWithTwoDecimals(decimalNumber)
    }`;
  };

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
      if (page === 1) setInitialLoading(false);
    });
  }, [page]);

  return (
    <div className='coins-list coins-list--height'>
      <InfiniteScroll
        className='coins-list--height'
        pageStart={1}
        loadMore={(pageToLoad) => setPage(pageToLoad)}
        hasMore={!loading && hasMore}
        loader={<Spin key={0} size='large' className='coins-list-spin' />}
        threshold={1}
        useWindow={false}
      >
        <List
          dataSource={data}
          renderItem={renderItem}
          loading={initialLoading}
        />
      </InfiniteScroll>
    </div>
  );
};

export default CoinsList;
