import UserCard from "@/components/userCard";
import Announcement from "@/components/announcement";
import CountChartContainer from "@/components/countChartContainer";
import AttendanceChartContainer from "@/components/attendanceChartContainer";
import EventCalendarContainer from "@/components/eventCalendarContainer";

const AdminPage = async ({
	searchParams,
}: {
	searchParams: { [keys: string]: string | undefined };
}) => {
	return (
		<div className="p-4 flex gap-4 flex-col md:flex-row">
			{/* LEFT */}
			<div className="w-full lg:w-2/3 flex flex-col gap-6">
				{/* USERCARD */}
				<div className="flex gap-4 justify-between flex-wrap">
					<UserCard type="quản trị viên" />
					<UserCard type="giáo viên" />
					<UserCard type="học sinh" />
					<UserCard type="kì thi" />
				</div>
				{/* MIDDLE CHARTS */}
				<div className="flex gap-4 flex-col lg:flex-row">
					{/* COUNT CHART */}
					<div className="w-full lg:w-1/3 h-[450px]">
						<CountChartContainer />
					</div>
					{/* ATTENDEANCE CHART */}
					<div className="w-full lg:w-2/3 h-[450px]">
						<AttendanceChartContainer />
					</div>
				</div>
				{/* BOTTOM CHARTS */}
				<div className=""></div>
			</div>
			{/* RIGHT */}
			<div className="w-full lg:w-1/3 flex flex-col gap-6">
				<EventCalendarContainer searchParams={searchParams} />
				<Announcement />
			</div>
		</div>
	);
};
export default AdminPage;
