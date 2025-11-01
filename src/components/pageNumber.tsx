import Image from "next/image";

const PageNumber = () => {
  return (
    <div className="p-4 flex items-center justify-around text-gray-500">
      <button
        disabled
        className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--color-boyC)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Image src="/arrow-left.png" alt="" width={14} height={14} />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="px-2 rounded-sm bg-[var(--color-girlC)]">1</button>
        <button className="px-2 rounded-sm">2</button>
        <button className="px-2 rounded-sm">3</button>
        ...
        <button className="px-2 rounded-sm">10</button>
      </div>
      <button className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--color-boyC)] disabled:opacity-40 disabled:cursor-not-allowed">
        <Image src="/arrow-right.png" alt="" width={14} height={14} />
      </button>
    </div>
  );
};

export default PageNumber;
