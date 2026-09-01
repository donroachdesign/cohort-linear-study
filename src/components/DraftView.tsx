'use client';

import { useState, type ReactNode, type KeyboardEvent } from 'react';
import { GripVertical, Pencil, Plus, Circle, Check, Clock, X } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { Divider } from './ui/Divider';
import { Modal } from './ui/Modal';
import { CourseHeader } from './CourseHeader';
import type { pfbDraft } from '@/lib/data';

interface DraftViewProps {
  course: typeof pfbDraft;
  switcher?: ReactNode;
}

export function DraftView({ course, switcher }: DraftViewProps) {
  const allRecorded = course.recordedLessons === course.totalLessons;
  const curriculumFinalized = allRecorded;
  const [invitees, setInvitees] = useState<string[]>([]);
  const [inviteDraft, setInviteDraft] = useState('');
  const [isInviteListOpen, setIsInviteListOpen] = useState(false);

  const hasInvitees = invitees.length > 0;
  const readyForBeta = allRecorded && hasInvitees;
  const missing = [!allRecorded && 'record all lessons', !hasInvitees && 'add beta invitees'].filter(
    Boolean
  ) as string[];

  function addInvitee(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || !inviteDraft.trim()) return;
    setInvitees(prev => [...prev, inviteDraft.trim()]);
    setInviteDraft('');
  }

  return (
    <>
      <CourseHeader
        state="draft"
        title={course.title}
        instructor={course.instructor}
        meta={`Created ${course.createdOn} · Edited ${course.lastEdited}`}
        bannerHeading="In Draft"
        bannerDescription={`${course.recordedLessons} of ${course.totalLessons} lessons recorded · not visible to students yet`}
        switcher={switcher}
        actions={
          <Button variant="secondary" disabled={!readyForBeta} title={!readyForBeta ? `Still needed: ${missing.join(', ')}` : undefined}>
            Invite beta cohort
          </Button>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-text-primary">Curriculum</h3>
                <p className="text-xs text-text-secondary">
                  {course.modules.length} modules · {course.totalLessons} lessons
                </p>
              </div>
              <Button variant="secondary" size="sm" icon={<Plus size={13} />}>
                Add module
              </Button>
            </div>

            {course.modules.map(module => {
              const done = module.lessons.filter(l => l.isRecorded).length;
              return (
                <Card key={module.id} padding={4}>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[13px] font-medium text-text-primary">{module.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary">
                          {done}/{module.lessons.length} recorded
                        </span>
                        <Button variant="ghost" size="sm" icon={<Plus size={13} />}>
                          Add lesson
                        </Button>
                      </div>
                    </div>
                    <div className="divide-y divide-border">
                      {module.lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2.5">
                            <GripVertical size={13} className="text-text-secondary/50" />
                            {lesson.isRecorded ? (
                              <Check size={13} className="text-tag-green" />
                            ) : (
                              <Clock size={13} className="text-text-secondary/50" />
                            )}
                            <span className="text-[13px] text-text-primary">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {!lesson.isRecorded && (
                              <span className="rounded-control bg-tag-amber/15 px-1.5 py-0.5 text-[11px] font-medium text-tag-amber">
                                Needs video
                              </span>
                            )}
                            <button
                              type="button"
                              aria-label={`Edit ${lesson.title}`}
                              className="cursor-pointer rounded-control p-1 text-text-secondary hover:bg-canvas hover:text-text-primary"
                            >
                              <Pencil size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="w-[300px] shrink-0 overflow-y-auto border-l border-border p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-[13px] font-medium text-text-primary">Readiness</h4>
              <ProgressBar value={course.recordedLessons} max={course.totalLessons} variant={allRecorded ? 'green' : 'accent'} />
              <span className="text-xs text-text-secondary">
                {course.recordedLessons} of {course.totalLessons} lessons recorded
              </span>
            </div>

            <Divider />

            <div className="flex flex-col gap-2">
              <h5 className="text-xs font-medium text-text-primary">Ready for Beta</h5>
              <p className="text-xs text-text-secondary">Items remaining until ready for Beta</p>
              <ReadinessRow label="Curriculum outlined" done note="Done" />
              <ReadinessRow label="Course details added" done note="Done" />
              <ReadinessRow
                label="Curriculum finalized"
                done={curriculumFinalized}
                note={curriculumFinalized ? 'Locked' : 'Videos needed'}
              />
              <ReadinessRow
                label={`Beta cohort invite list${hasInvitees ? ` (${invitees.length})` : ''}`}
                done={hasInvitees}
                note={
                  <button
                    type="button"
                    onClick={() => setIsInviteListOpen(true)}
                    className="cursor-pointer text-xs text-text-secondary hover:text-text-primary hover:underline"
                  >
                    {hasInvitees ? 'Edit' : 'Add invitees'}
                  </button>
                }
              />
            </div>

            <Divider />

            <div className="flex flex-col gap-2">
              <h5 className="text-xs font-medium text-text-secondary">Before going Open</h5>
              <p className="text-xs text-text-secondary">Not required until you&rsquo;re ready for public enrollment.</p>
              <div className="flex items-center justify-between rounded-control border border-border px-2.5 py-2">
                <span className="text-[13px] text-text-primary">Price</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-text-secondary">$</span>
                  <input
                    aria-label="Price"
                    placeholder="0.00"
                    className="w-16 border-0 bg-transparent text-right text-[13px] text-text-primary outline-none placeholder:text-text-secondary/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isInviteListOpen}
        onClose={() => setIsInviteListOpen(false)}
        title="Beta cohort invite list"
        subtitle={`${invitees.length} invited so far`}
      >
        <div className="flex flex-col gap-3">
          <p className="text-[13px] text-text-secondary">
            Add the people you want to test this course for free. They&rsquo;ll get access once you invite the cohort.
          </p>
          <div className="flex flex-wrap gap-1.5 rounded-control border border-border p-2">
            {invitees.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex items-center gap-1 rounded-control bg-canvas px-2 py-1 text-xs text-text-primary"
              >
                {name}
                <button
                  type="button"
                  aria-label={`Remove ${name}`}
                  onClick={() => setInvitees(prev => prev.filter((_, idx) => idx !== i))}
                  className="cursor-pointer text-text-secondary hover:text-text-primary"
                >
                  <X size={11} />
                </button>
              </span>
            ))}
            <input
              value={inviteDraft}
              onChange={e => setInviteDraft(e.target.value)}
              onKeyDown={addInvitee}
              placeholder="Type a name or email and press Enter..."
              className="min-w-[160px] flex-1 border-0 bg-transparent p-1 text-[13px] text-text-primary outline-none placeholder:text-text-secondary/50"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

function ReadinessRow({ label, done, note }: { label: string; done: boolean; note: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-2">
        {done ? <Check size={13} className="text-tag-green" /> : <Circle size={13} className="text-text-secondary/40" />}
        <span className="text-[13px] text-text-primary">{label}</span>
      </div>
      {typeof note === 'string' ? <span className="text-xs text-text-secondary">{note}</span> : note}
    </div>
  );
}
