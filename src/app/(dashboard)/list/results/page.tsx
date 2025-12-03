import FormModal from "@/components/formModal";
import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { Prisma } from "@/generated/prisma/client";
import { resultsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type ResultList = {
	id: number;
	title: string;
	studentName: string;
	studentSurName: string;
	teacherName: string;
	teacherSurName: string;
	score: number;
	className: string;
	startTime: Date;
};

const columns = [
	{ header: "Thông tin bài tập", accessor: "title" },
	{
		header: "Học sinh",
		accessor: "student",
	},
	{
		header: "Điểm",
		accessor: "score",
		className: "hidden md:table-cell",
	},
	{
		header: "Giáo viên",
		accessor: "teacher",
		className: "hidden md:table-cell",
	},
	{
		header: "Lớp",
		accessor: "class",
		className: "hidden md:table-cell",
	},
	{
		header: "Ngày",
		accessor: "date",
		className: "hidden md:table-cell",
	},
	{
		header: "Hành động",
		accessor: "actions",
	},
];

const renderRow = (item: ResultList) => (
	<tr
		key={item.id}
		className="border border-gray-200 even:bg-slate-50 text-sm hover:bg-teal-50"
	>
		<td className="flex items-center gap-4 p-4">{item.title}</td>
		<td>{item.studentName + " " + item.studentSurName}</td>
		<td className="hidden md:table-cell">{item.score}</td>
		<td className="hidden md:table-cell">
			{item.teacherName + " " + item.teacherSurName}
		</td>
		<td className="hidden md:table-cell">{item.className}</td>
		<td className="hidden md:table-cell">
			{new Intl.DateTimeFormat("en-US").format(item.startTime)}
		</td>
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

const ResultListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const { page, ...queryParams } = searchParams;

	const p = page ? parseInt(page) : 1;

	// URL PARAMS CONDITION
	const query: Prisma.ResultWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "studentId":
						query.studentId = value;
						break;
					case "search":
						query.OR = [
							{
								exam: {
									title: {
										contains: value,
										mode: "insensitive",
									},
								},
							},
							{
								student: {
									name: {
										contains: value,
										mode: "insensitive",
									},
								},
							},
						];
						break;
					default:
						break;
				}
			}
		}
	}

	const [dataRes, count] = await prisma.$transaction([
		prisma.result.findMany({
			where: query,
			include: {
				student: { select: { name: true, surname: true } },
				exam: {
					include: {
						lesson: {
							select: {
								class: { select: { name: true } },
								teacher: {
									select: { name: true, surname: true },
								},
							},
						},
					},
				},
				assignment: {
					include: {
						lesson: {
							select: {
								class: { select: { name: true } },
								teacher: {
									select: { name: true, surname: true },
								},
							},
						},
					},
				},
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.result.count({ where: query }),
	]);

	const data = dataRes.map((item) => {
		const assessment = item.exam || item.assignment;

		if (!assessment) return null;

		const isExam = "startTime" in assessment;

		return {
			id: item.id,
			title: assessment.title,
			studentName: item.student.name,
			studentSurName: item.student.surname,
			teacherName: assessment.lesson.teacher.name,
			teacherSurName: assessment.lesson.teacher.surname,
			score: item.score,
			className: assessment.lesson.class.name,
			startTime: isExam ? assessment.startTime : assessment.startDate,
		};
	});
	return (
		<div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					Tất cả điểm số
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
						{role === "admin" && (
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

export default ResultListPage;
