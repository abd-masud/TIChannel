"use client";

import {
  Table,
  TableColumnsType,
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
  message,
} from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

interface DataType {
  _id: string;
  key: string;
  series: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  stream_link: string;
  token: string;
  status: string;
}

export const AllEpisodeTable = () => {
  const [data, setData] = useState<DataType[]>([]);
  const router = useRouter();

  const fetchEpisodes = async () => {
    try {
      const response = await fetch("/api/episode");
      if (response.ok) {
        const data = await response.json();
        const episodes = data.episodes || [];

        const formattedData = Array.isArray(episodes)
          ? episodes.map((item: DataType) => ({
              _id: item._id,
              key: item._id,
              thumbnail: item.thumbnail,
              name: item.name,
              description: item.description,
              status: item.status,
              series: item.series,
              stream_link: item.stream_link,
              category: item.category,
              token: item.token,
            }))
          : [];

        console.log(formattedData);
        setData(formattedData);
      } else {
        console.error("Failed to fetch episodes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handleEditClick = (record: DataType) => {
    const queryParams = new URLSearchParams({
      id: record._id,
      series: record.series,
      name: record.name,
      description: record.description,
      category: record.category,
      thumbnail: record.thumbnail,
      stream_link: record.stream_link,
      token: record.token,
      status: record.status,
    }).toString();

    router.push(`/ti-admin/episode/edit-episode/${record._id}?${queryParams}`);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`/api/episode?id=${_id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        setData(data.filter((item) => item._id !== _id));
        message.success(result.message || "Episode deleted successfully");
        fetchEpisodes();
      } else {
        message.error(result.message || "Failed to delete episode");
      }
    } catch (error) {
      console.error("Error deleting episode:", error);
      message.error("Error deleting episode");
    }
  };
  const getMenuItems = (record: DataType): MenuProps["items"] => [
    {
      key: "edit",
      label: (
        <Button type="link" onClick={() => handleEditClick(record)}>
          <MdEdit />
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      label: (
        <Popconfirm
          title={`Delete ${record.name}?`}
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
      render: (_, __, index) => index + 1,
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
      dataIndex: "name",
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
        <h2 className="text-[13px] font-[500]">All Episodes</h2>
      </div>
      <Table scroll={{ x: 700 }} columns={columns} dataSource={data} bordered />
    </main>
  );
};
