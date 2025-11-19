"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";

const schema = z.object({
  name: z.string().min(1, { message: "Tên lớp là bắt buộc" }),
  capacity: z.string().min(1, { message: "Sĩ số là bắt buộc" }),
  grade: z.string().min(1, { message: "Lớp học là bắt buộc" }),
  supervisor: z.string().min(1, { message: "Chủ nhiệm là bắt buộc" }),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const omSubmit = handleSubmit(onSubmit);

  return (
    <form className="flex flex-col gap-8" onSubmit={omSubmit}>
      <h1 className="text-2xl font-semibold">
        {type === "create" ? "Tạo một lớp học mới" : "Cập nhật lớp học"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Thông tin lớp học
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Tên lớp"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Sĩ số"
          name="capacity"
          type="number"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Lớp"
          name="grade"
          defaultValue={data?.grade}
          register={register}
          error={errors?.grade}
        />
        <InputField
          label="Chủ nhiệm"
          name="supervisor"
          defaultValue={data?.supervisor}
          register={register}
          error={errors?.supervisor}
        />
      </div>
      <button
        aria-label="Xác nhận"
        className="bg-[var(--color-green)] hover:bg-[var(--color-yellow)] hover:text-black text-white font-semibold p-2 rounded-md"
      >
        {type === "create" ? "Tạo" : "Cập nhật"}
      </button>
    </form>
  );
};

export default ClassForm;
