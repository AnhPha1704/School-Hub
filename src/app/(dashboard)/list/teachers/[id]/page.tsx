import Announcement from "@/components/announcement";
import BigCalendarContainer from "@/components/bigCalendarContainer";
import FormContainer from "@/components/formContainer";
import Performance from "@/components/performance";
import { Teacher } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleTeacherPage = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const { sessionClaims } = await auth();
	const role = (sessionClaims?.metadata as { role?: string })?.role;

	const teacher:
		| (Teacher & {
				_count: { subjects: number; lessons: number; classes: number };
		  })
		| null = await prisma.teacher.findUnique({
		where: { id },
		include: {
			_count: {
				select: {
					subjects: true,
					lessons: true,
					classes: true,
				},
			},
		},
	});

	if (!teacher) {
		return notFound();
	}
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
								src={teacher.img || "/noAvatar.png"}
								alt=""
								width={144}
								height={144}
								className="w-36 h-36 rounded-full object-cover"
							/>
						</div>
						<div className="w-2/3 flex flex-col justify-between gap-4">
							<div className="flex items-center gap-4 ">
								<h1 className="text-xl text-white font-semibold">
									{teacher.name + " " + teacher.surname}
								</h1>
								{role === "admin" && (
									<FormContainer
										table="teacher"
										type="update"
										data={teacher}
									/>
								)}
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
										{teacher.position}
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
										{new Intl.DateTimeFormat(
											"en-GB"
										).format(teacher.birthday)}
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
										{teacher.email || "----"}
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
										{teacher.phone || "----"}
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
								<h1 className="text-xl font-semibold">
									{teacher._count.subjects}
								</h1>
								<span className="text-sm text-gray-600">
									Môn học
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
								<h1 className="text-xl font-semibold">
									{teacher._count.lessons}
								</h1>
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
								<h1 className="text-xl font-semibold">
									{teacher._count.classes}
								</h1>
								<span className="text-sm text-gray-600">
									Lớp học
								</span>
							</div>
						</div>
					</div>
				</div>
				{/* BOTTOM */}
				<div className="mt-4 bg-white rounded-2xl border-1 border-gray-200 p-4 h-[900px]">
					<h1>Lịch trình giáo viên</h1>
					<BigCalendarContainer type="teacherId" id={teacher.id} />
				</div>
			</div>
			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-4">
				<div className="bg-white p-4 rounded-2xl border-1 border-gray-200">
					<h1 className="text-xl font-semibold">Lối tắt</h1>
					<div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-600">
						<Link
							className="p-3 rounded-md bg-[#f2f1ff]"
							href={`/list/classes?supervisorId=${"teacher2"}`}
						>
							Lớp học phụ trách
						</Link>
						<Link
							className="p-3 rounded-md bg-[var(--color-yellowLight)]"
							href={`/list/students?teacherId=${"teacher2"}`}
						>
							Học sinh phụ trách
						</Link>
						<Link
							className="p-3 rounded-md bg-[#e2f8ff]"
							href={`/list/lessons?teacherId=${"teacher2"}`}
						>
							Tiết học phụ trách
						</Link>
						<Link
							className="p-3 rounded-md bg-[#fdf2fb]"
							href={`/list/exams?teacherId=${"teacher2"}`}
						>
							Kì thi phụ trách
						</Link>
						<Link
							className="p-3 rounded-md bg-[var(--color-greenSLight)]"
							href={`/list/assignments?teacherId=${"teacher2"}`}
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
