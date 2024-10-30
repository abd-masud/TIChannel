"use client";

import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import { StaticImageData } from "next/image";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import computer from "../../../../public/images/computer.png";
import laptop from "../../../../public/images/laptop.png";
import supplies from "../../../../public/images/supplies.png";
import TextArea from "antd/es/input/TextArea";

// const { Option } = Select;

interface DataType {
  key: React.Key;
  icon: StaticImageData;
  name: string;
  description: string;
  featured: string;
  status: string;
  action: string;
}

export const CategoryTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<DataType | null>(null);
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      icon: computer,
      name: "Prison Chronicles",
      description:
        "Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.",
      featured: "Not Featured",
      status: "Published",
      action: "Options",
    },
    {
      key: "2",
      icon: laptop,
      name: "지옥에서 온 판사",
      description:
        "Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.",
      featured: "Not Featured",
      status: "Published",
      action: "Options",
    },
    {
      key: "3",
      icon: supplies,
      name: "Z Nation",
      description:
        "Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.",
      featured: "Not Featured",
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
    // {
    //   title: "Icon",
    //   dataIndex: "icon",
    //   render: (icon: StaticImageData) => (
    //     <Image
    //       height={100}
    //       width={100}
    //       src={icon}
    //       alt="Icon"
    //       className="w-12 h-12 object-cover rounded"
    //     />
    //   ),
    // },
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    // {
    //   title: "Featured",
    //   dataIndex: "featured",
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    // },
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
        <h2 className="text-[13px] font-[500]">Category List</h2>
      </div>
      <Table scroll={{ x: 700 }} columns={columns} dataSource={data} bordered />

      <Modal
        title="Edit Genre"
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
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea className="py-2" placeholder="Enter description" />
          </Form.Item>
          {/* <Form.Item
            label="Featured"
            name="featured"
            rules={[{ required: true, message: "Please select if featured!" }]}
          >
            <Select className="h-10" placeholder="Select featured status">
              <Option value="Featured">Yes</Option>
              <Option value="Not Featured">No</Option>
            </Select>
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
          </Form.Item> */}
        </Form>
      </Modal>
    </main>
  );
};
