const dateTabs = document.getElementById("dateTabs");
const heroCard = document.getElementById("heroCard");
const reminderCard = document.getElementById("reminderCard");
const timelineCard = document.getElementById("timelineCard");
const modal = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalItems = document.getElementById("modalItems");
const dayWarningCard = document.getElementById("dayWarningCard");
const mainSwipeArea = document.getElementById("mainSwipeArea");
const scrollTopBtn = document.getElementById("scrollTopBtn");
let selected = 10;
let weatherCache = null;

function getTimelineIcon(title, note) {
  const text = `${title} ${note}`.toLowerCase();
  if (text.includes("住宿") || text.includes("check-in") || text.includes("入住") || text.includes("hotel") || text.includes("ibis")) return "home";
  if (text.includes("晚餐") || text.includes("午餐") || text.includes("早餐") || text.includes("cafe") || text.includes("coffee") || text.includes("pho") || text.includes("tacos") || text.includes("lunch") || text.includes("dinner")) return "restaurant";
  if (text.includes("flight") || text.includes("jq") || text.includes("ci") || text.includes("航班")) return "flight_takeoff";
  if (text.includes("bus") || text.includes("linksa") || text.includes("skybus") || text.includes("j1") || text.includes("j2")) return "directions_bus";
  if (text.includes("tram") || text.includes("metro") || text.includes("機捷")) return "tram";
  if (text.includes("car") || text.includes("取車") || text.includes("還車") || text.includes("drive")) return "directions_car";
  if (text.includes("market") || text.includes("shopping") || text.includes("coles") || text.includes("藥局") || text.includes("補給") || text.includes("買")) return "shopping_bag";
  if (text.includes("koala") || text.includes("wombat") || text.includes("wildlife") || text.includes("企鵝")) return "pets";
  if (text.includes("yoga")) return "self_improvement";
  if (text.includes("ferry")) return "directions_boat";
  if (text.includes("高鐵") || text.includes("train")) return "train";
  return "place";
}

function renderDailyRouteLinks(label) {
  const routes = dailyRouteLinks[label] || [];
  if (!routes.length) return "";
  return `
    <h3 class="section-title" style="margin-top:14px;"><span class="icon-pill"><span class="material-symbols-rounded">map</span></span>Route Links</h3>
    <div class="quick-links">
      ${routes.map(route => `
        <a class="link-btn" href="${route.url}" target="_blank" rel="noopener" style="margin-bottom:8px;">
          <span>${route.label}<br><small style="color:#81766b;">${route.note}</small></span>
          <span>Map ›</span>
        </a>
      `).join("")}
    </div>
  `;
}

function renderDailyMustBuy(label) {
  const items = mustBuyDay[label] || [];
  if (!items.length) return "";
  return `
    <h3 class="section-title" style="margin-top:14px;"><span class="icon-pill"><span class="material-symbols-rounded">shopping_bag</span></span>Must Buy</h3>
    ${items.map(item => `<div class="small-card">${item}</div>`).join("")}
  `;
}

function renderTabs() {
  dateTabs.innerHTML = tripDays.map((d, i) => `<button class="date-tab ${i === selected ? "is-active" : ""}" data-index="${i}">${d.label}</button>`).join("");
  document.querySelectorAll(".date-tab").forEach(btn => btn.addEventListener("click", () => { selected = Number(btn.dataset.index); if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("is-visible", window.scrollY > 360);
  }, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  document.body.scrollTo?.({ top: 0, left: 0, behavior: "smooth" });

  // Fallback for browsers or embedded preview panes that ignore smooth scroll.
  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 80);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    scrollToPageTop();
  });
}

render(); }));
  const active = document.querySelector(".date-tab.is-active");
  if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}


