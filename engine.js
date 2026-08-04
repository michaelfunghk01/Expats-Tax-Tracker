// Storage cache namespace string config
const STORAGE_KEY = 'expat_tracker_simulation_data';
let currentProfile = 'PPT';

// Mock initial baseline profile properties for calculations
const config2026 = { maxFeieCap: 126000, usLimit: 35 };

// Immediately execute when simulator opens in VS Code environment
window.onload = function() {
    renderApplication();
};

function getStoredLogs() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function updateEndMinDate() {
    const startInput = document.getElementById('trip-start');
    const endInput = document.getElementById('trip-end');
    if (startInput.value) {
        endInput.min = startInput.value;
        if (endInput.value && endInput.value < startInput.value) {
            endInput.value = startInput.value;
        }
    } else {
        endInput.removeAttribute('min');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const startValue = document.getElementById('trip-start').value;
    const endValue = document.getElementById('trip-end').value;

    if (startValue > endValue) {
        alert('End date must be the same as or later than the start date.');
        return;
    }

    const logs = getStoredLogs();
    const newTrip = {
        id: crypto.randomUUID(),
        location: document.getElementById('trip-location').value,
        start: startValue,
        end: endValue
    };

    const hasOverlap = logs.some(trip => {
        const existingStart = new Date(trip.start);
        const existingEnd = new Date(trip.end);
        const newStart = new Date(newTrip.start);
        const newEnd = new Date(newTrip.end);
        return newStart <= existingEnd && newEnd >= existingStart;
    });

    if (hasOverlap) {
        alert('This trip overlaps an existing travel record. Please choose dates that do not overlap previous trips.');
        return;
    }

    logs.push(newTrip);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
   
    document.getElementById('trip-form').reset();
    renderApplication();
}

function switchProfile(profile) {
    currentProfile = profile;
    document.getElementById('btn-ppt').classList.toggle('active', profile === 'PPT');
    document.getElementById('btn-bfr').classList.toggle('active', profile === 'BFR');
    renderApplication();
}

function wipeLocalCache() {
    const shouldClear = confirm('Clear stored trip data? This will remove any sample or real entries.');
    if (!shouldClear) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    renderApplication();
}

function showSampleScreen() {
    document.getElementById('sample-screen').classList.remove('hidden');
    document.getElementById('main-app-content').classList.add('hidden');
}

function hideSampleScreen() {
    document.getElementById('sample-screen').classList.add('hidden');
    document.getElementById('main-app-content').classList.remove('hidden');
}

const sampleTripsPPT = [
    { id: crypto.randomUUID(), location: 'MEX', start: '2026-01-03', end: '2026-01-20' },
    { id: crypto.randomUUID(), location: 'US', start: '2026-02-05', end: '2026-02-15' },
    { id: crypto.randomUUID(), location: 'US', start: '2026-03-10', end: '2026-03-18' }
];

const sampleTripsBFR = [
    { id: crypto.randomUUID(), location: 'MEX', start: '2026-01-03', end: '2026-02-28' },
    { id: crypto.randomUUID(), location: 'US', start: '2026-03-10', end: '2026-03-25' },
    { id: crypto.randomUUID(), location: 'MEX', start: '2026-04-05', end: '2026-04-30' }
];

function loadPptSample() {
    switchProfile('PPT');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTripsPPT));
    hideSampleScreen();
    renderApplication();
}

function loadBfrSample() {
    switchProfile('BFR');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTripsBFR));
    hideSampleScreen();
    renderApplication();
}

function loadSampleTrips() {
    const sampleTrips = [
        { id: crypto.randomUUID(), location: 'MEX', start: '2026-01-05', end: '2026-01-20' },
        { id: crypto.randomUUID(), location: 'US', start: '2026-02-10', end: '2026-02-18' },
        { id: crypto.randomUUID(), location: 'MEX', start: '2026-03-01', end: '2026-03-15' }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTrips));
    renderApplication();
}

// core algorithmic math loop layer executing dynamically inside device parameters
function renderApplication() {
    const logs = getStoredLogs();
    const listElement = document.getElementById('log-list');
    const metricsElement = document.getElementById('dashboard-metrics');
    const badgeElement = document.getElementById('status-badge');
   
    listElement.innerHTML = '';
   
    // 1. Render history list items natively out of LocalStorage values
    if(logs.length === 0) {
        listElement.innerHTML = '<li>No travel records saved on device yet.</li>';
    }
   
    let totalUsDays = 0;
    logs.forEach(trip => {
        const item = document.createElement('li');
        item.innerText = `${trip.location === 'US' ? '🇺🇸 US Trip' : '🇲🇽 Mexico Trip'}: ${trip.start} to ${trip.end}`;
        listElement.appendChild(item);

        // Simple date delta differential math calculation
        const days = Math.ceil((new Date(trip.end) - new Date(trip.start)) / (1000 * 60 * 60 * 24)) + 1;
        if(trip.location === 'US') totalUsDays += days;
    });

    // 2. Compute dynamic outputs matching profile tracking rules
    if (currentProfile === 'PPT') {
        const buffer = config2026.usLimit - totalUsDays;
        metricsElement.innerHTML = `
            <p><strong>Total US Days Logged:</strong> ${totalUsDays} Days</p>
            <p><strong>US Days Remaining Buffer:</strong> ${buffer >= 0 ? buffer : 0} Days</p>
        `;
       
        if (totalUsDays > config2026.usLimit) {
            badgeElement.innerText = "🔴 EXCEEDED / PPT FAILED";
            badgeElement.className = "badge badge-danger";
        } else if (totalUsDays > 25) {
            badgeElement.innerText = "🟡 WARNING RISK ZONE";
            badgeElement.className = "badge badge-warning";
        } else {
            badgeElement.innerText = "🟢 SAFE BUFFER ACTIVE";
            badgeElement.className = "badge badge-safe";
        }
    } else {
        // Bona Fide calculation tracking metrics proration values
        const activeForeignDays = 365 - totalUsDays;
        const proratedCap = ((activeForeignDays / 365) * config2026.maxFeieCap).toFixed(2);
       
        badgeElement.innerText = "🏠 BONA FIDE TRACKING ACTIVE";
        badgeElement.className = "badge badge-safe";
       
        metricsElement.innerHTML = `
            <p><strong>US Days (Unprotected):</strong> ${totalUsDays} Days</p>
            <p><strong>Prorated FEIE Savings Cap:</strong> $${proratedCap} USD</p>
            <small style="color:#777;">BFR allows travel over 35 days, but your safety write-off cap scales down.</small>
        `;
    }
}

