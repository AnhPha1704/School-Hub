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
    <div className="h-screen flex gap-3 p-3 bg-white">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-3 rounded-2xl bg-[#f7f7f7]">
        <Link href="/" className="flex items-center lg:justify-start gap-2">
          <Image src="/logo256.png" alt="logo" width={64} height={64} />
          <span className="hidden lg:block font-bold text-lg">School Hub</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] rounded-2xl bg-[#f7f7f7] overflow-y-scroll flex flex-col">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
