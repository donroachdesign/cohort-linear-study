'use client';

import { useState, type ReactNode } from 'react';
import { Users, DollarSign, ExternalLink, CheckCircle2, Target, Undo2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { CourseHeader } from './CourseHeader';
import {
  grossRevenue,
  refunds,
  netRevenue,
  platformFee,
  payoutAmount,
  refundRate,
  conversionRate,
  type OpenCourseData,
  type Transaction,
} from '@/lib/data';

interface OpenViewProps {
  course: OpenCourseData;
  switcher?: ReactNode;
}

function RevenueChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-control border border-border bg-surface px-2 py-1">
      <span className="text-xs tabular-nums text-text-primary">${payload[0].value.toLocaleString()}</span>
    </div>
  );
}

function RevenueChart({ data }: { data: OpenCourseData['weeklyRevenue'] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a0add" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#5a0add" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={v => `$${Math.round(v / 1000)}k`}
          tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<RevenueChartTooltip />} cursor={{ fill: 'var(--color-surface)' }} />
        <Bar dataKey="revenue" fill="url(#revenueBarGradient)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: typeof Users; label: string; value: string; sub: string }) {
  return (
    <Card>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-text-secondary">
          <Icon size={14} />
          <span className="text-xs">{label}</span>
        </div>
        <span className="text-2xl font-medium text-text-primary">{value}</span>
        <span className="text-xs text-text-secondary">{sub}</span>
      </div>
    </Card>
  );
}

function BreakdownRow({ label, value, muted, strong }: { label: string; value: string; muted?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-text-secondary">{label}</span>
      <span className={`text-[13px] tabular-nums ${strong ? 'font-semibold text-text-primary' : muted ? 'text-text-secondary' : 'text-text-primary'}`}>
        {value}
      </span>
    </div>
  );
}

function transactionRowClass(t: Transaction) {
  return t.status === 'refunded' ? 'text-tag-coral' : 'text-text-primary';
}

export function OpenView({ course, switcher }: OpenViewProps) {
  const [isPauseOpen, setIsPauseOpen] = useState(false);

  return (
    <>
      <CourseHeader
        state="open"
        title={course.title}
        instructor={course.instructor}
        meta={`Open since ${course.openedOn}`}
        rating={{ value: course.combinedRating, count: course.combinedRatingCount }}
        bannerHeading="Open for enrollment"
        bannerDescription={`Live since ${course.openedOn} · public enrollment at $${course.price}/seat`}
        switcher={switcher}
        actions={
          <>
            <Button variant="secondary" icon={<ExternalLink size={13} />}>
              View public page
            </Button>
            <Button variant="secondary">Edit pricing</Button>
            <Button variant="ghost" onClick={() => setIsPauseOpen(true)}>
              Pause enrollment
            </Button>
          </>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard icon={Users} label="Enrolled" value={String(course.enrolledCount)} sub={`+${course.weeklyDelta} this week`} />
            <StatCard
              icon={DollarSign}
              label="Net revenue"
              value={`$${netRevenue(course).toLocaleString()}`}
              sub={`${course.refundedCount} refunds deducted`}
            />
            <StatCard
              icon={Target}
              label="Conversion rate"
              value={`${conversionRate(course).toFixed(1)}%`}
              sub={`${course.enrolledCount} of ${course.landingPageVisitors.toLocaleString()} visitors`}
            />
            <StatCard
              icon={CheckCircle2}
              label="Completion rate"
              value={`${Math.round(course.completionRate * 100)}%`}
              sub="of enrolled students"
            />
            <StatCard
              icon={Undo2}
              label="Refund rate"
              value={`${refundRate(course).toFixed(1)}%`}
              sub={`${course.refundedCount} of ${course.enrolledCount} enrollments`}
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <Card>
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-medium text-text-primary">Revenue, last 8 weeks</h4>
                  <RevenueChart data={course.weeklyRevenue} />
                </div>
              </Card>
            </div>
            <div className="lg:w-[320px]">
              <Card>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-text-primary">Revenue breakdown</h4>
                  <div className="divide-y divide-border">
                    <BreakdownRow label="Gross revenue" value={`$${grossRevenue(course).toLocaleString()}`} />
                    <BreakdownRow label="Refunds" value={`−$${refunds(course).toLocaleString()}`} muted />
                    <BreakdownRow
                      label={`Platform fee (${Math.round(course.platformFeeRate * 100)}%)`}
                      value={`−$${platformFee(course).toLocaleString()}`}
                      muted
                    />
                    <BreakdownRow label="Your payout" value={`$${payoutAmount(course).toLocaleString()}`} strong />
                    <BreakdownRow label="Schedule" value={course.payoutSchedule} muted />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <Card padding={0}>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">Recent enrollments</h4>
                    <p className="text-xs text-text-secondary">
                      Showing {course.transactions.length} of {course.enrolledCount} enrollments
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Export CSV
                  </Button>
                </div>
                <div className="border-t border-border">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-border bg-surface text-xs text-text-secondary">
                        <th className="px-4 py-2 font-medium">Student</th>
                        <th className="px-4 py-2 font-medium">Enrolled</th>
                        <th className="px-4 py-2 font-medium">Amount</th>
                        <th className="px-4 py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.transactions.map(t => (
                        <tr key={t.id} className="border-b border-border last:border-0 hover:bg-surface">
                          <td className="flex items-center gap-2 px-4 py-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-on-accent">
                              {t.student.split(' ').map(p => p[0]).join('').slice(0, 2)}
                            </span>
                            <span className="text-text-primary">{t.student}</span>
                          </td>
                          <td className="px-4 py-2 text-text-secondary">{t.enrolledOn}</td>
                          <td className="px-4 py-2 tabular-nums text-text-primary">${t.amount}</td>
                          <td className={`px-4 py-2 ${transactionRowClass(t)}`}>
                            {t.status === 'refunded' ? 'Refunded' : 'Paid'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <div className="lg:w-[320px]">
              <Card>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium text-text-primary">Why students refunded</h4>
                  <div className="divide-y divide-border">
                    {course.refundReasons.map(r => (
                      <div key={r.id} className="flex items-center justify-between py-1.5">
                        <span className="text-[13px] text-text-primary">{r.reason}</span>
                        <span className="text-xs text-text-secondary">{r.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isPauseOpen}
        onClose={() => setIsPauseOpen(false)}
        title="Pause enrollment?"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsPauseOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsPauseOpen(false)}>
              Pause enrollment
            </Button>
          </div>
        }
      >
        <p className="text-[13px] text-text-secondary">
          New students won&rsquo;t be able to enroll until you resume. Existing students keep full access.
        </p>
      </Modal>
    </>
  );
}
