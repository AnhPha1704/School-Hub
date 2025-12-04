import Image from "next/image";
import EventCalendar from "./eventCalendar";
import EventList from "./eventList";

const EventCalendarContainer = async ({
	searchParams,
}: {
	searchParams: { [keys: string]: string | undefined };
}) => {
	const { date } = searchParams;
	return (
		<div className="bg-white p-4 rounded-2xl border-1 border-gray-200">
			<EventCalendar />

			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold my-4">Sự kiện</h1>
				<Image src="/moreDark.png" alt="" width={20} height={20} />
			</div>
			<div className="flex flex-col gap-4">
				<EventList dateParam={date} />
			</div>
		</div>
	);
};

export default EventCalendarContainer;
