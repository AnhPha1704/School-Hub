import FormModal from "@/components/formModal";
import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import {
	Class,
	Lesson,
	Prisma,
	Subject,
	Teacher,
} from "@/generated/prisma/client";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type LessonList = Lesson & { subject: Subject } & { class: Class } & {
	teacher: Teacher;
};

const columns = [
	{ header: "Thông tin tiết học", accessor: "name" },
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
		header: "Hành động",
		accessor: "actions",
	},
];

const renderRow = (item: LessonList) => (
	<tr
		key={item.id}
		className="border border-gray-200 even:bg-slate-50 text-sm hover:bg-teal-50"
	>
		<td className="flex items-center gap-4 p-4">{item.subject.name}</td>
		<td>{item.class.name}</td>
		<td className="hidden md:table-cell">
			{item.teacher.name + " " + item.teacher.surname}
		</td>
		<td>
			<div className="flex items-center gap-2">
				{role === "admin" && (
					<>
						<FormModal table="lesson" type="update" data={item} />
						<FormModal table="lesson" type="delete" id={item.id} />
					</>
				)}
			</div>
		</td>
	</tr>
);

const LessonListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const { page, ...queryParams } = searchParams;

	const p = page ? parseInt(page) : 1;

	// URL PARAMS CONDITION
	const query: Prisma.LessonWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "classId":
						query.classId = parseInt(value);
						break;
					case "teacherId":
						query.teacherId = value;
						break;
					case "search":
						query.OR = [
							{
								subject: {
									name: {
										contains: value,
										mode: "insensitive",
									},
								},
							},
							{
								teacher: {
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

	const [data, count] = await prisma.$transaction([
		prisma.lesson.findMany({
			where: query,
			include: {
				subject: { select: { name: true } },
				class: { select: { name: true } },
				teacher: { select: { name: true, surname: true } },
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.lesson.count({ where: query }),
	]);
	return (
		<div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					Tất cả các tiết học
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
							<FormModal table="lesson" type="create" />
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

export default LessonListPage;
