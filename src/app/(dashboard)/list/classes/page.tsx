import FormModal from "@/components/formModal";
import PageNumber from "@/components/pageNumber";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { Class, Prisma, Teacher } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthData } from "@/lib/utils";
import Image from "next/image";

type ClassList = Class & { supervisor: Teacher };

const ClassListPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const { role, currentUserId } = await getAuthData();

	const { page, ...queryParams } = searchParams;

	const p = page ? parseInt(page) : 1;

	const columns = [
		{ header: "Thông tin lớp", accessor: "name" },
		{
			header: "Sĩ số",
			accessor: "capacity",
			className: "hidden md:table-cell",
		},
		{
			header: "Lớp",
			accessor: "grade",
			className: "hidden md:table-cell",
		},
		{
			header: "Chủ nhiệm",
			accessor: "supervisor",
			className: "hidden md:table-cell",
		},
		...(role === "admin"
			? [
					{
						header: "Hành động",
						accessor: "actions",
					},
			  ]
			: []),
	];

	const renderRow = (item: ClassList) => (
		<tr
			key={item.id}
			className="border border-gray-200 even:bg-slate-50 text-sm hover:bg-teal-50"
		>
			<td className="flex items-center gap-4 p-4">{item.name}</td>
			<td className="hidden md:table-cell">{item.capacity}</td>
			<td className="hidden md:table-cell">{item.name[0]}</td>
			<td className="hidden md:table-cell">
				{item.supervisor.name + " " + item.supervisor.surname}
			</td>
			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormModal
								table="class"
								type="update"
								data={item}
							/>
							<FormModal
								table="class"
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
	const query: Prisma.ClassWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "supervisorId":
						query.supervisorId = value;
						break;
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
		prisma.class.findMany({
			where: query,
			include: {
				supervisor: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.class.count({ where: query }),
	]);
	return (
		<div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					Tất cả các lớp học
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
							<FormModal table="class" type="create" />
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

export default ClassListPage;
