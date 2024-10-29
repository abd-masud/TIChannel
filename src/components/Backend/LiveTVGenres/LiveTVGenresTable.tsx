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
  status: string;
  action: string;
}

export const LiveTVGenresTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<DataType | null>(null);
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      name: "Prison Chronicles",
      status: "Published",
      action: "Options",
    },
    {
      key: "2",
      name: "지옥에서 온 판사",
      status: "Published",
      action: "Options",
    },
    {
      key: "3",
      name: "Z Nation",
      status: "Published",
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
          title="Delete this series?"
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
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
        <h2 className="text-[13px] font-[500]">Live TV Genres Manager</h2>
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
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select className="h-10" placeholder="Select status">
              <Option value="Published">Published</Option>
              <Option value="Not Published">Not Published</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};
