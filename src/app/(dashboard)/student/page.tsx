import Announcement from "@/components/announcement";
import BigCalendarContainer from "@/components/bigCalendarContainer";
import EventCalendar from "@/components/eventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
	const { userId } = await auth();

	const classItem = await prisma.class.findMany({
		where: {
			students: { some: { id: userId! } },
		},
	});
	return (
		<div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
			{/* LEFT */}
			<div className="w-full xl:w-2/3">
				<div className="h-[900px] bg-white p-4 rounded-2xl">
					<h1 className="text-xl font-semibold">
						Thời khoá biểu (4A)
					</h1>
					<BigCalendarContainer type="classId" id={classItem[0].id} />
				</div>
			</div>
			{/* RIGHT */}
			<div className="w-full lg:w-1/3 flex flex-col gap-6">
				<EventCalendar />
				<Announcement />
			</div>
		</div>
	);
};

export default StudentPage;
