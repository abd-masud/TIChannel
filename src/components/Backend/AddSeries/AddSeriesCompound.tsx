"use client";

import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import Image from "next/image";
import thumbnail from "../../../../public/images/computer.png";

const { Option } = Select;

export const AddSeriesCompound = () => {
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
          <p className="border-b pb-5 mb-5 font-bold">Series Info</p>
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
            label="Genres"
            name="genres"
            rules={[{ required: true, message: "Please select genres!" }]}
          >
            <Select className="h-10" placeholder="Select genres">
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Release Date"
            name="date"
            rules={[{ required: true, message: "Please select release date!" }]}
          >
            <DatePicker
              className="py-2"
              placeholder="Select release date"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Trailer URL(YouTube Only)"
            name="url"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input className="py-2" placeholder="Enter series title" />
          </Form.Item>

          <Form.Item
            label="Custom Tag"
            name="custom tag"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Select className="h-10" placeholder="Select an option">
              <Option value="None">None</Option>
              <Option value="HD">HD</Option>
              <Option value="UHD">UHD</Option>
              <Option value="4K">4K</Option>
              <Option value="720p">720p</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5">
          <p className="border-b pb-5 mb-5 font-bold">Additional Info</p>
          <p className="text-left">Thumbnail</p>
          <Image
            className="w-40 h-auto rounded m-auto block"
            src={thumbnail}
            alt={"Thumbnail"}
          />
          <Form.Item
            className="mt-3 w-full"
            name="title"
            rules={[{ required: true, message: "Please enter thumbnail!" }]}
          >
            <Input className="py-2" placeholder="Image URL" />
          </Form.Item>

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
            label="Premium / Free"
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
