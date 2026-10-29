import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // ISO string or YYYY-MM-DD
  className?: string;
  themePrimaryColor?: string;
  isDarkTheme?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  className = '',
  themePrimaryColor = '#864e3c',
  isDarkTheme = false,
}) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const dateStr = targetDate.includes('T') ? targetDate : `${targetDate}T10:00:00`;
    const target = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`flex flex-col items-center my-6 ${className}`}>
      {/* Decorative heart divider */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span
          className="w-8 h-[1px]"
          style={{ backgroundColor: themePrimaryColor, opacity: 0.4 }}
        />
        <Heart
          className="w-2.5 h-2.5 fill-current"
          style={{ color: themePrimaryColor }}
        />
        <span
          className="w-8 h-[1px]"
          style={{ backgroundColor: themePrimaryColor, opacity: 0.4 }}
        />
      </div>

      {/* 4-Box Row matching reference with responsive theme colors */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm w-full px-2">
        {/* DAYS */}
        <div
          className="flex flex-col items-center justify-center rounded-xl p-2.5 sm:p-3.5 shadow-sm border transition-colors"
          style={{
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.06)' : '#f2e8de',
            borderColor: isDarkTheme ? 'rgba(212,175,55,0.3)' : '#decac0',
          }}
        >
          <span
            className="font-playfair text-2xl sm:text-3xl font-bold tabular-nums"
            style={{ color: isDarkTheme ? '#ffd700' : '#392922' }}
          >
            {String(time.days).padStart(2, '0')}
          </span>
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-wider mt-0.5"
            style={{ color: isDarkTheme ? '#fbe8da' : themePrimaryColor }}
          >
            DAYS
          </span>
        </div>

        {/* HOURS */}
        <div
          className="flex flex-col items-center justify-center rounded-xl p-2.5 sm:p-3.5 shadow-sm border transition-colors"
          style={{
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.06)' : '#f2e8de',
            borderColor: isDarkTheme ? 'rgba(212,175,55,0.3)' : '#decac0',
          }}
        >
          <span
            className="font-playfair text-2xl sm:text-3xl font-bold tabular-nums"
            style={{ color: isDarkTheme ? '#ffd700' : '#392922' }}
          >
            {String(time.hours).padStart(2, '0')}
          </span>
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-wider mt-0.5"
            style={{ color: isDarkTheme ? '#fbe8da' : themePrimaryColor }}
          >
            HOURS
          </span>
        </div>

        {/* MINUTES */}
        <div
          className="flex flex-col items-center justify-center rounded-xl p-2.5 sm:p-3.5 shadow-sm border transition-colors"
          style={{
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.06)' : '#f2e8de',
            borderColor: isDarkTheme ? 'rgba(212,175,55,0.3)' : '#decac0',
          }}
        >
          <span
            className="font-playfair text-2xl sm:text-3xl font-bold tabular-nums"
            style={{ color: isDarkTheme ? '#ffd700' : '#392922' }}
          >
            {String(time.minutes).padStart(2, '0')}
          </span>
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-wider mt-0.5"
            style={{ color: isDarkTheme ? '#fbe8da' : themePrimaryColor }}
          >
            MINUTES
          </span>
        </div>

        {/* SECONDS */}
        <div
          className="flex flex-col items-center justify-center rounded-xl p-2.5 sm:p-3.5 shadow-sm border transition-colors"
          style={{
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.06)' : '#f2e8de',
            borderColor: isDarkTheme ? 'rgba(212,175,55,0.3)' : '#decac0',
          }}
        >
          <span
            className="font-playfair text-2xl sm:text-3xl font-bold tabular-nums"
            style={{ color: isDarkTheme ? '#ffd700' : '#392922' }}
          >
            {String(time.seconds).padStart(2, '0')}
          </span>
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-wider mt-0.5"
            style={{ color: isDarkTheme ? '#fbe8da' : themePrimaryColor }}
          >
            SECONDS
          </span>
        </div>
      </div>
    </div>
  );
};
