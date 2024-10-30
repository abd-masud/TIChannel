"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  GetProp,
  UploadProps,
  UploadFile,
} from "antd";
import ImgCrop from "antd-img-crop";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const AddChannelCompound = () => {
  const [posterList, setPosterList] = useState<UploadFile[]>([]);
  const onChangePosterList: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setPosterList(newFileList);
  };

  const onPreviewPoster = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new window.Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

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

          <p className="text-left mb-2">Poster</p>
          <ImgCrop rotationSlider aspect={16 / 9}>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.iogfdgf/api/upload"
              listType="picture-card"
              fileList={posterList}
              onChange={onChangePosterList}
              onPreview={onPreviewPoster}
              className="h-18 w-32"
            >
              {posterList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>

          <Form.Item
            label="Genres"
            name="variant"
            rules={[{ required: true, message: "Please select variant!" }]}
            className="mt-10"
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
