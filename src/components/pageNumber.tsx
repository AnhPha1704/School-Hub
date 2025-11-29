"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageNumber = ({ page, count }: { page: number; count: number }) => {
	const router = useRouter();

	const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
	const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

	const changePage = (newPage: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set("page", newPage.toString());
		router.push(`${window.location.pathname}?${params}`);
	};
	return (
		<div className="p-4 flex items-center justify-around text-gray-200">
			<button
				aria-label="arrow left"
				disabled={!hasPrev}
				className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--color-greenLight)] disabled:opacity-60 disabled:cursor-not-allowed"
				onClick={() => {
					changePage(page - 1);
				}}
			>
				<Image src="/arrow-left.png" alt="" width={14} height={14} />
			</button>
			<div className="flex items-center gap-2 text-sm text-gray-600">
				{Array.from(
					{ length: Math.ceil(count / ITEM_PER_PAGE) },
					(_, index) => {
						const pageIndex = index + 1;
						return (
							<button
								key={pageIndex}
								className={`px-2 rounded-md ${
									page === pageIndex
										? "bg-[var(--color-yellow)]"
										: ""
								}`}
								onClick={() => {
									changePage(pageIndex);
								}}
							>
								{pageIndex}
							</button>
						);
					}
				)}
			</div>
			<button
				aria-label="arrow right"
				disabled={!hasNext}
				className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--color-greenLight)] disabled:opacity-40 disabled:cursor-not-allowed"
				onClick={() => {
					changePage(page + 1);
				}}
			>
				<Image src="/arrow-right.png" alt="" width={14} height={14} />
			</button>
		</div>
	);
};

export default PageNumber;
