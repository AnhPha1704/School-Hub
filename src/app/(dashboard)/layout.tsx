import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import NavBar from "@/components/navBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-white">
        <Link href="/" className="flex items-center lg:justify-start gap-2">
          <Image src="/logo256.png" alt="logo" width={60} height={60} />
          <span className="hidden lg:block font-bold">Quản Lý Học Tập</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll">
        <NavBar/>
        {children}
      </div>
    </div>
  );
}
