"use client";

import Image from "next/image";

type NavBarProps = {
  onMenuClick: () => void;
};

const NavBar = ({ onMenuClick }: NavBarProps) => {
  return (
    <div className="flex items-center justify-between4 p-4">
      {/* Sidebar button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Infor */}
      <div className="flex items-center gap-6 pr-4 ml-auto">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src="/announcement.png"
            alt="Announcements"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-[var(--color-pink)] text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs leading-3 font-medium">Trần Anh Pha</span>
          <span className="text-[10px] text-gray-500">Admin</span>
        </div>
        <Image
          src="/avatar.png"
          alt="User avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default NavBar;
