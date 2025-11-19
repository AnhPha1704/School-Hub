"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
// import TeachersForm from "./forms/teachersForm";
// import StudentsForm from "./forms/studentsForm";

const TeachersForm = dynamic(() => import("./forms/teachersForm"), {
  loading: () => (
    <h1 className="flex items-center justify-center text-gray-400 font-semibold">
      Đang tải ...
    </h1>
  ),
});
const StudentsForm = dynamic(() => import("./forms/studentsForm"), {
  loading: () => (
    <h1 className="flex items-center justify-center text-gray-400 font-semibold">
      Đang tải ...
    </h1>
  ),
});
const ClassForm = dynamic(() => import("./forms/classForm"), {
  loading: () => (
    <h1 className="flex items-center justify-center text-gray-400 font-semibold">
      Đang tải ...
    </h1>
  ),
});
const ExamForm = dynamic(() => import("./forms/examForm"), {
  loading: () => (
    <h1 className="flex items-center justify-center text-gray-400 font-semibold">
      Đang tải ...
    </h1>
  ),
});
const SubjectsForm = dynamic(() => import("./forms/subjectsForm"), {
  loading: () => (
    <h1 className="flex items-center justify-center text-gray-400 font-semibold">
      Đang tải ...
    </h1>
  ),
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => React.JSX.Element;
} = {
  teacher: (type, data) => <TeachersForm type={type} data={data} />,
  student: (type, data) => <StudentsForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  subject: (type, data) => <SubjectsForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "subject"
    | "class"
    | "lesson"
    | "attendance"
    | "exam"
    | "assignment"
    | "result"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-[var(--color-yellow)]"
      : type === "update"
      ? "bg-[var(--color-greenLight)]"
      : "bg-[var(--color-yellowLight)]";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-semibold text-xl">
          Tất cả dữ liệu sẽ bị xóa. Bạn có chắc là muốn xóa {table} này?{" "}
        </span>
        <Image
          src="/delete-confirm.png"
          alt=""
          width={512}
          height={512}
          className="flex h-40 w-40 m-auto mt-4"
        />
        <div className="flex justify-around mt-4">
          <button
            className="bg-red-700 text-white font-semibold py-2 px-4 rounded-md border-none w-[100px] xl:w-[150px]"
            aria-label="Xóa"
          >
            Xóa
          </button>
          <button
            className="bg-[var(--color-yellow)] text-black font-semibold py-2 px-4 rounded-md border-none w-[100px] xl:w-[150px]"
            onClick={() => setOpen(false)}
            aria-label="Hủy"
          >
            Hủy
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        aria-label="test"
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:-[60%] xl:-[50%] 2xl:-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer p-2 rounded-full bg-black/7 hover:bg-[var(--color-yellow)]"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={20} height={20} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
