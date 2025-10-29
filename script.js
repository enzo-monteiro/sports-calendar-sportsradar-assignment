const calendarEl = document.getElementById('calendar');
const monthDisplayEl = document.getElementById('monthDisplay');
const calendarSectionEl = document.getElementById('calendarSection');
const detailSectionEl = document.getElementById('detailSection');
const detailContentEl = document.getElementById('detailContent');

const sportsEvents = [
    {
        date: '2025-07-18',
        info: '18:30, Football',
        fullDescriptor: 'Sat., 18.07.2025, 18:30, Football, Salzburg vs. Sturm'
    },
    {
        date: '2025-10-23',
        info: '09:45, Ice Hockey',
        fullDescriptor: 'Sun., 23.10.2025, 09:45, Ice Hockey, KAC vs. Capitals'
    }
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const formatDate = (year, monthIndex, day) => {
    const month = String(monthIndex + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
};

const getEventsForDate = (dateString) => {
    return sportsEvents.filter(event => event.date === dateString);
};

const showView = (viewId) => {
    calendarSectionEl.style.display = viewId === 'calendar' ? 'block' : 'none';
    detailSectionEl.style.display = viewId === 'detail' ? 'block' : 'none';
};

const showCalendarView = () => {
    showView('calendar');
};

const showEventDetail = (event) => {
    showView('detail');
    detailContentEl.innerHTML = '';

    const detailCard = document.createElement('div');
    detailCard.className = 'detail-card';

    const titleEl = document.createElement('h2');
    titleEl.textContent = event.fullDescriptor.split(', ')[3];

    const fullDescriptorEl = document.createElement('p');
    fullDescriptorEl.className = 'full-descriptor-text';
    fullDescriptorEl.textContent = event.fullDescriptor;

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Calendar';
    backButton.className = 'btn-back';
    backButton.onclick = showCalendarView;

    detailCard.appendChild(titleEl);
    detailCard.appendChild(fullDescriptorEl);
    detailContentEl.appendChild(detailCard);
    detailContentEl.appendChild(backButton);
};

const renderCalendar = (year, monthIndex) => {
    calendarEl.innerHTML = '';

    const date = new Date(year, monthIndex, 1);
    const firstDayOfMonth = date.getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = new Date();
    const currentDayKey = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

    monthDisplayEl.textContent = `${MONTH_NAMES[monthIndex]} ${year}`;

    for (let i = 0; i < firstDayOfMonth; i++) {
        const paddingCell = document.createElement('div');
        paddingCell.className = 'day-cell other-month';
        calendarEl.appendChild(paddingCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';

        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        const dateString = formatDate(year, monthIndex, day);
        const dayEvents = getEventsForDate(dateString);

        if (dateString === currentDayKey) {
            dayCell.classList.add('current-day');
        }

        if (dayEvents.length > 0) {
            const event = dayEvents[0];
            
            dayCell.classList.add('event-day');

            const eventMarker = document.createElement('div');
            eventMarker.className = 'event-marker';
            dayCell.appendChild(eventMarker);

            const eventInfo = document.createElement('div');
            eventInfo.className = 'event-info';
            eventInfo.textContent = event.info; 
            dayCell.appendChild(eventInfo);

            dayCell.onclick = () => showEventDetail(event);
        } else {
            dayCell.onclick = () => console.log(`No events on ${dateString}`);
        }

        calendarEl.appendChild(dayCell);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    renderCalendar(now.getFullYear(), now.getMonth());
    showCalendarView();
});
