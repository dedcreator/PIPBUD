'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAFAF9] text-[#1C1917] min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-[#1C1917]">System Notice</h2>
          <p className="text-xs text-[#78716C] leading-relaxed">
            An unexpected error occurred while loading this view. You can attempt to refresh the session below.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="w-full py-2.5 px-4 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            Retry Execution
          </button>
        </div>
      </body>
    </html>
  );
}
