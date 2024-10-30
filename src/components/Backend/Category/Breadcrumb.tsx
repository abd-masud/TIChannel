"use client";

import { Form, Input, Modal, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaAngleRight, FaPlus } from "react-icons/fa";

const { Option } = Select;

export const Breadcrumb = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  // const [time, setTime] = useState<string>("");
  // const [date, setDate] = useState<string>("");

  // useEffect(() => {
  //   const updateTime = () => {
  //     const now = new Date();
  //     const formattedTime = now.toLocaleTimeString("en-US", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     });
  //     const formattedDate = now.toLocaleDateString("en-US", {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     });

  //     setTime(formattedTime);
  //     setDate(formattedDate);
  //   };

  //   updateTime();

  //   const intervalId = setInterval(updateTime, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        fetch("/api/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            setIsModalOpen(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Category List</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Category List</p>
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
        title="Add Channel"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="employeeForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="py-2" placeholder="Enter employee name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the branch!" }]}
          >
            <TextArea className="py-2" placeholder="Enter employee branch" />
          </Form.Item>
          {/* <Form.Item
            label="Featured"
            name="featured"
            rules={[{ required: true, message: "Please select genres!" }]}
          >
            <Select className="h-10" placeholder="Select genres">
              <Option value="Featured">Yes</Option>
              <Option value="Not Featured">No</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select genres!" }]}
          >
            <Select className="h-10" placeholder="Select genres">
              <Option value="Published">Published</Option>
              <Option value="Not Published">Not Published</Option>
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
