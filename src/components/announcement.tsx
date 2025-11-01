import Image from "next/image";

const Announcement = () => {
  return (
    <div className="bg-white p-4 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Thông báo</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-[var(--color-boyC)] rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-600 bg-white rounded-md px-1 py-1">
              01-01-2005
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
            labore!
          </p>
        </div>
        <div className="bg-[var(--color-girlC)] rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-600 bg-white rounded-md px-1 py-1">
              01-01-2005
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
            labore!
          </p>
        </div>
        <div className="bg-[var(--color-yellow)] rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-600 bg-white rounded-md px-1 py-1">
              01-01-2005
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
            labore!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
