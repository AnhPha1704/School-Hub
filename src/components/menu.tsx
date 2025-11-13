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
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Học sinh",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Môn học",
        href: "/list/subjects",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/class.png",
        label: "Lớp",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/attendance.png",
        label: "Điểm danh",
        href: "/list/attendance",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Kỳ thi",
        href: "/list/exams",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/assignment.png",
        label: "Bài tập",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/result.png",
        label: "Điểm số",
        href: "/list/results",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/calendar.png",
        label: "Sự kiện",
        href: "/list/events",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/announcement.png",
        label: "Thông báo",
        href: "/list/announcements",
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
        <div className="flex flex-col" key={section.title}>
          <span className="text-white text-center font-semibold m-4">
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
                    className="flex items-center justify-start gap-4 text-gray-200 py-2 px-2 m-1 rounded-xl hover:bg-[var(--color-green)] transition-colors"
                  >
                    <div className="bg-[var(--color-yellow)] p-2 rounded-xl">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                    </div>
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
