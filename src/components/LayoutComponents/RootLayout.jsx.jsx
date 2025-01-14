
import {ConfigProvider, Layout} from 'antd';
import HeaderComponent from '../UIComponents/SharedComponents/HeaderComponent';


const {Content} = Layout;

 const RootLayout = ({children}) => {
  return (
    <ConfigProvider    >
      <Layout
        data-theme="light"
        className={`bg-transparent`}
      >
        <HeaderComponent />
        <Content>{children}</Content>
  
      </Layout>
    </ConfigProvider>
  );
};

export default RootLayout;
