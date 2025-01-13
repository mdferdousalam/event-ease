
import {
  DashboardOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';

import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const {Sider} = Layout;

const adminOptions = [
  {
    key: '0',
    icon: <DashboardOutlined />,
    label: 'Home',
    url: '/dashboard',
  },
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Spender',
    url: '/dashboard/donors',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Spenden',
    url: '/dashboard/donations',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Abmelden',
    url: '',
  },
];

const SidebarComponent = ({panel}) => {
  const [current, setCurrent] = useState ('1');
  const router = useRouter ();

  const handleSignOut = () => {
    localStorage.clear ();
    window.location.reload ();
    router.push ('/');
  };

  useEffect (
    () => {
      const activePath = router.pathname;

      let activeKey = '1';
      const panelOptions = getPanelOptions (panel);

      panelOptions.forEach (item => {
        if (activePath.startsWith (item.url) && item.url !== '') {
          activeKey = item.key;
        }
      });

      setCurrent (activeKey);
    },
    [router.pathname, panel]
  );

  const handleMenuClick = e => {
    setCurrent (e.key);
    const selectedItem = getPanelOptions (panel).find (
      item => item.key === e.key
    );

    if (selectedItem.url === '') {
      handleSignOut ();
    }
  };

  const getPanelOptions = panel => {
    if (panel === 'admin') return adminOptions;
    return [];
  };

  const menuItemClass = 'flex items-center gap-1 menu-item-custom';
  const activeMenuItemClass =
    'flex items-center gap-1 menu-item-custom text-white hover:text-white ant-menu-item-selected';

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log (broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log (collapsed, type);
      }}
      className={`bg-white`}
    >
    
      <div className='flex items-center justify-center h-20'> 
      <Link href={'/dashboard'} className=" mx-auto px-2 ">
  <p>EventEasy</p>
</Link>

      </div>

      {panel === 'admin' &&
        <Menu
          mode="inline"
          selectedKeys={[current]}
          items={adminOptions.map (item => ({
            ...item,

            label: (
              <Link
                href={item.url}
                key={item.key}
                className={
                  current === item.key ? activeMenuItemClass : menuItemClass
                }
              >
                {item.label}
              </Link>
            ),
          }))}
          onClick={handleMenuClick}
        />}
    </Sider>
  );
};

export default SidebarComponent;
