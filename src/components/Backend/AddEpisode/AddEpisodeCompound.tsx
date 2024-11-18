"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  UploadFile,
  UploadProps,
  Modal,
  message,
} from "antd";
import ImgCrop from "antd-img-crop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

export const AddEpisodeCompound = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [series, setSeries] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch("/api/series", { method: "GET" });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setSeries(data.series);
        } else {
          console.error("Failed to fetch series:", data.message);
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };
    fetchSeries();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", { method: "GET" });
        if (!response.ok) {
          console.error(
            `Failed to fetch categories: ${response.status} ${response.statusText}`
          );
          return;
        }

        const data = await response.json();
        if (data && data.length) {
          setCategories(data);
          console.log("Categories fetched successfully:", data);
        } else {
          console.error("Failed to fetch categories: No categories found");
        }
      } catch (error) {
        console.error("Error fetching categories:");
      }
    };

    fetchCategories();
  }, []);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => setPreviewVisible(false);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      const file = fileList[0]?.originFileObj;

      // Helper function to generate the new file name in date.time format
      const generateFileName = (file: File) => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
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
        const fileExtension = file.name.slice(file.name.lastIndexOf(".")); // Retain the original file extension
        return `${formattedDate}.${formattedTime}${fileExtension}`;
      };

      if (file) {
        const newFileName = generateFileName(file);
        formData.append(
          "file",
          new File([file], newFileName, { type: file.type })
        );
      }

      formData.append("title", values.title);
      formData.append("series", values.series);
      formData.append("stream_link", values.stream_link);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append("category", values.category);
      formData.append("token", values.token);

      const response = await fetch("/api/episode", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Response from server:", result);

      form.resetFields();
      setFileList([]);
      setMessageText("Episode added successfully!");
      setMessageVisible(true);
      setProgress(100);
    } catch (error) {
      console.error("Failed to submit:", error);
      setMessageText("Failed to add episode. Please try again.");
      setMessageVisible(true);
      setProgress(100);
    }
  };

  const handleCloseMessage = () => {
    setMessageVisible(false);
  };

  useEffect(() => {
    if (messageVisible) {
      const timer = setTimeout(() => {
        setMessageVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [messageVisible]);

  return (
    <main>
      {messageVisible && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-green-600 border border-green-600 fixed sm:top-[90px] top-[90px] right-5 z-50">
          <div className="text-sm font-medium">{messageText}</div>
          <button onClick={handleCloseMessage}>
            <FontAwesomeIcon className="ml-3 text-[14px]" icon={faXmark} />
          </button>
        </div>
      )}
      <Form
        className="lg:flex justify-between gap-4"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5">
          <p className="border-b pb-5 mb-5 font-bold">Episode Info</p>
          <Form.Item
            label="Select Series"
            name="series"
            rules={[{ required: true, message: "Please select series!" }]}
          >
            <Select className="h-10" placeholder="Select series">
              {series.map((series: { _id: string; title: string }) => (
                <Option key={series._id} value={series.title}>
                  {series.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input className="py-2" placeholder="Enter series title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea
              className="py-2"
              placeholder="Enter series description"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select className="h-10" placeholder="Select category">
              {categories.map((category: { _id: string; name: string }) => (
                <Option key={category._id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5">
          <p className="border-b pb-5 mb-5 font-bold">Additional Info</p>
          <Form.Item
            name="file"
            label="Thumbnail"
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
            <ImgCrop aspect={3 / 2} rotationSlider>
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
            label="Stream Link"
            name="stream_link"
            rules={[{ required: true, message: "Please enter steam url!" }]}
          >
            <Input
              className="py-2"
              placeholder="Enter steam URL"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Token"
            name="token"
            rules={[{ required: true, message: "Please enter token!" }]}
          >
            <Input
              className="py-2"
              placeholder="Enter token"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select className="h-10" placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item className="mt-10">
            <Button className="flex" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </main>
  );
};
