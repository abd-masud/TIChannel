"use client";

import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const { Option } = Select;

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  role: string;
  subscription: string;
  action: string;
}

export const UserManagerTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<DataType | null>(null);
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      name: "Prison Chronicles",
      email: "prison@gmail.com",
      role: "User",
      subscription: "Free",
      action: "Options",
    },
    {
      key: "2",
      name: "지옥에서 온 판사",
      email: "prison@gmail.com",
      role: "User",
      subscription: "Free",
      action: "Options",
    },
    {
      key: "3",
      name: "Z Nation",
      email: "prison@gmail.com",
      role: "User",
      subscription: "1 Month",
      action: "Options",
    },
  ]);

  const [form] = Form.useForm();

  const handleEdit = (record: DataType) => {
    setEditingData(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingData(null);
  };

  const handleModalSubmit = () => {
    form.validateFields().then((values) => {
      const updatedData = data.map((item) =>
        item.key === editingData?.key ? { ...item, ...values } : item
      );
      setData(updatedData);
      handleModalClose();
    });
  };

  const handleDelete = (key: React.Key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const getMenuItems = (record: DataType) => [
    {
      key: "edit",
      label: (
        <Button type="link" onClick={() => handleEdit(record)}>
          <MdEdit />
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      label: (
        <Popconfirm
          title="Delete this user?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            <MdDelete />
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
          <Button>Options</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <main className="bg-white p-5 mt-6 rounded-lg border shadow-md">
      <div className="flex items-center pb-5">
        <div className="h-2 w-2 bg-[#E3E4EA] rounded-full mr-2"></div>
        <h2 className="text-[13px] font-[500]">User Manager</h2>
      </div>
      <Table scroll={{ x: 700 }} columns={columns} dataSource={data} bordered />

      <Modal
        title="Edit Live TV Genres"
        open={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={handleModalClose}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="genreForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="py-2" placeholder="Enter genre name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input
              className="py-2"
              type="email"
              placeholder="Enter email address"
            />
          </Form.Item>
          <Form.Item
            label="Subscription"
            name="subscription"
            rules={[{ required: true, message: "Please select subscription!" }]}
          >
            <Select className="h-10" placeholder="Select subscription">
              <Option value="Free">Free</Option>
              <Option value="1 Month">1 Month</Option>
              <Option value="6 Months">6 Months</Option>
              <Option value="12 Months">12 Months</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};
