import Announcement from "@/components/announcement";
import BigCalendar from "@/components/bigCalendar";
import Performance from "@/components/performance";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-[var(--color-green)] py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="/avatar.png"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl text-white font-semibold">Nguyen Van A</h1>
              <p className="text-sm text-gray-200">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
              <div className="bg-[var(--color-greenLight)] p-2 rounded-md flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/school.png" alt="" width={14} height={14} />
                  <span className="text-gray-300">Giáo sư</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/calendarW.png" alt="" width={14} height={14} />
                  <span className="text-gray-300">01/01/2023</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span className="text-gray-300">user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span className="text-gray-300">123 456 789</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/attendance2.png"
                alt=""
                width={14}
                height={14}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-600">Điểm danh</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/branches.png"
                alt=""
                width={14}
                height={14}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">9</h1>
                <span className="text-sm text-gray-600">Chuyên ngành</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/lesson.png"
                alt=""
                width={14}
                height={14}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-600">Bài học</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/classes.png"
                alt=""
                width={14}
                height={14}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-600">Tiết học</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-2xl border-1 border-gray-200 p-4 h-[800px]">
          <h1>Lịch trình giáo viên</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl border-1 border-gray-200">
          <h1 className="text-xl font-semibold">Lối tắt</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-600">
            <Link className="p-3 rounded-md bg-[#f2f1ff]" href="/">
              Lớp học phụ trách
            </Link>
            <Link
              className="p-3 rounded-md bg-[var(--color-yellowLight)]"
              href="/"
            >
              Học sinh phụ trách
            </Link>
            <Link className="p-3 rounded-md bg-[#e2f8ff]" href="/">
              Môn học phụ trách
            </Link>
            <Link className="p-3 rounded-md bg-[#fdf2fb]" href="/">
              Kì thi phụ trách
            </Link>
            <Link
              className="p-3 rounded-md bg-[var(--color-greenSLight)]"
              href="/"
            >
              Bài tập phụ trách
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