function renderTimelineNav(dayLabel, title) {
  const nav = timelineNavigation[`${dayLabel}|${title}`];
  if (!nav) return "";
  const action = nav.url
    ? `<a class="nav-mini-btn" href="${nav.url}" target="_blank" rel="noopener"><span class="material-symbols-rounded">map</span>Open Map</a>`
    : `<span class="nav-mini-btn"><span class="material-symbols-rounded">info</span>Use signs</span>`;
  return `
    <div class="timeline-nav">
      <div class="timeline-nav-head">
        <span class="material-symbols-rounded">${nav.icon || "route"}</span>
        <span>${nav.mode}｜${nav.label}</span>
      </div>
      <div class="timeline-nav-note">${nav.note}</div>
      <div class="timeline-nav-actions">${action}</div>
    </div>
  `;
}

function renderDay() {
  const d = tripDays[selected];
  heroCard.innerHTML = `
    <div class="badges">
      <span class="badge">${d.label}</span>
      <span class="badge">${d.city}</span>
      ${d.accent ? `<span class="badge">${d.accent}</span>` : ""}
    </div>
    <h2 class="hero-title">${d.title}</h2>
    <p class="theme">${d.theme}</p>
    ${d.accommodation ? `<div class="accommodation" data-accommodation="${d.accommodation}"><div class="accommodation-main"><span class="icon-pill"><span class="material-symbols-rounded">home</span></span><div class="accommodation-text"><div class="accommodation-title">${d.accommodation}</div><div class="accommodation-subtitle">點開查看住宿詳細資料</div></div></div><span class="material-symbols-rounded">chevron_right</span></div>` : ""}
  `;

  reminderCard.innerHTML = `
    <h3 class="section-title"><span class="icon-pill"><span class="material-symbols-rounded">error</span></span>今日重點提醒</h3>
    <div class="reminder-list">
      ${d.reminders.map(r => `<div class="reminder"><span class="dot"></span><span>${r}</span></div>`).join("")}
    </div>
  `;

  timelineCard.innerHTML = `
    <h3 class="section-title"><span class="icon-pill"><span class="material-symbols-rounded">schedule</span></span>Timeline</h3>
    <div class="timeline">
      ${d.timeline.map(t => `<div class="timeline-item"><div class="time">${t[0]}</div><div class="icon-pill"><span class="material-symbols-rounded">${getTimelineIcon(t[1], t[2])}</span></div><div><div class="timeline-title">${t[1]}</div><div class="timeline-note">${t[2]}</div>${renderTimelineNav(d.label, t[1])}</div></div>`).join("")}
    </div>
  `;
}

function renderDayWarning() {
  const d = tripDays[selected];
  const warning = daySpecificWarnings[d.label];
  if (!warning) {
    dayWarningCard.hidden = true;
    return;
  }
  dayWarningCard.hidden = false;
  dayWarningCard.innerHTML = `
    <h3 class="section-title"><span class="icon-pill"><span class="material-symbols-rounded">warning</span></span>${warning.title}</h3>
    <p class="theme">${warning.text}</p>
  `;
}

function openAccommodationModal(key) {
  const info = accommodationDetails[key];
  if (!info) return;
  modalTitle.textContent = info.name;
  modalSubtitle.textContent = "住宿詳細資料";
  modalItems.innerHTML = `
    <div class="detail-grid">
      <div class="detail-row"><strong>地址</strong>${info.address}</div>
      <div class="detail-row"><strong>Check-in</strong>${info.checkIn}</div>
      <div class="detail-row"><strong>Check-out</strong>${info.checkOut}</div>
    </div>
    <h3 class="section-title"><span class="icon-pill"><span class="material-symbols-rounded">info</span></span>Reminders</h3>
    ${info.notes.map(note => `<div class="panel-item"><span class="material-symbols-rounded">check_circle</span><span>${note}</span></div>`).join("")}
    <a class="link-btn" href="${info.maps}" target="_blank" rel="noopener" style="margin-top:12px;">
      <span>Open Google Maps</span><span>Map ›</span>
    </a>
  `;
  modal.classList.add("is-open");
}

function attachAccommodationCard() {
  const card = document.querySelector(".accommodation[data-accommodation]");
  if (!card) return;
  card.addEventListener("click", () => openAccommodationModal(card.dataset.accommodation));
}

function renderSide() {}

function render() {
  renderTabs();
  renderDay();
  renderDayWarning();
  renderSide();
  attachAccommodationCard();
}

