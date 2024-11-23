import React from 'react';
import { Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';

const TabProfile = () => (
  <div className="user-info">
    <div className="user-title">
      <h1>Thông tin tài khoản</h1>
    </div>
    <Tabs defaultActiveKey="1" className='user-body' >
      <Tabs.TabPane
        tab={<span><UserOutlined /> Thông tin cá nhân</span>}
        key="1"
      >
        <UserInfo />
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={<span><LockOutlined /> Thay đổi mật khẩu</span>}
        key="2"
      >
        <ChangePassword />
      </Tabs.TabPane>
    </Tabs>
  </div>
);

export default TabProfile;
