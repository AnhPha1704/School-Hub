"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Tên phải lớn hơn 3 kí tự" })
    .max(20, { message: "Tên phải nhỏ hơn 20 kí tự" }),

  email: z.string().email({ message: "Địa chỉ Email không hợp lệ!" }),
  password: z.string().min(8, { message: "Mật khẩu phải lớn hơn 8 kí tự" }),
  firstName: z.string().min(1, { message: "Bắt buộc" }),
  lastName: z.string().min(1, { message: "Bắt buộc" }),
  phone: z.string().min(1, { message: "Bắt buộc" }),
  address: z.string().min(1, { message: "Bắt buộc" }),
  position: z.string().min(1, { message: "Bắt buộc" }),
  birthday: z.date({ message: "Bắt buộc" }),
  sex: z.enum(["nam", "nữ"], { message: "Bắt buộc" }),
  img: z.instanceof(File, { message: "Bắt buộc" }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({
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

  const omSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={omSubmit}>
      <h1 className="text-2xl font-semibold">Tạo một giáo viên mới</h1>
      <span className="text-xs text-gray-400 font-medium">
        Thông tin xác thực
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Tên đăng nhập"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Mật khẩu"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Thông tin cá nhân
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Họ"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Tên"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="SĐT"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Địa chỉ"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Chức vụ"
          name="position"
          defaultValue={data?.position}
          register={register}
          error={errors.position}
        />
        <InputField
          label="Ngày sinh"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Giới tính</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
          {errors?.sex && (
            <p className="text-xs text-red-700">{errors.sex.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-2.5 w-full md:w-1/4 justify-center">
          <label
            className="text-sm text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={50} height={50} />
            <span>Tải ảnh lên</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors?.img && (
            <p className="text-xs text-red-700">{errors.img.toString()}</p>
          )}
        </div>
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

export default ExamForm;
