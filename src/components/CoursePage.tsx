'use client';

import { useState } from 'react';
import { AppShell } from './AppShell';
import { DraftView } from './DraftView';
import { BetaView } from './BetaView';
import { OpenView } from './OpenView';
import { PromoteDialog } from './PromoteDialog';
import { CourseStateSwitcher } from './CourseStateSwitcher';
import { pfbDraft, pfbBeta, pfbOpen, betaCourse, optionsBeta, type CourseState } from '@/lib/data';

export function CoursePage() {
  const [pfbState, setPfbState] = useState<CourseState>('draft');
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [betaPrice, setBetaPrice] = useState<number | null>(pfbBeta.price);

  const currentTitle = pfbState === 'draft' ? pfbDraft.title : pfbState === 'beta' ? pfbBeta.title : pfbOpen.title;

  return (
    <AppShell
      currentCourseTitle={currentTitle}
      currentCourseState={pfbState}
      otherCourses={[{ title: betaCourse.title }, { title: optionsBeta.title }]}
    >
      {pfbState === 'draft' && (
        <DraftView course={pfbDraft} switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} />} />
      )}
      {pfbState === 'beta' && (
        <BetaView
          course={pfbBeta}
          onPromote={() => setIsPromoteOpen(true)}
          switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} />}
        />
      )}
      {pfbState === 'open' && (
        <OpenView course={pfbOpen} switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} />} />
      )}

      <PromoteDialog
        course={pfbBeta}
        price={betaPrice}
        onPriceChange={setBetaPrice}
        isOpen={isPromoteOpen}
        onClose={() => setIsPromoteOpen(false)}
        onConfirm={() => {
          setPfbState('open');
          setIsPromoteOpen(false);
        }}
      />
    </AppShell>
  );
}
