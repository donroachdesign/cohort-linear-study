import type { ReactNode } from 'react';
import { LayoutDashboard, Users, Wallet, Settings, Plus } from 'lucide-react';
import { AccountMenu } from './AccountMenu';
import { ThemeToggle } from './ThemeToggle';
import { StatusIcon } from './StatusIcon';
import type { CourseState } from '@/lib/data';

function NavItem({ icon: Icon, label, selected }: { icon: typeof LayoutDashboard; label: string; selected?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-control px-2 py-1.5 text-[13px] ${
        selected ? 'bg-surface text-text-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'
      }`}
    >
      <Icon size={15} />
      <span className="flex-1 truncate">{label}</span>
    </div>
  );
}

function CourseNavItem({ title, state }: { title: string; state: CourseState }) {
  return (
    <div className="flex items-center gap-2 rounded-control px-2 py-1.5 text-[13px] text-text-secondary hover:bg-surface hover:text-text-primary">
      <StatusIcon state={state} size={13} />
      <span className="flex-1 truncate">{title}</span>
    </div>
  );
}

function NavSection({ title, endContent, children }: { title: string; endContent?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-[11px] font-medium uppercase tracking-wide text-text-secondary/70">{title}</span>
        {endContent}
      </div>
      {children}
    </div>
  );
}

export function AppShell({
  children,
  currentCourseTitle,
  currentCourseState,
  otherCourses,
}: {
  children: ReactNode;
  currentCourseTitle: string;
  currentCourseState: CourseState;
  otherCourses: { title: string }[];
}) {
  return (
    <div className="flex h-screen flex-col bg-canvas text-text-primary">
      <header className="flex h-12 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-control border border-white/10 bg-[#5a0add]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, plain public/ asset */}
            <img src="/cohort-infinity.png" alt="" className="h-5 w-5 object-contain" />
          </div>
          <span className="text-sm font-medium">Cohort</span>
          <span className="text-xs text-text-secondary">for Instructors</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu name="Priya Desai" lastLogin="Aug 20, 2026 · 9:14 AM" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="flex w-56 flex-col gap-4 overflow-y-auto border-r border-border p-3">
          <NavSection title="Overview">
            <NavItem icon={LayoutDashboard} label="Dashboard" />
          </NavSection>

          <NavSection
            title="Courses"
            endContent={
              <button
                type="button"
                disabled
                title="Add new course"
                className="cursor-not-allowed rounded-control p-0.5 text-text-secondary/50"
              >
                <Plus size={13} />
              </button>
            }
          >
            <div className="flex items-center gap-2 rounded-control bg-surface px-2 py-1.5 text-[13px] text-text-primary">
              <StatusIcon state={currentCourseState} size={13} />
              <span className="flex-1 truncate">{currentCourseTitle}</span>
            </div>
            {otherCourses.map(c => (
              <CourseNavItem key={c.title} title={c.title} state="beta" />
            ))}
          </NavSection>

          <NavSection title="Business">
            <NavItem icon={Users} label="Students" />
            <NavItem icon={Wallet} label="Payouts" />
          </NavSection>

          <NavSection title="Account">
            <NavItem icon={Settings} label="Settings" />
          </NavSection>
        </nav>

        <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
