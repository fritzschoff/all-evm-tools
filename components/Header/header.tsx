import Link from 'next/link';
import HeaderClient from './header-client';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
      <h1>All EVM Tools</h1>
      <nav className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <HeaderClient />
          </li>
        </ul>
      </nav>
    </div>
  );
}
