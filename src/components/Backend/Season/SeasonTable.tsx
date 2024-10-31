"use client";

import {
  Table,
  TableColumnsType,
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
} from "antd";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaPhotoFilm } from "react-icons/fa6";
import computer from "../../../../public/images/computer.png";
import laptop from "../../../../public/images/laptop.png";
import supplies from "../../../../public/images/supplies.png";
import Link from "next/link";

interface DataType {
  key: React.Key;
  thumbnail: StaticImageData;
  title: string;
  description: string;
  status: string;
}

export const SeasonTable = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      thumbnail: computer,
      title: "Season 1",
      description:
        "Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.",
      status: "Published",
    },
    {
      key: "2",
      thumbnail: laptop,
      title: "Season 2",
      description:
        "Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.",
      status: "Published",
    },
    {
      key: "3",
      thumbnail: supplies,
      title: "Season 3",
      description:
        "Twin brother and sister Dipper and Mabel Pines are in for an unexpected adventure when they spend the summer helping their great uncle Stan run a tourist trap in the mysterious town of Gravity Falls, Oregon.",
      status: "Published",
    },
  ]);

  const handleDelete = (key: React.Key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const getMenuItems = (record: DataType): MenuProps["items"] => [
    {
      key: "edit",
      label: (
        <Button type="link">
          <MdEdit />
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      label: (
        <Popconfirm
          title={`Delete ${record.title}`}
          onConfirm={() => handleDelete(record.key)}
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
      dataIndex: "key",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail: StaticImageData) => (
        <Image
          height={100}
          width={100}
          src={thumbnail}
          alt="Thumbnail"
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
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
        <h2 className="text-[13px] font-[500]">Seasons</h2>
      </div>
      <Table scroll={{ x: 700 }} columns={columns} dataSource={data} bordered />
    </main>
  );
};
