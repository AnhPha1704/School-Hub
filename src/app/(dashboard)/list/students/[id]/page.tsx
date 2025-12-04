import Announcement from "@/components/announcement";
import BigCalendarContainer from "@/components/bigCalendarContainer";
import FormContainer from "@/components/formContainer";
import Performance from "@/components/performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import { Class, Student } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SingleStudentPage = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const { sessionClaims } = await auth();
	const role = (sessionClaims?.metadata as { role?: string })?.role;

	const student:
		| (Student & {
				class: Class & { _count: { lessons: number } };
		  })
		| null = await prisma.student.findUnique({
		where: { id },
		include: {
			class: { include: { _count: { select: { lessons: true } } } },
		},
	});

	if (!student) {
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
						<div className="w-1/3 flex justify-center">
							<Image
								src={student.img || "/noAvatar.png"}
								alt=""
								width={144}
								height={144}
								className="w-30 h-30 rounded-full object-cover"
							/>
						</div>
						<div className="w-2/3 flex flex-col justify-between gap-4">
							<div className="flex items-center gap-4 ">
								<h1 className="text-xl text-white font-semibold">
									{student.name + " " + student.surname}
								</h1>
								{role === "admin" && (
									<FormContainer
										table="student"
										type="update"
										data={student}
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
										{student.position}
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
										).format(student.birthday)}
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
										{student.email || "----"}
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
										{student.phone || "----"}
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
							<Suspense fallback="loading...">
								<StudentAttendanceCard id={student.id} />
							</Suspense>
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
									{student.class.name.charAt(0)}
								</h1>
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
								<h1 className="text-xl font-semibold">
									{student.class._count.lessons}
								</h1>
								<span className="text-sm text-gray-600">
									Tiết học
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
									{student.class.name}
								</h1>
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
					<BigCalendarContainer
						type="classId"
						id={student.class.id}
					/>
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
