import Image from "next/image";
import AttendanceChart from "./attendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
	const today = new Date();
	const dayOfWeek = today.getDay();
	const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

	const lastMonday = new Date(today);

	lastMonday.setDate(today.getDate() - daysSinceMonday);

	const resData = await prisma.attendance.findMany({
		where: {
			date: {
				gte: lastMonday,
			},
		},
		select: {
			date: true,
			present: true,
		},
	});

	const daysOfWeek = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];

	const attendanceMap: {
		[key: string]: { present: number; absent: number };
	} = {
		"Th 2": { present: 0, absent: 0 },
		"Th 3": { present: 0, absent: 0 },
		"Th 4": { present: 10, absent: 0 },
		"Th 5": { present: 0, absent: 0 },
		"Th 6": { present: 0, absent: 0 },
		"Th 7": { present: 0, absent: 0 },
	};

	resData.forEach((item) => {
		const itemDate = new Date(item.date);
		const dayOfWeek = itemDate.getDay();

		if (dayOfWeek >= 1 && dayOfWeek <= 5) {
			const dayName = daysOfWeek[dayOfWeek - 1];

			if (item.present) {
				attendanceMap[dayName].present += 1;
			} else {
				attendanceMap[dayName].absent += 1;
			}
		}
	});

	const data = daysOfWeek.map((day) => ({
		name: day,
		"Có mặt": attendanceMap[day].present,
		Vắng: attendanceMap[day].absent,
	}));

	return (
		<div className="bg-white rounded-2xl border-1 border-gray-200 p-4 h-full">
			<div className="flex justify-between items-center">
				<h1 className="text-lg font-semibold">Điểm danh</h1>
				<Image src="/moreDark.png" alt="" width={20} height={20} />
			</div>
			<AttendanceChart data={data} />
		</div>
	);
};

export default AttendanceChartContainer;
