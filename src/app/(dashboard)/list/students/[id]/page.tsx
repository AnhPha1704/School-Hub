import Announcement from "@/components/announcement";
import BigCalendar from "@/components/bigCalendar";
import FormModal from "@/components/formModal";
import Performance from "@/components/performance";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
	return (
		<div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
			{/* LEFT */}
			<div className="w-full xl:w-2/3 ">
				{/* TOP */}
				<div className="flex flex-col lg:flex-row gap-4">
					{/* USER INFO CARD */}
					<div className="bg-[var(--color-green)] py-6 px-4 rounded-md flex-1 flex gap-4">
						<div className="w-1/3 flex justify-center">
							<Image
								src="/avatar.png"
								alt=""
								width={144}
								height={144}
								className="w-30 h-30 rounded-full object-cover"
							/>
						</div>
						<div className="w-2/3 flex flex-col justify-between gap-4">
							<div className="flex items-center gap-4 ">
								<h1 className="text-xl text-white font-semibold">
									Nguyen Van H
								</h1>

								<FormModal
									table="teacher"
									type="update"
									data={{
										id: 1,
										username: "Hoc sinh",
										email: "deanguerrero@gmail.com",
										password: "password",
										firstName: "Dean",
										lastName: "Guerrero",
										phone: "+1 234 567 89",
										address: "1234 Main St, Anytown, USA",
										position: "A+",
										dateOfBirth: "2000-01-01",
										sex: "male",
										img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
									}}
								/>
							</div>
							<p className="text-sm text-gray-200">
								Lorem ipsum dolor sit amet consectetur
								adipisicing.
							</p>
							<div className="bg-[var(--color-greenLight)] p-2 rounded-md flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image
										src="/school.png"
										alt=""
										width={14}
										height={14}
									/>
									<span className="text-gray-300">
										Học sinh
									</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image
										src="/calendarW.png"
										alt=""
										width={14}
										height={14}
									/>
									<span className="text-gray-300">
										01/01/2023
									</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image
										src="/mail.png"
										alt=""
										width={14}
										height={14}
									/>
									<span className="text-gray-300">
										user@gmail.com
									</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
									<Image
										src="/phone.png"
										alt=""
										width={14}
										height={14}
									/>
									<span className="text-gray-300">
										123 456 789
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* SMALL CARDS */}
					<div className="flex-1 flex gap-4 justify-between flex-wrap">
						{/* CARD */}
						<div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
							<Image
								src="/attendance2.png"
								alt=""
								width={14}
								height={14}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">90%</h1>
								<span className="text-sm text-gray-600">
									Điểm danh
								</span>
							</div>
						</div>
						<div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
							<Image
								src="/branches.png"
								alt=""
								width={14}
								height={14}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">10</h1>
								<span className="text-sm text-gray-600">
									Lớp
								</span>
							</div>
						</div>
						<div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
							<Image
								src="/lesson.png"
								alt=""
								width={14}
								height={14}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">18</h1>
								<span className="text-sm text-gray-600">
									Bài học
								</span>
							</div>
						</div>
						<div className="bg-white p-4 rounded-2xl border-1 border-gray-200 flex gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
							<Image
								src="/classes.png"
								alt=""
								width={14}
								height={14}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">6A</h1>
								<span className="text-sm text-gray-600">
									Tên lớp
								</span>
							</div>
						</div>
					</div>
				</div>
				{/* BOTTOM */}
				<div className="mt-4 bg-white rounded-2xl border-1 border-gray-200 p-4 h-[900px]">
					<h1>Lịch trình học sinh</h1>
					<BigCalendar />
				</div>
			</div>
			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-4">
				<div className="bg-white p-4 rounded-2xl border-1 border-gray-200">
					<h1 className="text-xl font-semibold">Lối tắt</h1>
					<div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-600">
						<Link
							className="p-3 rounded-md bg-[#f2f1ff]"
							href={`/list/lessons?classId=${2}`}
						>
							Tiết học của tôi
						</Link>
						<Link
							className="p-3 rounded-md bg-[var(--color-yellowLight)]"
							href={`/list/teachers?classId=${2}`}
						>
							Giáo viên phụ trách
						</Link>
						<Link
							className="p-3 rounded-md bg-[#e2f8ff]"
							href={`/list/exams?classId=${2}`}
						>
							Kì thi của tôi
						</Link>
						<Link
							className="p-3 rounded-md bg-[#fdf2fb]"
							href={`/list/assignments?classId=${2}`}
						>
							Bài tập của tôi
						</Link>
						<Link
							className="p-3 rounded-md bg-[var(--color-greenSLight)]"
							href={`/list/results?studentId=${"student2"}`}
						>
							Kết quả học tập
						</Link>
					</div>
				</div>
				<Performance />
				<Announcement />
			</div>
		</div>
	);
};

export default SingleStudentPage;
