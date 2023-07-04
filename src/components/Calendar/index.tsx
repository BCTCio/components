import React from 'react';
import dayjs from 'dayjs';

export interface CalendarEvent {
  date: string;
  title: string;
  type: string;
}

export interface CalendarProps {
  events: CalendarEvent[];
  month: number;
  year: number;
}
const typeColor: { [key: string]: string } = {
  reminder: 'green',
  warning: 'orange',
  urgent: 'red',
};

export const Calendar: React.FC<CalendarProps> = ({ month, year, events }) => {
  const renderCalendar = () => {
    const calendarDays = [];
    const startDate = dayjs(`${year}-${month}-01`)
      .startOf('month')
      .startOf('week');
    const endDate = dayjs(`${year}-${month}-01`).endOf('month').endOf('week');

    let day = startDate;

    while (day.isBefore(endDate, 'day')) {
      const eventsForDay = events.filter((event) =>
        dayjs(event.date).isSame(day, 'day')
      );
      const isCurrentDay = day.isSame(dayjs(), 'day');
      const isCarryoverDay = day.month() !== month - 1;

      calendarDays.push(
        <div
          key={day.format('YYYY-MM-DD')}
          className={`flex-col items-start border border-t-2 border-b-0 border-r-0 border-l-0 p-2 h-[120px] w-[175px] hover:bg-gray-100 transition-colors duration-300 ${
            isCurrentDay ? 'border-blue-500' : 'bg-white border-gray-200'
          }`}
        >
          <h1
            className={'text-sm text-gray-800'}
            style={{ color: isCarryoverDay ? '#eee' : undefined }}
          >
            {day.format('DD')}
          </h1>
          <div className="mt-2">
            {eventsForDay.length > 0 && (
              <ul className="pl-0">
                {eventsForDay.map((event) => (
                  <li key={event.date} className="text-sm">
                    <span
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        marginRight: '6px',
                        backgroundColor: typeColor[event.type],
                      }}
                    ></span>
                    {event.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
      day = day.add(1, 'day');
    }
    return calendarDays;
  };

  return (
    <div>
      <div className="bg-gray-100 text-gray-800 py-2 px-5 text-right">
        <div className="text-xl font-semibold">
          {dayjs()
            .year(year)
            .month(month - 1)
            .format('MMMM YYYY')}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 p-4">{renderCalendar()}</div>
    </div>
  );
};
