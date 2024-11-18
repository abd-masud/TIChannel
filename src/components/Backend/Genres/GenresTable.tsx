"use client";

import {
  Button,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  TableColumnsType,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";

const { Option } = Select;

interface DataType {
  key: string;
  _id?: string;
  icon: string;
  name: string;
  description: string;
  featured: string;
  status: string;
  action: string;
}

interface GenresTableProps {
  refreshData: boolean;
}

export const GenresTable: React.FC<GenresTableProps> = ({ refreshData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<DataType | null>(null);
  const [data, setData] = useState<DataType[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const fetchGenres = async () => {
    try {
      const res = await fetch("/api/genres", { method: "GET" });
      const result = await res.json();
      if (result.success) {
        setData(
          result.genres.map((genre: any, index: number) => ({
            ...genre,
            key: index,
          }))
        );
      } else {
        message.error("Failed to fetch genres");
      }
    } catch (error) {
      message.error("Error fetching genres");
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [refreshData]);

  const handleEdit = (record: DataType) => {
    setEditingData(record);
    form.setFieldsValue(record);

    setFileList([
      {
        uid: "-1",
        name: record.name,
        status: "done",
        url: record.icon,
      },
    ]);

    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingData(null);
    setFileList([]);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedItem = { id: editingData?._id, ...values };
      console.log(updatedItem);
      const response = await fetch(`/api/genres`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updatedData = data.map((item) =>
          item._id === editingData?._id ? { ...item, ...values } : item
        );
        setData(updatedData);
        fetchGenres();
        handleModalClose();
      } else {
        console.error("Failed to update genres");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`/api/genres?id=${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData(data.filter((item) => item._id !== _id));
        message.success("Genre deleted successfully");
        fetchGenres();
      } else {
        const result = await response.json();
        message.error(result.message || "Failed to delete genre from database");
      }
    } catch (error) {
      console.error("Error deleting genre:", error);
      message.error("Error deleting genre");
    }
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
          title={`Delete ${record.name}?`}
          onConfirm={() => handleDelete(record._id!)}
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
      render: (_, __, index) => index + 1,
    },
    {
      title: "Icon",
      dataIndex: "icon",
      render: (icon: string) => (
        <Image
          height={100}
          width={100}
          src={icon}
          alt="Icon"
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Featured",
      dataIndex: "featured",
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
        <h2 className="text-[13px] font-[500]">Genres Manager</h2>
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
            name="file"
            label="Image"
            rules={[
              {
                validator: async () => {
                  if (fileList.length === 0) {
                    throw new Error("Please upload an image!");
                  }
                },
              },
            ]}
          >
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={(file) => {
                  const isValid =
                    file.type === "image/jpeg" || file.type === "image/png";
                  if (!isValid) {
                    message.error("You can only upload JPG/PNG files!");
                  }
                  return isValid;
                }}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the genre name!" },
            ]}
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
          <Form.Item
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
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};
