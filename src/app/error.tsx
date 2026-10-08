'use client';

import { useEffect } from 'react';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center mx-auto text-xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-[#1C1917]">Application Error</h2>
        <p className="text-xs text-[#78716C] leading-relaxed">
          Unable to render this section. The state has been preserved.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="w-full py-2.5 px-4 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
