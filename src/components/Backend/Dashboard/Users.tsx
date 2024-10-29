import { Table, TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  role: string;
  subscription: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Full Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Subscription",
    dataIndex: "subscription",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    subscription: "Free",
  },
  {
    key: "2",
    name: "Irene Adler",
    email: "irene@example.com",
    role: "User",
    subscription: "Free",
  },
  {
    key: "3",
    name: "Alex Alice",
    email: "alex@example.com",
    role: "User",
    subscription: "Free",
  },
];

export const Users = () => {
  return (
    <main className="bg-white p-5 mt-4 rounded-lg shadow-md border mb-10">
      <div className="flex items-center pb-5">
        <div className="h-2 w-2 bg-[#E3E4EA] rounded-full mr-2"></div>
        <h2 className="text-[13px] font-[500]">New Users</h2>
      </div>
      <Table scroll={{ x: 500 }} columns={columns} dataSource={data} bordered />
    </main>
  );
};
