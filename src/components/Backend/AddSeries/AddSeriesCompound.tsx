"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import ImgCrop from "antd-img-crop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

export const AddSeriesCompound = () => {
  const [form] = Form.useForm();
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [posterList, setPosterList] = useState<UploadFile[]>([]);
  const [genres, setGenres] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres", { method: "GET" });
        const data = await response.json();
        if (data.success) {
          setGenres(data.genres);
        } else {
          console.error("Failed to fetch genres:", data.message);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const onChangeThumbnail: UploadProps["onChange"] = ({
    fileList: newThumbnailList,
  }) => {
    setThumbnailList(newThumbnailList);
  };

  const onChangePosterList: UploadProps["onChange"] = ({
    fileList: posterList,
  }) => {
    setPosterList(posterList);
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      const thumbnail = thumbnailList[0]?.originFileObj;
      const poster = posterList[0]?.originFileObj;

      const generateFileName = (file: File) => {
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
        const fileExtension = file.name.slice(file.name.lastIndexOf("."));
        return `${formattedDate}.${formattedTime}${fileExtension}`;
      };

      if (thumbnail) {
        const newThumbnailName = generateFileName(thumbnail);
        formData.append(
          "thumbnail",
          new File([thumbnail], newThumbnailName, { type: thumbnail.type })
        );
      }

      if (poster) {
        const newPosterName = generateFileName(poster);
        formData.append(
          "poster",
          new File([poster], newPosterName, { type: poster.type })
        );
      }

      formData.append("title", values.title);
      formData.append("genres", values.genres);

      const formattedReleaseDate = values.release_date.format("YYYY-MM-DD");
      formData.append("release_date", formattedReleaseDate);

      formData.append("trailer_url", values.trailer_url);
      formData.append("custom_tag", values.custom_tag);
      formData.append("series_type", values.series_type);
      formData.append("description", values.description);

      const response = await fetch("/api/series", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Response from server:", result);

      form.resetFields();
      setThumbnailList([]);
      setPosterList([]);
      setMessageText("Series added successfully!");
      setMessageVisible(true);
      setProgress(100);
    } catch (error) {
      console.error("Failed to submit:", error);
      setMessageText("Failed to add series. Please try again.");
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
        form={form}
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
              {genres.map((genre: { _id: string; name: string }) => (
                <Option key={genre._id} value={genre.name}>
                  {genre.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Release Date"
            name="release_date"
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
            name="trailer_url"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input className="py-2" placeholder="Enter series title" />
          </Form.Item>

          <Form.Item
            label="Custom Tag"
            name="custom_tag"
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
          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            rules={[
              {
                validator: async () => {
                  if (thumbnailList.length === 0) {
                    throw new Error("Please upload an image!");
                  }
                },
              },
            ]}
          >
            <ImgCrop aspect={3 / 2} rotationSlider>
              <Upload
                listType="picture-card"
                fileList={thumbnailList}
                onChange={onChangeThumbnail}
                beforeUpload={(file) => {
                  const isValid =
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif";
                  if (!isValid) {
                    message.error(
                      "You can only upload JPG, JPEG, PNG, or GIF files!"
                    );
                  }
                  return isValid;
                }}
              >
                {thumbnailList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            name="poster"
            label="Poster"
            rules={[
              {
                validator: async () => {
                  if (posterList.length === 0) {
                    throw new Error("Please upload an image!");
                  }
                },
              },
            ]}
          >
            <ImgCrop aspect={3 / 2} rotationSlider>
              <Upload
                listType="picture-card"
                fileList={posterList}
                onChange={onChangePosterList}
                beforeUpload={(file) => {
                  const isValid =
                    file.type === "image/jpeg" || file.type === "image/png";
                  if (!isValid) {
                    message.error("You can only upload JPG/PNG files!");
                  }
                  return isValid;
                }}
              >
                {posterList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            label="Premium / Free"
            name="series_type"
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
