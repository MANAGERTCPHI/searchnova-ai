import Link from "next/link";
import { BarChart3, FolderKanban, History, LayoutDashboard, Search, Settings } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/research", label: "Keyword Research", icon: Search },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-[#08101c] px-4 py-6 lg:block">
        <Link href="/" className="flex items-center gap-2 px-3 text-lg font-bold tracking-tight"><span className="grid size-8 place-items-center rounded-lg bg-violet-500 text-white">S</span>SearchNova</Link>
        <nav className="mt-10 space-y-1">
          {links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"><Icon className="size-4" />{label}</Link>)}
          <Link href="/dashboard/settings" className="mt-6 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><Settings className="size-4" />Settings</Link>
        </nav>
      </aside>
      <main className="min-h-screen lg:pl-64"><div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">{children}</div></main>
    </div>
  );
}
