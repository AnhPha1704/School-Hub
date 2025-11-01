import List from "@/components/list";
import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { headers } from "next/headers";
import Image from "next/image";

const columns = [
  { header: "Thông tin", accessor: "info" },
  {
    header: "ID giáo viên",
    accessor: "teacherId",
    className: "hidden md: table-cell",
  },
  {
    header: "Môn dạy",
    accessor: "subjects",
    className: "hidden md: table-cell",
  },
  {
    header: "SDT",
    accessor: "phone",
    className: "hidden lg: table-cell",
  },
  {
    header: "Địa chỉ",
    accessor: "address",
    className: "hidden lg: table-cell",
  },
  {
    header: "Liên hệ",
    accessor: "actions",
  },
];

const TeacherListPage = () => {
  return (
    <div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Giáo viên</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-boyC)]">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-boyC)]">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-boyC)]">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} />
      {/* PAGENUMBER */}
      <PageNumber />
    </div>
  );
};

export default TeacherListPage;
