"use client";

import {
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import computer from "../../../../public/images/computer.png";
import laptop from "../../../../public/images/laptop.png";
import supplies from "../../../../public/images/supplies.png";

interface DataType {
  key: React.Key;
  thumbnail: StaticImageData;
  title: string;
  steam: string;
  url: string;
  status: string;
  action: string;
}

export const AllChannelTable = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      thumbnail: computer,
      title: "Prison Chronicles",
      steam: "M3u8",
      url: "http://sample.vodobox.net/skate_phantom_flex_4k/skat...",
      status: "Published",
      action: "Options",
    },
    {
      key: "2",
      thumbnail: laptop,
      title: "지옥에서 온 판사",
      steam: "M3u8",
      url: "http://sample.vodobox.net/skate_phantom_flex_4k/skat...",
      status: "Published",
      action: "Options",
    },
    {
      key: "3",
      thumbnail: supplies,
      title: "Z Nation",
      steam: "M3u8",
      url: "http://sample.vodobox.net/skate_phantom_flex_4k/skat...",
      status: "Published",
      action: "Options",
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
          title="Delete this series?"
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
      render: (thumbnail: string) => (
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
      title: "Steam Type",
      dataIndex: "steam",
    },
    {
      title: "URL",
      dataIndex: "url",
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
        <h2 className="text-[13px] font-[500]">All Channel</h2>
      </div>
      <Table scroll={{ x: 700 }} columns={columns} dataSource={data} bordered />
    </main>
  );
};
