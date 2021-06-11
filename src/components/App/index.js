import { useState } from 'react';
import { Layout } from 'antd';
import CoinsList from '../CoinsList';
import CoinDrawer from '../CoinDrawer';
import './style.css';

const { Header, Content } = Layout;

const App = () => {
  const [openCoinId, setOpenCoinId] = useState(null);

  const onRowClick = (item) => setOpenCoinId(item.id);

  return (
    <Layout className='app--height'>
      <Header className='app-header app--background'>
        <h1>Expleo Front End Developer Assessment</h1>
      </Header>
      <Content className='app-content--container app--height'>
        <div className='app-content app--background app--height'>
          <CoinsList onRowClick={onRowClick} />
          <CoinDrawer
            id={openCoinId}
            toggleVisibility={() => setOpenCoinId(null)}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
