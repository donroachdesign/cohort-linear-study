import { Users, TriangleAlert } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { CourseHeader } from './CourseHeader';
import type { ReactNode } from 'react';
import type { betaCourse, CohortStudent } from '@/lib/data';

interface BetaViewProps {
  course: typeof betaCourse;
  onPromote: () => void;
  switcher?: ReactNode;
}

function statusLabel(student: CohortStudent) {
  if (student.status === 'stalled') return `Stalled at ${student.stalledAt}`;
  if (student.status === 'completed') return 'Completed';
  return 'In progress';
}

export function BetaView({ course, onPromote, switcher }: BetaViewProps) {
  const completedCount = course.roster.filter(s => s.status === 'completed').length;

  return (
    <>
      <CourseHeader
        state="beta"
        title={course.title}
        instructor={course.instructor}
        meta={`${course.invitedCount} students invited · started ${course.startedOn}`}
        rating={{ value: course.avgRating, count: course.ratingCount, note: 'non-public beta rating' }}
        bannerHeading="In Beta"
        bannerDescription={`Day ${course.daysElapsed} of a suggested ${course.suggestedDurationDays} · ${course.invitedCount} invited students, free access`}
        switcher={switcher}
        actions={
          <Button variant="secondary" onClick={onPromote}>
            Promote to Open
          </Button>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[260px] shrink-0 border-r border-border p-6">
          <div className="flex flex-col gap-2">
            <h4 className="text-[13px] font-medium text-text-primary">Pricing</h4>
            <p className="text-xs text-text-secondary">What public students pay per seat once you promote to Open.</p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-text-secondary">$</span>
              <span className="text-[13px] text-text-primary">{course.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Users size={14} />
                    <span className="text-xs">Beta cohort</span>
                  </div>
                  <span className="text-2xl font-medium text-text-primary">{course.invitedCount}</span>
                  <span className="text-xs text-text-secondary">
                    invited · day {course.daysElapsed} of {course.suggestedDurationDays}
                  </span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-text-secondary">Completion rate</span>
                  <span className="text-2xl font-medium text-text-primary">
                    {Math.round(course.completionRate * 100)}%
                  </span>
                  <ProgressBar value={Math.round(course.completionRate * 100)} max={100} />
                  <span className="text-xs text-text-secondary">
                    {completedCount} of {course.invitedCount} completed
                  </span>
                </div>
              </Card>

              <Card tint="coral">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-tag-coral">
                    <TriangleAlert size={14} />
                    <span className="text-xs text-text-secondary">Drop-off hotspot</span>
                  </div>
                  <span className="text-2xl font-medium text-text-primary">{course.dropOffPercent}%</span>
                  <span className="text-xs text-text-secondary">stall at {course.dropOffLesson}</span>
                </div>
              </Card>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-text-primary">Cohort roster</h4>
              <div className="overflow-hidden rounded-container border border-border">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-border bg-surface text-xs text-text-secondary">
                      <th className="px-3 py-2 font-medium">Student</th>
                      <th className="px-3 py-2 font-medium">Progress</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Last active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.roster.map(student => (
                      <tr key={student.id} className="border-b border-border last:border-0 hover:bg-surface">
                        <td className="px-3 py-2 text-text-primary">{student.name}</td>
                        <td className="px-3 py-2 tabular-nums text-text-primary">{student.progress}%</td>
                        <td className="px-3 py-2 text-text-secondary">{statusLabel(student)}</td>
                        <td className="px-3 py-2 text-text-secondary">{student.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <span className="text-xs text-text-secondary">Showing 10 of {course.invitedCount} invited students</span>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-text-primary">Student feedback</h4>
              <div className="divide-y divide-border rounded-container border border-border">
                {course.feedback.map(item => (
                  <div key={item.id} className="flex flex-col gap-0.5 px-3 py-2.5">
                    <span className="text-[13px] font-medium text-text-primary">
                      {item.author} · {item.rating}★
                    </span>
                    <span className="text-xs text-text-secondary">{item.quote}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
