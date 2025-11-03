import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";

const menuItems = [
  {
    title: "Menu",
    items: [
      {
        icon: "/home.png",
        label: "Trang chủ",
        href: "/",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/teacher.png",
        label: "Giáo viên",
        href: "/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Học sinh",
        href: "/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/class.png",
        label: "Lớp",
        href: "/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/attendance.png",
        label: "Điểm danh",
        href: "/attendance",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/assignment.png",
        label: "Bài tập",
        href: "/assignments",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/result.png",
        label: "Điểm số",
        href: "/results",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/calendar.png",
        label: "Lịch",
        href: "/events",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        icon: "/profile.png",
        label: "Cá nhân",
        href: "/profile",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/setting.png",
        label: "Cài đặt",
        href: "/settings",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/logout.png",
        label: "Đăng xuất",
        href: "/logout",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
];

type MenuProps = {
  closeSidebar?: () => void;
};

const Menu = ({ closeSidebar }: MenuProps) => {
  return (
    <div className="text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="text-gray-200 font-semibold my-4">
            {section.title}
          </span>
          <div className="p-2 rounded-2xl bg-[var(--color-greenLight)]">
            {section.items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    onClick={closeSidebar}
                    className="flex items-center justify-start gap-4 text-gray-200 py-2 px-2 m-1 rounded-md hover:bg-[var(--color-greenSLight)] transition-colors"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                    <span className="p-1">{item.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
