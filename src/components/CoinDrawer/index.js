import { Drawer } from 'antd';

const CoinDrawer = ({ id, visible, toggleVisibility }) => {
  return (
    <Drawer visible={visible} onClose={toggleVisibility}>
      {id}
    </Drawer>
  );
};

export default CoinDrawer;
