import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { assignmentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

const columns = [
  { header: "Thông tin bài tập", accessor: "name" },
  {
    header: "Lớp",
    accessor: "class",
  },
  {
    header: "Giáo viên",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Ngày đến hạn",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Hành động",
    accessor: "actions",
  },
];

const AssignmentListPage = () => {
  const renderRow = (item: Assignment) => (
    <tr
      key={item.id}
      className="border border-gray-200 even:bg-slate-50 text-sm hover:bg-teal-50"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.dueDate}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button
              aria-label="edit"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-greenLight)]"
            >
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button
              aria-label="delete"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-yellowLight)]"
            >
              <Image src="/delete.png" alt="" width={16} height={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Tất cả bài tập
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button
              aria-label="filter"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-yellow)]"
            >
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button
              aria-label="sort"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-yellow)]"
            >
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button
                aria-label="plus"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-yellow)]"
              >
                <Image src="/plus.png" alt="" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
      {/* PAGENUMBER */}
      <PageNumber />
    </div>
  );
};

export default AssignmentListPage;
