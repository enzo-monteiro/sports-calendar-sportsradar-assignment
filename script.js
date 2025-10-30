/* =========================
   DOM Element References
========================= */
const calendarEl = document.getElementById('calendar');
const monthDisplayEl = document.getElementById('monthDisplay');
const calendarSectionEl = document.getElementById('calendarSection');
const detailSectionEl = document.getElementById('detailSection');
const detailContentEl = document.getElementById('detailContent');
const addEventSectionEl = document.getElementById('addEventSection');

/* Navigation buttons */
const showCalendarBtn = document.getElementById('showCalendar');
const addEventBtn = document.getElementById('addEventButton');
const backToAddEventBtn = document.getElementById('backToAddEvent');

/* =========================
   Data Setup
========================= */
const sportsEvents = [
    {
        date: '2025-10-23',
        info: '09:45, Ice Hockey',
        fullDescriptor: 'Sun., 23.10.2025, 09:45, Ice Hockey, KAC vs. Capitals'
    }
];

/* Weekday and month labels */
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* =========================
   Helper Functions
========================= */

/* Converts a date into YYYY-MM-DD format */
const formatDate = (year, monthIndex, day) => {
    const month = String(monthIndex + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
};

/* Finds all events matching a specific date */
const getEventsForDate = (dateString) => {
    return sportsEvents.filter(event => event.date === dateString);
};

/* Controls which section (view) is currently visible */
const showView = (viewId) => {
    calendarSectionEl.style.display = viewId === 'calendar' ? 'block' : 'none';
    detailSectionEl.style.display = viewId === 'detail' ? 'block' : 'none';
    addEventSectionEl.style.display = viewId === 'addEvent' ? 'block' : 'none';
};

/* Shortcuts for switching between main views */
const showCalendarView = () => showView('calendar');
const showAddEventView = () => showView('addEvent');

/* =========================
   Event Detail View
========================= */
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

/* =========================
   Calendar Rendering Logic
========================= */
const renderCalendar = (year, monthIndex) => {
    calendarEl.innerHTML = '';

    const date = new Date(year, monthIndex, 1);
    const firstDayOfMonth = date.getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = new Date();
    const currentDayKey = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

    monthDisplayEl.textContent = `${MONTH_NAMES[monthIndex]} ${year}`;

    /* Add padding cells for days from previous month */
    for (let i = 0; i < firstDayOfMonth; i++) {
        const paddingCell = document.createElement('div');
        paddingCell.className = 'day-cell other-month';
        calendarEl.appendChild(paddingCell);
    }

    /* Build each day cell */
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';

        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        const dateString = formatDate(year, monthIndex, day);
        const dayEvents = getEventsForDate(dateString);

        /* Highlight today */
        if (dateString === currentDayKey) {
            dayCell.classList.add('current-day');
        }

        /* Display event marker if day has an event */
        if (dayEvents.length > 0) {
            dayCell.classList.add('event-day');

            const eventMarker = document.createElement('div');
            eventMarker.className = 'event-marker';
            dayCell.appendChild(eventMarker);

            /* Show first event summary */
            const eventInfo = document.createElement('div');
            eventInfo.className = 'event-info';
            eventInfo.textContent = dayEvents[0].info;
            dayCell.appendChild(eventInfo);

            /* Clicking opens event details */
            dayCell.onclick = () => showEventDetail(dayEvents[0]);
        } else {
            /* Days without events */
            dayCell.onclick = () => console.log(`No events on ${dateString}`);
        }

        calendarEl.appendChild(dayCell);
    }
};

/* =========================
   Add Event Form Handling
========================= */
const addEventForm = document.getElementById('addEventForm');

addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const sport = document.getElementById('eventSport').value;
    const teams = document.getElementById('eventTeams').value;

    if (!date || !time || !sport || !teams) {
        alert('Please fill out all fields before saving.');
        return;
    }

    const eventObj = {
        date: date,
        info: `${time}, ${sport}`,
        fullDescriptor: `${date}, ${time}, ${sport}, ${teams}`
    };

    /* Add event and refresh the calendar */
    sportsEvents.push(eventObj);

    const selectedDate = new Date(date);
    renderCalendar(selectedDate.getFullYear(), selectedDate.getMonth());

    showCalendarView();
    e.target.reset();
});

/* =========================
   Navigation Event Listeners
========================= */
showCalendarBtn.addEventListener('click', showCalendarView);
addEventBtn.addEventListener('click', showAddEventView);
backToAddEventBtn.addEventListener('click', showCalendarView);

/* =========================
   Initialization
========================= */
document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    renderCalendar(now.getFullYear(), now.getMonth());
    showCalendarView();
});
