"use client";

import React from "react";
import { Form, Input, Select, Button } from "antd";
import Image from "next/image";
import thumbnail from "../../../../public/images/computer.png";

const { Option } = Select;

export const AddChannelCompound = () => {
  const onFinish = (values: string) => {
    console.log("Form values:", values);
  };

  return (
    <main>
      <Form
        className="lg:flex justify-between gap-4"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5">
          <p className="border-b pb-5 mb-5 font-bold">Channel Info</p>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter the series title!" },
            ]}
          >
            <Input className="py-2" placeholder="Enter series title" />
          </Form.Item>

          <Form.Item
            label="Steam Type"
            name="steam"
            rules={[{ required: true, message: "Please select genres!" }]}
          >
            <Select className="h-10" placeholder="Select genres">
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Steam Link"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input className="py-2" placeholder="Enter series title" />
          </Form.Item>

          <Form.Item
            label="DRM"
            name="drm"
            rules={[{ required: true, message: "Please select genres!" }]}
          >
            <Select className="h-10" placeholder="Select genres">
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Free / Premium"
            name="variant"
            rules={[{ required: true, message: "Please select genres!" }]}
          >
            <Select className="h-10" placeholder="Select genres">
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="User Agent"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input className="py-2" placeholder="Enter series title" />
          </Form.Item>

          <Form.Item
            label="Referer"
            name="url"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input className="py-2" placeholder="Enter series title" />
          </Form.Item>

          <Form.Item
            label="Cookie"
            name="description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea placeholder="Enter series description" rows={4} />
          </Form.Item>
        </div>

        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5">
          <p className="border-b pb-5 mb-5 font-bold">Additional Info</p>

          <p className="text-left">Poster</p>
          <Image
            className="w-40 h-auto rounded m-auto block"
            src={thumbnail}
            alt={"Poster"}
          />
          <Form.Item
            className="mt-3 w-full"
            name="title"
            rules={[{ required: true, message: "Please enter poster!" }]}
          >
            <Input className="py-2" placeholder="Thumbnail URL" />
          </Form.Item>

          <Form.Item
            label="Genres"
            name="variant"
            rules={[{ required: true, message: "Please select variant!" }]}
          >
            <Select className="h-10" placeholder="Select variant">
              <Option value="Free">Free</Option>
              <Option value="Premium">Premium</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className="flex" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </main>
  );
};
