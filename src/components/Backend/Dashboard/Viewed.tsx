import { Table, TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  view: number;
  type: string;
}

export const Viewed = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "View",
      dataIndex: "view",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Chernobyl",
      view: 1,
      type: "Series",
    },
    {
      key: "2",
      name: "Titanic",
      view: 1,
      type: "Series",
    },
    {
      key: "3",
      name: "Deadpool & Wolverine",
      view: 1,
      type: "Series",
    },
  ];

  return (
    <main className="bg-white p-5 mt-4 rounded-lg shadow-md border">
      <div className="flex items-center pb-5">
        <div className="h-2 w-2 bg-[#E3E4EA] rounded-full mr-2"></div>
        <h2 className="text-[13px] font-[500]">Most viewed Today</h2>
      </div>
      <Table scroll={{ x: 600 }} columns={columns} dataSource={data} bordered />
    </main>
  );
};
