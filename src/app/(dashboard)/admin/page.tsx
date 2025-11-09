import UserCard from "@/components/userCard";
import CountChart from "@/components/countChart";
import AttendanceChart from "@/components/attendanceChart";
import EventCalendar from "@/components/eventCalendar";
import Announcement from "@/components/announcement";
import Image from "next/image";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* USERCARD */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="học sinh" />
          <UserCard type="giáo viên" />
          <UserCard type="phụ huynh" />
          <UserCard type="nhân viên" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDEANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHARTS */}
        <div className=""></div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  );
};
export default AdminPage;
