import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-red-400 text-white flex flex-row gap-4 p-4 justify-center">
      <Link href="/admin">Admin</Link>
      <Link href="/student">Student</Link>
      <Link href="/teacher">Teacher</Link>
    </div>
  );
};

export default Page;
