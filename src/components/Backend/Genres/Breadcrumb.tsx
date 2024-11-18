"use client";

import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight, FaPlus } from "react-icons/fa";

const { Option } = Select;

interface BreadcrumbProps {
  onAddGenres: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ onAddGenres }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      const file = fileList[0]?.originFileObj;

      if (file) {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
        const formattedTime = `${date
          .getHours()
          .toString()
          .padStart(2, "0")}${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}${date
          .getSeconds()
          .toString()
          .padStart(2, "0")}${date
          .getMilliseconds()
          .toString()
          .padStart(3, "0")}`;
        const newFileName = `${formattedDate}.${formattedTime}${file.name.slice(
          file.name.lastIndexOf(".")
        )}`;

        formData.append(
          "file",
          new File([file], newFileName, { type: file.type })
        );
      }

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("featured", values.featured);
      formData.append("status", values.status);

      const response = await fetch("/api/genres", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      handleCancel();
      onAddGenres();
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Genres Manager</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/ti-admin">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Genres Manager</p>
            </div>
          </div>
        </div>
        <button
          className="bg-primary text-white transition duration-300 text-[13px] py-2 px-3 rounded ml-4"
          onClick={showModal}
        >
          <FaPlus />
        </button>
      </main>
      <Modal
        title="Add Genre"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <ImgCrop aspect={1 / 1} rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={(file) => {
                  const isValid =
                    file.type === "image/jpeg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif" ||
                    file.type === "image/webp";

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
    </>
  );
};
