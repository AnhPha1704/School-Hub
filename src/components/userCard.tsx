import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-[var(--color-green)] even:bg-[var(--color-yellow)] p-4 flex-1 min-w-[130px] odd:text-gray-200 even:text-zinc-800">
      <div className="flex justify-between items-center">
        <span className="text-[12px] bg-white px-2 py-1 rounded-full text-black">
          2025/10
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <div>
        <h1 className="text-2xl font-semibold my-4">1.324</h1>
        <h2 className="capitalize text-sm font-medium">{type}</h2>
      </div>
    </div>
  );
};

export default UserCard;
