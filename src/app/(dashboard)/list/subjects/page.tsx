import FormModal from "@/components/formModal";
import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { role, subjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  { header: "Thông tin môn học", accessor: "name" },
  {
    header: "giáo viên",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Hành động",
    accessor: "actions",
  },
];

const SubjectsListPage = () => {
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border border-gray-200 even:bg-slate-50 text-sm hover:bg-teal-50"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(",")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
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
          Tất cả các môn học
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
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      {/* PAGENUMBER */}
      <PageNumber />
    </div>
  );
};

export default SubjectsListPage;
