'use client';

import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Divider } from './ui/Divider';
import type { betaCourse } from '@/lib/data';

interface PromoteDialogProps {
  course: typeof betaCourse;
  price: number | null;
  onPriceChange: (value: number | null) => void;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function PromoteDialog({ course, price, onPriceChange, isOpen, onClose, onConfirm }: PromoteDialogProps) {
  const [reviewedFeedback, setReviewedFeedback] = useState(false);
  const [understandsIrreversible, setUnderstandsIrreversible] = useState(false);

  const priceIsSet = price !== null && price > 0;
  const canPublish = priceIsSet && reviewedFeedback && understandsIrreversible;

  function handlePublish() {
    if (!canPublish) return;
    onConfirm();
    setReviewedFeedback(false);
    setUnderstandsIrreversible(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Promote to Open enrollment"
      subtitle={course.title}
      width={520}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!canPublish}
            title={
              !canPublish
                ? !priceIsSet
                  ? 'Set a price before publishing'
                  : "Check both boxes to confirm you've reviewed the consequences"
                : undefined
            }
            onClick={handlePublish}
          >
            Publish course
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h5 className="text-[13px] font-medium text-text-primary">What happens when you publish</h5>
          <ul className="list-disc pl-4 text-[13px] text-text-secondary">
            <li>
              {priceIsSet
                ? `Public enrollment opens immediately at $${price}/seat`
                : 'Public enrollment opens immediately at the price you set below'}
            </li>
            <li>Your {course.invitedCount} beta students keep free lifetime access</li>
            <li>The curriculum stays locked, as it&rsquo;s been throughout Beta</li>
            <li>
              Your public rating starts at {course.avgRating}★ from {course.ratingCount} beta ratings — visible on
              your profile immediately
            </li>
          </ul>
        </div>

        <div className="rounded-container border border-tag-coral/25 bg-tag-coral/[0.06] p-3">
          <p className="text-[13px] font-medium text-text-primary">
            {course.lowRatedCount} of {course.invitedCount} beta students rated below 4 stars
          </p>
          <p className="mt-0.5 text-xs text-text-secondary">
            Worth a read before this goes public — their feedback is what future students will echo first.
          </p>
        </div>

        <Divider />

        <div className="flex flex-col gap-2">
          <h5 className="text-[13px] font-medium text-text-primary">Price</h5>
          <p className="text-xs text-text-secondary">What public students pay per seat once this publishes.</p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-secondary">$</span>
            <input
              aria-label="Price per seat"
              type="number"
              min={0}
              step={1}
              value={price ?? ''}
              onChange={e => onPriceChange(e.target.value === '' ? null : Number(e.target.value))}
              placeholder="0.00"
              className="w-20 rounded-control border border-border bg-transparent px-1.5 py-0.5 text-[13px] text-text-primary outline-none"
            />
          </div>
        </div>

        <Divider />

        <div className="flex flex-col gap-2.5">
          <h5 className="text-[13px] font-medium text-text-primary">Confirm before publishing</h5>
          <label className="flex items-center gap-2 text-[13px] text-text-primary">
            <input
              type="checkbox"
              checked={reviewedFeedback}
              onChange={e => setReviewedFeedback(e.target.checked)}
              className="h-3.5 w-3.5 accent-[var(--color-accent)]"
            />
            I&rsquo;ve reviewed the cohort feedback
          </label>
          <label className="flex items-center gap-2 text-[13px] text-text-primary">
            <input
              type="checkbox"
              checked={understandsIrreversible}
              onChange={e => setUnderstandsIrreversible(e.target.checked)}
              className="h-3.5 w-3.5 accent-[var(--color-accent)]"
            />
            I understand this opens public enrollment immediately and can&rsquo;t be undone
          </label>
        </div>
      </div>
    </Modal>
  );
}
