import {ConfigProvider, Layout} from 'antd';
import SidebarComponent
  from '../UIComponents/SharedComponents/SidebarComponent';
import WithAuth from '../UIComponents/SharedComponents/WithAuth';

const {Content} = Layout;

const AdminDashboardLayout = ({children}) => {
  return (
    <ConfigProvider>
      <Layout className={`bg-white`}>
        <SidebarComponent panel="admin" />
        <Layout className="bg-white">
          <Content className={`mt-6 mx-4  rounded-2xl`}>
            <div>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default WithAuth (AdminDashboardLayout, ['normalUser']);
