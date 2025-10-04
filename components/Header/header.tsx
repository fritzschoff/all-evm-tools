import Link from "next/link";
import HeaderClient from "./header-client";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <h1>All EVM Tools</h1>
      <nav>
        <ul>
          <Link href="/">Home</Link>
          <HeaderClient />
        </ul>
      </nav>
    </div>
  );
}
