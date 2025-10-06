'use client';

import React, { useEffect, useRef } from 'react';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BaseModal({
  isOpen,
  onClose,
  children,
}: BaseModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-9 flex items-center justify-center bg-black/50"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 relative min-w-[300px] max-w-full rounded-lg border border-gray-500">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-white"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
