"use client";

import { Form, Input, InputNumber, Modal } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight, FaPlus } from "react-icons/fa";

interface BreadcrumbProps {
  onAddCategory: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ onAddCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        fetch("/api/categories", {
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
            onAddCategory();
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
              <Link className="text-[12px] text-[#797c8b]" href="/ti-admin">
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
        title="Add Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          className="mt-5"
          form={form}
          layout="vertical"
          name="employeeForm"
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
    </>
  );
};
