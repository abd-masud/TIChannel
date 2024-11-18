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
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

interface DataType {
  _id: string;
  key: string;
  title: string;
  _thumbnail: string;
  _poster: string;
  description: string;
  release_date: string;
  genres: string;
  trailer_url: string;
  custom_tag: string;
  series_type: string;
}

export const AllSeriesTable = () => {
  const [data, setData] = useState<DataType[]>([]);
  const router = useRouter();

  const fetchSeries = async () => {
    try {
      const response = await fetch("/api/series");
      if (response.ok) {
        const data = await response.json();
        const series = data.series || [];

        const formattedData = Array.isArray(series)
          ? series.map((item: DataType) => ({
              _id: item._id,
              key: item._id,
              title: item.title,
              _thumbnail: item._thumbnail,
              _poster: item._poster,
              description: item.description,
              release_date: item.release_date,
              genres: item.genres,
              trailer_url: item.trailer_url,
              custom_tag: item.custom_tag,
              series_type: item.series_type,
            }))
          : [];

        console.log(formattedData);
        setData(formattedData);
      } else {
        console.error("Failed to fetch series");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const handleEditClick = (record: DataType) => {
    const queryParams = new URLSearchParams({
      id: record._id,
      title: record.title,
      description: record.description,
      genres: JSON.stringify(record.genres),
      release_date: record.release_date,
      trailer_url: record.trailer_url,
      custom_tag: record.custom_tag,
      thumbnail: record._thumbnail,
      poster: record._poster,
      series_type: record.series_type,
    }).toString();

    router.push(`/ti-admin/series/edit-series/${record._id}?${queryParams}`);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`/api/series?id=${_id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        setData(data.filter((item) => item._id !== _id));
        message.success(result.message || "Series deleted successfully");
        fetchSeries();
      } else {
        message.error(result.message || "Failed to delete series");
      }
    } catch (error) {
      console.error("Error deleting series:", error);
      message.error("Error deleting series");
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
          title={`Delete ${record.title}?`}
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
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Thumbnail",
      dataIndex: "_thumbnail",
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
      title: "Poster",
      dataIndex: "_poster",
      render: (poster: string) => (
        <Image
          height={100}
          width={100}
          src={poster}
          alt="Poster"
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
      render: (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return formattedDate;
      },
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
        <h2 className="text-[13px] font-[500]">All Series</h2>
      </div>
      <Table scroll={{ x: 700 }} columns={columns} dataSource={data} bordered />
    </main>
  );
};
