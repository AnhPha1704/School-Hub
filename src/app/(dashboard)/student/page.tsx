import Announcement from "@/components/announcement";
import BigCalendar from "@/components/bigCalendar";
import EventCalendar from "@/components/eventCalendar";

const StudentPage = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-[900px] bg-white p-4 rounded-2xl">
          <h1 className="text-xl font-semibold">Thời khoá biểu (4A)</h1>
          <BigCalendar />
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
