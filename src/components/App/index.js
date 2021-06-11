import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import CoinsList from '../CoinsList';
import CoinDrawer from '../CoinDrawer';
import './style.css';

const { Header, Content } = Layout;

const App = () => {
  const [openCoinId, setOpenCoinId] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onCoinsListRowClick = (item) => {
    setOpenCoinId(item.id);
    setDrawerVisible(true);
  };

  useEffect(() => {
    if (!drawerVisible) setOpenCoinId(null);
  }, [drawerVisible]);

  return (
    <Layout className='app--height'>
      <Header className='app-header app--background'>
        <h1>Expleo Front End Developer Assessment</h1>
      </Header>
      <Content className='app-content--container app--height'>
        <div className='app-content app--background app--height'>
          <CoinsList onRowClick={onCoinsListRowClick} />
          <CoinDrawer
            id={openCoinId}
            visible={drawerVisible}
            toggleVisibility={() => setDrawerVisible(!drawerVisible)}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
