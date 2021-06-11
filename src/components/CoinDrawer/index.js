import { useState, useEffect, Fragment } from 'react';
import { Drawer, Card, Avatar, Descriptions, Typography } from 'antd';

import coingecko from '../../api/coingecko';
import './style.css';

const { Item } = Descriptions;
const { Link } = Typography;

const CoinDrawer = ({ id, visible, toggleVisibility }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    const res = await coingecko.get(`/coins/${id}`, {
      params: {
        localization: false,
      },
    });

    return res.data;
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchData(id).then((result) => {
      setLoading(false);
      setData(result);
    });
  }, [id]);

  useEffect(() => {
    if (!visible) setData(null);
  }, [visible]);

  return (
    <Drawer
      visible={visible}
      onClose={toggleVisibility}
      width={600}
      destroyOnClose={true}
    >
      <Card className='coin-drawer-card' bordered={false} loading={loading}>
        {!data ? (
          <div>Couldn't retrieve any data. Try to reopen card</div>
        ) : (
          <>
            <Card.Meta
              title={data.name}
              description={
                <Descriptions column={1}>
                  <Item label='Symbol'>{data.symbol}</Item>
                  <Item label='Genesis Date'>{data.genesis_date || '–'}</Item>
                  <Item label='Hashing Algorithm'>
                    {data.hashing_algorithm || '–'}
                  </Item>
                  <Item label='Homepage'>
                    <div>
                      {data.links.homepage.map((link, index) => {
                        if (!link) return '';

                        return (
                          <Fragment key={index}>
                            {index > 0 && <br />}
                            {
                              <Link href={link} target='_blank'>
                                {link}
                              </Link>
                            }
                          </Fragment>
                        );
                      }) || '–'}
                    </div>
                  </Item>
                </Descriptions>
              }
              avatar={<Avatar src={data.image.large} size={100} />}
            />
            <Descriptions>
              <Item className='card-drawer-description'>
                {data.description.en}
              </Item>
            </Descriptions>
          </>
        )}
      </Card>
    </Drawer>
  );
};

export default CoinDrawer;
