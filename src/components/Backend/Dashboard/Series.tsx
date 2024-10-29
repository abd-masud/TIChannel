import { Table, TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  series: string;
  view: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "series",
  },
  {
    title: "View",
    dataIndex: "view",
  },
];

const data: DataType[] = [
  {
    key: "1",
    series: "Breaking Bad",
    view: 55,
  },
  {
    key: "2",
    series: "Chernobyl",
    view: 55,
  },
  {
    key: "3",
    series: "House of the Dragon",
    view: 55,
  },
];

export const Series = () => {
  return (
    <main className="bg-white p-5 mt-4 rounded-lg shadow-md border">
      <div className="flex items-center pb-5">
        <div className="h-2 w-2 bg-[#E3E4EA] rounded-full mr-2"></div>
        <h2 className="text-[13px] font-[500]">Most Popular Series</h2>
      </div>
      <Table scroll={{ x: 500 }} columns={columns} dataSource={data} bordered />
    </main>
  );
};
