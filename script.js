const calendarEl = document.getElementById('calendar');
const monthDisplayEl = document.getElementById('monthDisplay');

const sportsEvents = [
    { date: '2025-07-18', info: 'Football, Salzburg vs. Sturm' },
    { date: '2025-10-23', info: 'Ice Hockey, KAC vs. Capitals' }
];

function formatDate(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
}

function getEventsForDate(dateString) {
    return sportsEvents.filter(event => event.date === dateString);
}

function renderCalendar(year, monthIndex) {
    calendarEl.innerHTML = '';

    const date = new Date(year, monthIndex);
    const monthName = date.toLocaleString('default', { month: 'long' });
    
    if (monthDisplayEl) {
        monthDisplayEl.textContent = `${monthName} ${year}`;
    }

    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === monthIndex;
    const todayDay = isCurrentMonth ? today.getDate() : -1;

    for (let i = 0; i < firstDayOfMonth; i++) {
        const cell = document.createElement('div');
        cell.classList.add('day-cell', 'other-month');
        const prevMonthDay = new Date(year, monthIndex, 0).getDate() - firstDayOfMonth + i + 1;
        cell.innerHTML = `<span class="day-number">${prevMonthDay}</span>`;
        calendarEl.appendChild(cell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.classList.add('day-cell');
        
        cell.innerHTML = `<span class="day-number">${day}</span>`;

        if (day === todayDay) {
            cell.classList.add('current-day');
        }

        const dateString = formatDate(year, monthIndex, day);
        const dayEvents = getEventsForDate(dateString);

        if (dayEvents.length > 0) {
            cell.classList.add('event-day');

            const marker = document.createElement('div');
            marker.classList.add('event-marker');
            cell.appendChild(marker);

            const info = document.createElement('div');
            info.classList.add('event-info');
            info.textContent = dayEvents[0].info.split(',')[0]; 
            cell.appendChild(info);
        }

        cell.addEventListener('click', () => {
             console.log(`Clicked on ${monthName} ${day}, ${year}. Events: ${dayEvents.length}`);
        });

        calendarEl.appendChild(cell);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    renderCalendar(now.getFullYear(), now.getMonth());
});
