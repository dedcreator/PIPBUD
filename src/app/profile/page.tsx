'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TraderProfilePage from './[username]/page';

export default function CurrentUserProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C2410C] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Render the current user's profile directly
  return <TraderProfilePage />;
}
