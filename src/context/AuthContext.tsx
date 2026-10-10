'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TraderProfile {
  id: string;
  username: string;
  name: string;
  telegram_id: string;
  skill_level: number;
  tier_name: string;
  tier_badge: string;
  tier_color: string;
  tier_health: number;
  win_rate: number;
  profit_factor: number;
  max_drawdown: number;
  total_verified_trades: number;
  broker_name: string;
  broker_account_number?: string;
  last_broker_sync?: string;
  account_verified?: boolean;
  token?: string;
  // Custom Identity & Privacy Settings
  display_name?: string;
  avatar_url?: string;
  avatar_type?: string;
  hide_telegram?: boolean;
  allow_direct_messages?: boolean;
  telegram_username?: string;
  trading_style?: string;
  bio?: string;
  show_broker_badge?: boolean;
}

export interface BrokerConnectPayload {
  platform: 'mt4' | 'mt5' | 'prop_firm' | 'ctrader';
  broker_name: string;
  account_number: string;
  server?: string;
  investor_password?: string;
  account_type: 'LIVE_FUNDED' | 'EVALUATION_PASS' | 'PERSONAL_LIVE';
  account_size: number;
}

interface AuthContextType {
  user: TraderProfile | null;
  isLoading: boolean;
  error: string | null;
  requestCode: (usernameOrId: string) => Promise<{ success: boolean; message: string; code?: string }>;
  verifyCode: (code: string) => Promise<{ success: boolean; message: string }>;
  loginWithTelegramWidget: (telegramData: any) => Promise<{ success: boolean; message: string }>;
  updateProfile: (updates: Partial<TraderProfile>) => Promise<{ success: boolean; message: string }>;
  connectBrokerAccount: (payload: BrokerConnectPayload) => Promise<{ success: boolean; message: string; verifiedLevel?: number }>;
  syncBrokerTrades: () => Promise<{ success: boolean; message: string; syncedTrades?: number }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const getApiBase = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1') {
      return 'https://pipbud-server.onrender.com';
    }
  }
  return 'http://localhost:8000';
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TraderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pipbud_trader');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistUser = (trader: TraderProfile | null) => {
    setUser(trader);
    if (trader) {
      localStorage.setItem('pipbud_trader', JSON.stringify(trader));
      if (trader.token) {
        localStorage.setItem('pipbud_token', trader.token);
      }
    } else {
      localStorage.removeItem('pipbud_trader');
      localStorage.removeItem('pipbud_token');
    }
  };

  const requestCode = async (usernameOrId: string) => {
    setError(null);
    const cleanId = usernameOrId.trim();
    const isNumeric = /^\d+$/.test(cleanId);
    const payload = isNumeric
      ? { telegram_id: cleanId }
      : { username: cleanId.replace(/^@/, '') };

    try {
      const res = await fetch(`${getApiBase()}/api/auth/request-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to request login code from backend.');
      }
      return { success: true, message: data.message, code: data.code };
    } catch (err: any) {
      const msg = err.message || 'Cannot reach PipBud backend server. Please check your network connection.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const verifyCode = async (code: string) => {
    setError(null);
    const cleanCode = code.trim();
    try {
      const res = await fetch(`${getApiBase()}/api/auth/verify-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode }),
      });

      const data = await res.json();
      if (!res.ok || !data.trader) {
        const errorMsg = data.error || 'Invalid or expired login code. Request a fresh code from @PipBudBot.';
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }

      persistUser(data.trader);
      return { success: true, message: data.message || `Welcome back, @${data.trader.username}!` };
    } catch (err: any) {
      const msg = err.message || 'Verification failed. Could not communicate with server.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const loginWithTelegramWidget = async (telegramData: any) => {
    setError(null);
    try {
      const res = await fetch(`${getApiBase()}/api/auth/telegram-widget/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telegramData),
      });

      const data = await res.json();
      if (!res.ok || !data.trader) {
        throw new Error(data.error || 'Telegram authorization failed.');
      }

      persistUser(data.trader);
      return { success: true, message: data.message };
    } catch (err: any) {
      const msg = err.message || 'Telegram Widget authentication failed.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const updateProfile = async (updates: Partial<TraderProfile>): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'You must be logged in to update your profile.' };
    }

    const updatedUser: TraderProfile = {
      ...user,
      ...updates,
    };

    persistUser(updatedUser);

    try {
      const token = localStorage.getItem('pipbud_token') || user.token;
      await fetch(`${getApiBase()}/api/auth/update-profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          trader_id: user.id,
          ...updates,
        }),
      });
    } catch {
      // Retain local persistence
    }

    return { success: true, message: 'Profile & privacy preferences updated!' };
  };

  const connectBrokerAccount = async (
    payload: BrokerConnectPayload
  ): Promise<{ success: boolean; message: string; verifiedLevel?: number }> => {
    if (!user) {
      return { success: false, message: 'You must be logged in to connect a broker account.' };
    }

    try {
      const token = localStorage.getItem('pipbud_token') || user.token;
      const res = await fetch(`${getApiBase()}/api/integrations/connect-broker/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          trader_id: user.id,
          username: user.username,
          ...payload,
        }),
      });

      const data = await res.json();
      if (res.ok && data.trader) {
        const updatedUser: TraderProfile = {
          ...user,
          ...data.trader,
          account_verified: true,
        };
        persistUser(updatedUser);
        return {
          success: true,
          message: data.message || 'Account successfully verified!',
          verifiedLevel: data.verified_level,
        };
      }
      return {
        success: false,
        message: data.error || 'Failed to verify broker credentials with server.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Could not connect to broker verification service.',
      };
    }
  };

  const syncBrokerTrades = async (): Promise<{ success: boolean; message: string; syncedTrades?: number }> => {
    if (!user) {
      return { success: false, message: 'You must be logged in to sync trades.' };
    }

    try {
      const token = localStorage.getItem('pipbud_token') || user.token;
      const res = await fetch(`${getApiBase()}/api/integrations/sync-now/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          trader_id: user.id,
          username: user.username,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const nowIso = new Date().toISOString();
        const updated: TraderProfile = {
          ...user,
          last_broker_sync: nowIso,
          total_verified_trades: data.synced_trades ?? user.total_verified_trades,
        };
        persistUser(updated);
        return {
          success: true,
          message: data.message || 'Broker trade synchronization complete.',
          syncedTrades: data.synced_trades,
        };
      }
      return {
        success: false,
        message: data.error || 'Broker synchronization failed.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Unable to sync trades with broker.',
      };
    }
  };

  const logout = () => {
    persistUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        requestCode,
        verifyCode,
        loginWithTelegramWidget,
        updateProfile,
        connectBrokerAccount,
        syncBrokerTrades,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
