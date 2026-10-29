import React from 'react';
import { Clock, Heart } from 'lucide-react';
import { TimelineEvent } from '../../types';

interface ProgramTimelineProps {
  date: string;
  timeline: TimelineEvent[];
  className?: string;
  themePrimaryColor?: string;
  isDarkTheme?: boolean;
}

export const ProgramTimeline: React.FC<ProgramTimelineProps> = ({
  date,
  timeline,
  className = '',
  themePrimaryColor = '#864e3c',
  isDarkTheme = false,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

  return (
    <div className={`flex flex-col items-center my-8 max-w-md w-full mx-auto px-4 ${className}`}>
      {/* Clock Icon */}
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full border mb-2 shadow-xs"
        style={{
          borderColor: isDarkTheme ? 'rgba(212,175,55,0.4)' : '#d3b4a4',
          color: isDarkTheme ? '#ffd700' : themePrimaryColor,
          backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.08)' : '#fcf8f3',
        }}
      >
        <Clock className="w-4 h-4 stroke-[1.75]" />
      </div>

      {/* Program Timeline Header */}
      <h3
        className="font-script text-3xl sm:text-4xl text-center mb-1"
        style={{ color: isDarkTheme ? '#ffd700' : themePrimaryColor }}
      >
        Program Timeline
      </h3>

      {/* Subtle heart divider */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span
          className="w-10 h-[1px]"
          style={{ backgroundColor: isDarkTheme ? 'rgba(212,175,55,0.4)' : '#d3b4a4' }}
        />
        <Heart
          className="w-2.5 h-2.5 fill-current"
          style={{ color: isDarkTheme ? '#ffd700' : themePrimaryColor }}
        />
        <span
          className="w-10 h-[1px]"
          style={{ backgroundColor: isDarkTheme ? 'rgba(212,175,55,0.4)' : '#d3b4a4' }}
        />
      </div>

      {/* Formatted Date Banner */}
      <div className="flex items-center justify-center gap-3 w-full mb-6">
        <span
          className="flex-1 h-[1px]"
          style={{ backgroundColor: isDarkTheme ? 'rgba(212,175,55,0.3)' : '#d8beaf' }}
        />
        <span
          className="font-playfair text-xs sm:text-sm font-semibold tracking-widest"
          style={{ color: isDarkTheme ? '#fbe8da' : themePrimaryColor }}
        >
          {formattedDate}
        </span>
        <span
          className="flex-1 h-[1px]"
          style={{ backgroundColor: isDarkTheme ? 'rgba(212,175,55,0.3)' : '#d8beaf' }}
        />
      </div>

      {/* Timeline items list */}
      <div className="w-full space-y-5">
        {timeline.map((event) => (
          <div key={event.id} className="flex items-start gap-4 sm:gap-6 group">
            {/* Time label */}
            <div className="w-20 sm:w-24 shrink-0 text-right">
              <span
                className="font-playfair text-xs sm:text-sm font-bold tracking-wide"
                style={{ color: isDarkTheme ? '#ffd700' : themePrimaryColor }}
              >
                {event.time}
              </span>
            </div>

            {/* Vertical timeline node */}
            <div className="relative flex flex-col items-center self-stretch">
              <div
                className="w-2.5 h-2.5 rounded-full mt-1.5 ring-2 ring-white/20"
                style={{ backgroundColor: isDarkTheme ? '#ffd700' : themePrimaryColor }}
              />
              <div
                className="w-[1px] flex-1 my-1"
                style={{
                  backgroundColor: isDarkTheme ? 'rgba(212,175,55,0.3)' : '#decbc0',
                }}
              />
            </div>

            {/* Event details */}
            <div className="flex-1 pb-4">
              <h4
                className="font-playfair text-sm sm:text-base font-semibold leading-snug"
                style={{ color: isDarkTheme ? '#fdf4eb' : '#392922' }}
              >
                {event.title}
              </h4>
              {event.description && (
                <p
                  className="font-lora text-xs sm:text-sm mt-0.5 leading-relaxed"
                  style={{ color: isDarkTheme ? '#cfbcaa' : '#695147' }}
                >
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
