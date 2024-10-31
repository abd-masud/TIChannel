"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Upload,
  UploadFile,
  GetProp,
  UploadProps,
  Modal,
} from "antd";
import ImgCrop from "antd-img-crop";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const AddSeasonCompound = () => {
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [posterList, setPosterList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [previewVisible, setPreviewVisible] = useState(false);

  const onChangeThumbnail: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setThumbnailList(newFileList);
  };

  const onChangePosterList: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setPosterList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    setPreviewImage(src);
    setPreviewVisible(true);
  };

  const handleCancel = () => setPreviewVisible(false);

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
          <p className="text-left mb-2">Thumbnail</p>
          <ImgCrop rotationSlider aspect={16 / 9}>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={thumbnailList}
              onChange={onChangeThumbnail}
              onPreview={onPreview}
              // className="aspect-video"
            >
              {thumbnailList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>

          <p className="text-left mt-10 mb-2">Poster</p>
          <ImgCrop rotationSlider aspect={16 / 9}>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.iogfdgf/api/upload"
              listType="picture-card"
              fileList={posterList}
              onChange={onChangePosterList}
              onPreview={onPreview}
              className="h-18 w-32"
            >
              {posterList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>

          <Form.Item
            label="Premium / Free"
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

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </main>
  );
};
