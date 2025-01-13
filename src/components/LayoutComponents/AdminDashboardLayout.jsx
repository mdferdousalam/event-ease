import {ConfigProvider, Layout} from 'antd';
import SidebarComponent from '../UiComponent/Shard/SidebarComponent';
import WithAuth from '../UiComponent/Shard/WithAuth';
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

export default WithAuth (AdminDashboardLayout, ['ROLE_ADMIN']);
