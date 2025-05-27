import Link from 'next/link';

export default function Header() {
  return (
    <nav className="navbar max-w-7xl mx-auto p-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-gray-100 font-medium mt-3 z-[1] px-2 py-3 shadow-lg border rounded-box w-52"
          >
            <li>
              <Link href="/privacy-policy-result">Last policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <Link href="/" className="font-semibold">
          <div>
            <h3 className="text-lg font-bold">starter app</h3>
          </div>
        </Link>
      </div>
    </nav>
  );
}
