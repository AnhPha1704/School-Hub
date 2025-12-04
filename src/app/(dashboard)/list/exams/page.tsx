import FormModal from "@/components/formModal";
import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import {
	Class,
	Exam,
	Prisma,
	Subject,
	Teacher,
} from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthData } from "@/lib/utils";
import Image from "next/image";

type ExamList = Exam & {
	lesson: {
		subject: Subject;
		class: Class;
		teacher: Teacher;
	};
};

const ExamListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const { role, currentUserId } = await getAuthData();
	const { page, ...queryParams } = searchParams;

	const p = page ? parseInt(page) : 1;

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
			header: "Ngày",
			accessor: "Date",
			className: "hidden md:table-cell",
		},
		...(role === "admin" || role === "teacher"
			? [
					{
						header: "Hành động",
						accessor: "actions",
					},
			  ]
			: []),
	];

	const renderRow = (item: ExamList) => (
		<tr
			key={item.id}
			className="border border-gray-200 even:bg-slate-50 text-sm hover:bg-teal-50"
		>
			<td className="flex items-center gap-4 p-4">
				{item.lesson.subject.name}
			</td>
			<td>{item.lesson.class.name}</td>
			<td className="hidden md:table-cell">
				{item.lesson.teacher.name + " " + item.lesson.teacher.surname}
			</td>
			<td className="hidden md:table-cell">
				{new Intl.DateTimeFormat("en-US").format(item.startTime)}
			</td>
			<td>
				<div className="flex items-center gap-2">
					{(role === "admin" || role === "teacher") && (
						<>
							<FormModal
								table="subject"
								type="update"
								data={item}
							/>
							<FormModal
								table="subject"
								type="delete"
								id={item.id}
							/>
						</>
					)}
				</div>
			</td>
		</tr>
	);
	// URL PARAMS CONDITION
	const query: Prisma.ExamWhereInput = {};

	query.lesson = {};
	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "classId":
						query.lesson.classId = parseInt(value);
						break;
					case "teacherId":
						query.lesson.teacherId = value;
						break;
					case "search":
						query.lesson.subject = {
							name: { contains: value, mode: "insensitive" },
						};
						break;
					default:
						break;
				}
			}
		}
	}

	// ROLE CONDITIONS
	switch (role) {
		case "admin":
			break;
		case "teacher":
			query.lesson.teacherId = currentUserId!;
			break;
		case "student":
			query.lesson.class = { students: { some: { id: currentUserId! } } };
			break;

		default:
			break;
	}

	const [data, count] = await prisma.$transaction([
		prisma.exam.findMany({
			where: query,
			include: {
				lesson: {
					select: {
						subject: { select: { name: true } },
						teacher: { select: { name: true, surname: true } },
						class: { select: { name: true } },
					},
				},
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.exam.count({ where: query }),
	]);

	return (
		<div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					Tất cả kì thi
				</h1>
				<div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
					<TableSearch />
					<div className="flex items-center gap-4 self-end">
						<button
							aria-label="filter"
							className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-yellow)]"
						>
							<Image
								src="/filter.png"
								alt=""
								width={14}
								height={14}
							/>
						</button>
						<button
							aria-label="sort"
							className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-yellow)]"
						>
							<Image
								src="/sort.png"
								alt=""
								width={14}
								height={14}
							/>
						</button>
						{(role === "admin" || role === "teacher") && (
							<FormModal table="student" type="create" />
						)}
					</div>
				</div>
			</div>
			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={data} />
			{/* PAGENUMBER */}
			<PageNumber page={p} count={count} />
		</div>
	);
};

export default ExamListPage;
