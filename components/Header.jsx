import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <nav className="p-5 bg-slate-50">
      <div className="flex items-center justify-center gap-1.5">
        <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-600 rounded-sm">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <Link href="/" className="font-semibold">
          <div>
            <h3 className="text-xl font-bold">Privacy Policy Generator</h3>
          </div>
        </Link>
      </div>
    </nav>
  );
}