function renderTransportPanel() {
  return `
    <h3 class="section-title"><span class="icon-pill"><span class="material-symbols-rounded">tram</span></span>Official Timetables</h3>
    ${links.map(link => `
      <a class="link-btn" href="${link.url}" target="_blank" rel="noopener" style="margin-bottom:8px;">
        <span>${link.label}</span><span>${link.city} ›</span>
      </a>
    `).join("")}
    <div class="warning-card" style="margin-top:14px;">
      <h4>低焦慮規則</h4>
      <p>如果官方 timetable、Google Maps 和現場標示不一致，以現場標示與官方即時班次為準；若拖行李、下雨或焦慮，直接切換 Uber / taxi 備案。</p>
    </div>
  `;
}

async function renderWeatherPanel() {
  modalItems.innerHTML = `
    <div class="panel-item"><span class="material-symbols-rounded">sync</span><span>正在讀取 5 日天氣預報...</span></div>
  `;
  try {
    if (!weatherCache) {
      weatherCache = await Promise.all(weatherCities.map(async city => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=5`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("weather fetch failed");
        const data = await res.json();
        return { ...city, data };
      }));
    }
    modalItems.innerHTML = `
      <div class="weather-grid">
        ${weatherCache.map(city => `
          <div class="weather-card">
            <div class="weather-head">
              <div class="weather-city">${city.name}</div>
              <a href="${city.official}" target="_blank" rel="noopener" class="link-btn" style="width:auto;padding:6px 10px;"><span>BoM</span><span>›</span></a>
            </div>
            <div class="weather-days">
              ${city.data.daily.time.map((day, idx) => `
                <div class="weather-day">
                  <strong>${day.slice(5)}</strong>
                  <span>${Math.round(city.data.daily.temperature_2m_min[idx])}–${Math.round(city.data.daily.temperature_2m_max[idx])}°C</span>
                  <span>雨 ${city.data.daily.precipitation_probability_max[idx] ?? "-"}%</span>
                  <span>風 ${Math.round(city.data.daily.wind_speed_10m_max[idx])}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
      <h3 class="section-title"><span class="icon-pill"><span class="material-symbols-rounded">verified</span></span>Official check</h3>
      ${officialWeatherLinks.map(link => `<a class="link-btn" href="${link.url}" target="_blank" rel="noopener" style="margin-bottom:8px;"><span>${link.label}</span><span>${link.city} ›</span></a>`).join("")}
      <div class="warning-card"><h4>Special reminders</h4><p>6/12 Adelaide 預報 32°C 以上時，Koala Holding 可能取消。6/2–6/3 Aurora Check 請同時看雲量、降雨、風、月光、體力與夜駕安全。</p></div>
    `;
  } catch (error) {
    modalItems.innerHTML = `
      <div class="warning-card"><h4>Weather API 讀取失敗</h4><p>可能是離線、網路阻擋或 API 暫時失效。請使用下方官方連結查詢。</p></div>
      ${officialWeatherLinks.map(link => `<a class="link-btn" href="${link.url}" target="_blank" rel="noopener" style="margin-bottom:8px;"><span>${link.label}</span><span>${link.city} ›</span></a>`).join("")}
    `;
  }
}

function renderHelpPanel() {
  return `
    <h3 class="section-title"><span class="icon-pill"><span class="material-symbols-rounded">emergency</span></span>Emergency contacts</h3>
    ${officialHelpContacts.map(contact => `
      <div class="panel-item" style="align-items:flex-start;">
        <span class="material-symbols-rounded">${contact.icon}</span>
        <span>
          <strong>${contact.title}</strong><br>
          ${contact.lines.map(line => `<span style="display:block;color:#81766b;font-size:13px;">${line}</span>`).join("")}
        </span>
      </div>
    `).join("")}

    <h3 class="section-title" style="margin-top:16px;"><span class="icon-pill"><span class="material-symbols-rounded">record_voice_over</span></span>English phrase cards</h3>
    ${englishPhraseCards.map(card => `
      <div class="weather-card" style="margin-bottom:10px;">
        <div class="weather-head">
          <div class="weather-city"><span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px;">${card.icon}</span> ${card.title}</div>
        </div>
        ${card.phrases.map(phrase => `<div class="small-card" style="background:#fbf8f2;">${phrase}</div>`).join("")}
      </div>
    `).join("")}

    <h3 class="section-title" style="margin-top:16px;"><span class="icon-pill"><span class="material-symbols-rounded">verified</span></span>Official links</h3>
    ${helpOfficialLinks.map(link => `
      <a class="link-btn" href="${link.url}" target="_blank" rel="noopener" style="margin-bottom:8px;">
        <span>${link.label}</span><span>${link.city} ›</span>
      </a>
    `).join("")}

    <div class="warning-card" style="margin-top:14px;">
      <h4>更新提醒</h4>
      <p>正式出發前請再點官方連結確認一次。租車實際保險、道路救援與費用，仍以當天櫃檯合約與車行提供文件為準。</p>
    </div>
  `;
}

function openPanel(panelKey) {
  const [title, subtitle, items] = panels[panelKey];
  modalTitle.textContent = title;
  modalSubtitle.textContent = subtitle;

  if (panelKey === "weather") {
    renderWeatherPanel();
  } else if (panelKey === "help") {
    modalItems.innerHTML = renderHelpPanel();
  } else if (panelKey === "driving") {
    modalItems.innerHTML = `
      <div class="warning-card">
        <h4>🚗 Driving scope</h4>
        <p>這份駕駛指南只給 Tasmania 與 Great Ocean Road 自駕日使用。Melbourne CBD、6/10 獨旅日、Adelaide 全段都以大眾交通 / 步行為主。</p>
      </div>
      ${drivingSections.map(section => `
        <h3 class="section-title" style="margin-top:16px;"><span class="icon-pill"><span class="material-symbols-rounded">${section.icon}</span></span>${section.title}</h3>
        ${section.items.map(item => `<div class="panel-item"><span class="material-symbols-rounded">check_circle</span><span>${item}</span></div>`).join("")}
      `).join("")}
    `;
  } else if (panelKey === "transport") {
    modalItems.innerHTML = renderTransportPanel();
  } else if (panelKey === "flight") {
    modalItems.innerHTML = `
      <div class="warning-card">
        <h4>⚠️ 6/2｜CI0057 → JQ707</h4>
        <p>MEL T2 入境 → 領華航行李 → 食品申報 → T4 Jetstar 重新托運。不要假設行李會直掛 Hobart。</p>
      </div>
      <div class="warning-card">
        <h4>⚠️ 6/14｜JQ775 → CI0058</h4>
        <p>MEL T4 領 Jetstar 行李 → T2 華航重新托運 → 出境 → lounge / dinner。</p>
      </div>
      <h3 class="section-title" style="margin-top:14px;"><span class="icon-pill"><span class="material-symbols-rounded">flight_takeoff</span></span>All Flights</h3>
      ${flights.map(f => `
        <div class="panel-item" style="align-items:flex-start;">
          <span class="material-symbols-rounded">flight</span>
          <span>
            <strong>${f.date}｜${f.no}</strong><br>
            <span style="color:#5b5148;">${f.route}</span><br>
            <span style="color:#81766b;font-size:13px;">${f.time}</span><br>
            <span style="color:#81766b;font-size:13px;">${f.note}</span>
          </span>
        </div>
      `).join("")}
    `;
  } else {
    modalItems.innerHTML = items.map(item => `<div class="panel-item"><span class="material-symbols-rounded">check_circle</span><span>${item}</span></div>`).join("");
  }
  modal.classList.add("is-open");
}

document.querySelectorAll(".icon-btn").forEach(btn => {
  btn.addEventListener("click", () => openPanel(btn.dataset.panel));
});

document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("is-open"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("is-open"); });

let touchStartX = 0;
let touchEndX = 0;

mainSwipeArea.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

mainSwipeArea.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) < 70) return;
  if (diff < 0 && selected < tripDays.length - 1) {
    selected += 1;
    render();
  }
  if (diff > 0 && selected > 0) {
    selected -= 1;
    render();
  }
}, { passive: true });

render();
