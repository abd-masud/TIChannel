"use client";

import {
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

interface DataType {
  key: string;
  name: string;
  order: number;
}

interface CategoryTableProps {
  refreshData: boolean;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  refreshData,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<DataType | null>(null);
  const [data, setData] = useState<DataType[]>([]);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const categories = await response.json();
        const formattedData = categories.map((item: any) => ({
          key: item._id,
          name: item.name,
          order: item.order,
        }));
        setData(formattedData);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshData]);

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

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedItem = { id: editingData?.key, ...values };

      const response = await fetch(`/api/categories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        fetchCategories();
        handleModalClose();
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (key: React.Key) => {
    try {
      const response = await fetch(`/api/categories`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: key }),
      });
      if (response.ok) {
        fetchCategories();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Order",
      dataIndex: "order",
    },
    {
      title: "Action",
      render: (_: any, record: DataType) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: (
                  <Button type="link" onClick={() => handleEdit(record)}>
                    <MdEdit /> Edit
                  </Button>
                ),
              },
              {
                key: "delete",
                label: (
                  <Popconfirm
                    title={`Delete ${record.name}?`}
                    onConfirm={() => handleDelete(record.key)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link" danger>
                      <MdDelete /> Delete
                    </Button>
                  </Popconfirm>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
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
        title="Edit Category"
        open={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={handleModalClose}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          className="mt-5"
          form={form}
          layout="vertical"
          name="categoryForm"
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input className="py-2" placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            name="order"
            label="Order"
            rules={[{ required: true, message: "Please input the order!" }]}
          >
            <InputNumber className="py-1 w-full" placeholder="Enter order" />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};
