import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Tag, Select } from "antd";
import {useProfile} from "@/hooks/useProfile"
import { DeleteOutlined } from "@ant-design/icons";
import "./UserManagement.scss"
const { Option } = Select;

function UserManagement() {
    const {dataProfile, getAllUsers,deleteUser} = useProfile();
    const [filteredUsers, setFilteredUsers] = useState();
    const [sortedInfo, setSortedInfo] = useState({});
    const [filter, setFilter] = useState("");   
    useEffect( () => {
        getAllUsers();
      }, []);
    
    useEffect(() => {
        if (!filter) {
          setFilteredUsers(dataProfile);
        } else {
          const filtered = dataProfile?.filter((user) => {
            if (filter === "Active") return user.isActive;
            if (filter === "Inactive") return !user.isActive;
            if (filter === "Admin") return user.role === "admin";
            if (filter === "User") return user.role === "user";
            return true;
          });
          setFilteredUsers(filtered);
        }
      }, [filter, dataProfile]);
    
      // Fetch data on component mount
const handleDelete = async(id) => {
 await deleteUser(id);
 await getAllUsers()
 setFilteredUsers ((prevUser)=> prevUser.filter((u) => u._id !== u.id))
}
      // Table columns
      const columns = [
        {
          title: "Tên người dùng",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Số điện thoại",
          dataIndex: "phone",
          key: "phone",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (gender) => (
                gender === "female" ? "Nữ": gender === "male" ? "Nam" : "Khác"
            )
        },
        {
          title: "Vai trò",
          dataIndex: "role",
          key: "role",
          render: (role) => (
            <Tag color={role === "admin" ? "blue" : "green"}>{role}</Tag>
          ),
        },
        {
          title: "Hành động",
          key: "actions",
          render: (_, record) => (
            <div>
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa người dùng này không?"
                onConfirm={() => handleDelete(record._id)}
                okText="Có"
                cancelText="Không"
              >
                <Button icon={<DeleteOutlined />} type="link" danger/>
            
              </Popconfirm>
            </div>
          ),
        },
      ];
    
      return (
        <div className="user-management-wrapper">
          <h1>Quản lý người dùng</h1>
          <div className="filter-section">
           
            <Select
              value={filter}
              onChange={setFilter}
              style={{ width: 200 }}
              placeholder="Chọn bộ lọc"
            >
              <Option value="">Tất cả</Option>
              <Option value="Admin">Quản trị viên</Option>
              <Option value="User">Người dùng</Option>
            </Select>
            <Button onClick={() => setFilter("")} style={{ marginLeft: 10 }}>
              Đặt lại
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={Array.isArray(filteredUsers) ? filteredUsers : []}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            bordered
          />
        </div>
      );
}

export default UserManagement;