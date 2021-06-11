// import CoinsTable from './components/CoinsTable';
import { Layout } from 'antd';
import CoinsList from '../CoinsList';
import './style.css';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout className='app--height'>
      <Header className='app-header app--background'>
        <h1>Expleo Front End Developer Assessment</h1>
      </Header>
      <Content className='app-content--container app--height'>
        <div className='app-content app--background app--height'>
          <CoinsList />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
