import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sun } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-amber-400 rounded-xl">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-amber-600">날씨앱</span>
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
