import FormContainer from "@/components/formContainer";
import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { Prisma, Subject, Teacher } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthData } from "@/lib/utils";
import Image from "next/image";

type SubjectList = Subject & { teachers: Teacher[] };

const SubjectsListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const { role, currentUserId } = await getAuthData();

	const { page, ...queryParams } = searchParams;

	const p = page ? parseInt(page) : 1;

	const columns = [
		{ header: "Thông tin môn học", accessor: "name" },
		{
			header: "giáo viên",
			accessor: "teachers",
			className: "hidden md:table-cell",
		},
		{
			header: "Hành động",
			accessor: "actions",
		},
	];

	const renderRow = (item: SubjectList) => (
		<tr
			key={item.id}
			className="border border-gray-200 even:bg-slate-50 text-sm hover:bg-teal-50"
		>
			<td className="flex items-center gap-4 p-4">{item.name}</td>
			<td className="hidden md:table-cell">
				{item.teachers.map((teacher) => teacher.name).join(", ")}
			</td>
			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormContainer
								table="subject"
								type="update"
								data={item}
							/>
							<FormContainer
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
	const query: Prisma.SubjectWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.name = { contains: value, mode: "insensitive" };
						break;
					default:
						break;
				}
			}
		}
	}

	const [data, count] = await prisma.$transaction([
		prisma.subject.findMany({
			where: query,
			include: {
				teachers: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.subject.count({ where: query }),
	]);
	return (
		<div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					Tất cả các môn học
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
							<FormContainer table="subject" type="create" />
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

export default SubjectsListPage;
