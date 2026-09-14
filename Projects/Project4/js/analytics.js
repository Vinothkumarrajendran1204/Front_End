/**
 * UNAKKU AVLOTHA LIMIT - Admin Analytics Engine
 * Generates lightweight, crisp, responsive SVG visualizations using the light theme palette.
 */

const AnalyticsEngine = {
  renderAllCharts() {
    this.renderAlcoholTrends('chart-alcohol-trends');
    this.renderTobaccoTrends('chart-tobacco-trends');
    this.renderCategoryUsage('chart-category-usage');
    this.renderLimitsReached('chart-limits-reached');
    this.renderAgeAttempts('chart-age-attempts');
    this.renderSlotUtilization('chart-slot-utilization');
  },

  // 1. Weekly Alcohol Purchase Trends (Bar Chart)
  renderAlcoholTrends(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const weeks = ['Week 33', 'Week 34', 'Week 35', 'Week 36', 'Week 37 (Current)'];
    const hardSpirits = [420, 390, 410, 385, 340];
    const beer = [780, 810, 750, 720, 690];
    const wine = [190, 210, 205, 180, 160];

    const maxVal = 1000;
    const svgWidth = 560;
    const svgHeight = 220;
    const padding = { top: 20, right: 20, bottom: 40, left: 45 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    const barGroupWidth = chartWidth / weeks.length;
    const barWidth = 14;

    let barsHtml = '';
    weeks.forEach((w, i) => {
      const xGroup = padding.left + i * barGroupWidth;

      // Hard liquor bar (amber)
      const h1 = (hardSpirits[i] / maxVal) * chartHeight;
      const y1 = padding.top + chartHeight - h1;
      barsHtml += `<rect x="${xGroup + 8}" y="${y1}" width="${barWidth}" height="${h1}" rx="3" fill="#f59e0b"><title>${w} Hard Liquor: ${hardSpirits[i]}</title></rect>`;

      // Beer bar (soft blue)
      const h2 = (beer[i] / maxVal) * chartHeight;
      const y2 = padding.top + chartHeight - h2;
      barsHtml += `<rect x="${xGroup + 26}" y="${y2}" width="${barWidth}" height="${h2}" rx="3" fill="#0284c7"><title>${w} Beer: ${beer[i]}</title></rect>`;

      // Wine bar (emerald)
      const h3 = (wine[i] / maxVal) * chartHeight;
      const y3 = padding.top + chartHeight - h3;
      barsHtml += `<rect x="${xGroup + 44}" y="${y3}" width="${barWidth}" height="${h3}" rx="3" fill="#10b981"><title>${w} Wine: ${wine[i]}</title></rect>`;

      // X Axis Label
      barsHtml += `<text x="${xGroup + barGroupWidth / 2}" y="${svgHeight - 12}" font-size="11" fill="#64748b" text-anchor="middle">${w}</text>`;
    });

    // Y Axis Grid lines
    let gridHtml = '';
    [0, 250, 500, 750, 1000].forEach(val => {
      const y = padding.top + chartHeight - (val / maxVal) * chartHeight;
      gridHtml += `
        <line x1="${padding.left}" y1="${y}" x2="${svgWidth - padding.right}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="3,3" />
        <text x="${padding.left - 8}" y="${y + 4}" font-size="10" fill="#94a3b8" text-anchor="end">${val}</text>
      `;
    });

    el.innerHTML = `
      <div style="display: flex; gap: 16px; margin-bottom: 8px; font-size: 0.8rem;">
        <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#f59e0b;border-radius:2px;"></span> Hard Liquor</span>
        <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#0284c7;border-radius:2px;"></span> Beer</span>
        <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#10b981;border-radius:2px;"></span> Wine</span>
      </div>
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; height: auto;">
        ${gridHtml}
        ${barsHtml}
      </svg>
    `;
  },

  // 2. Weekly Tobacco Purchase Trends (Line Chart)
  renderTobaccoTrends(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const weeks = ['W33', 'W34', 'W35', 'W36', 'W37'];
    const normalCig = [1420, 1380, 1290, 1210, 1140];
    const altCategory = [410, 460, 520, 570, 610];

    const maxVal = 1600;
    const svgWidth = 560;
    const svgHeight = 220;
    const padding = { top: 20, right: 20, bottom: 40, left: 45 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    const getX = idx => padding.left + (idx / (weeks.length - 1)) * chartWidth;
    const getY = val => padding.top + chartHeight - (val / maxVal) * chartHeight;

    let pathNormal = '';
    let pathAlt = '';
    let dotsHtml = '';

    normalCig.forEach((val, i) => {
      const x = getX(i);
      const y = getY(val);
      pathNormal += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
      dotsHtml += `<circle cx="${x}" cy="${y}" r="4" fill="#c2410c"><title>Normal: ${val}</title></circle>`;
      dotsHtml += `<text x="${x}" y="${svgHeight - 12}" font-size="11" fill="#64748b" text-anchor="middle">${weeks[i]}</text>`;
    });

    altCategory.forEach((val, i) => {
      const x = getX(i);
      const y = getY(val);
      pathAlt += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
      dotsHtml += `<circle cx="${x}" cy="${y}" r="4" fill="#047857"><title>Alternative: ${val}</title></circle>`;
    });

    // Y axis grid
    let gridHtml = '';
    [0, 400, 800, 1200, 1600].forEach(val => {
      const y = getY(val);
      gridHtml += `
        <line x1="${padding.left}" y1="${y}" x2="${svgWidth - padding.right}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="3,3" />
        <text x="${padding.left - 8}" y="${y + 4}" font-size="10" fill="#94a3b8" text-anchor="end">${val}</text>
      `;
    });

    el.innerHTML = `
      <div style="display: flex; gap: 16px; margin-bottom: 8px; font-size: 0.8rem;">
        <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#c2410c;border-radius:2px;"></span> Normal Cigarette</span>
        <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#047857;border-radius:2px;"></span> Alternative Category</span>
      </div>
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; height: auto;">
        ${gridHtml}
        <path d="${pathNormal}" fill="none" stroke="#c2410c" stroke-width="3" stroke-linecap="round"/>
        <path d="${pathAlt}" fill="none" stroke="#047857" stroke-width="3" stroke-linecap="round"/>
        ${dotsHtml}
      </svg>
    `;
  },

  // 3. Category-Wise Usage (Donut Chart)
  renderCategoryUsage(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const data = [
      { label: 'Hard Liquor', pct: 24, color: '#d97706' },
      { label: 'Beer', pct: 36, color: '#0284c7' },
      { label: 'Wine', pct: 10, color: '#10b981' },
      { label: 'Normal Cigarette', pct: 20, color: '#ea580c' },
      { label: 'Alternative Tobacco', pct: 10, color: '#059669' }
    ];

    const cx = 100;
    const cy = 100;
    const r = 70;
    const strokeWidth = 24;
    const circumference = 2 * Math.PI * r;

    let accumulatedOffset = 0;
    let segmentsHtml = '';

    data.forEach(item => {
      const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -accumulatedOffset;
      accumulatedOffset += (item.pct / 100) * circumference;

      segmentsHtml += `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent"
          stroke="${item.color}" stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDasharray}" stroke-dashoffset="${strokeDashoffset}"
          transform="rotate(-90 ${cx} ${cy})">
          <title>${item.label}: ${item.pct}%</title>
        </circle>
      `;
    });

    let legendHtml = '<div style="display:flex;flex-direction:column;gap:6px;font-size:0.82rem;">';
    data.forEach(item => {
      legendHtml += `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span style="width:10px;height:10px;background:${item.color};border-radius:2px;"></span>
            ${item.label}
          </span>
          <strong style="color:#0f172a;">${item.pct}%</strong>
        </div>
      `;
    });
    legendHtml += '</div>';

    el.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-around;gap:20px;height:100%;">
        <svg viewBox="0 0 200 200" style="width: 170px; height: 170px;">
          ${segmentsHtml}
          <text x="${cx}" y="${cy - 4}" font-size="14" font-weight="700" fill="#064e3b" text-anchor="middle">Total</text>
          <text x="${cx}" y="${cy + 14}" font-size="11" fill="#64748b" text-anchor="middle">100%</text>
        </svg>
        ${legendHtml}
      </div>
    `;
  },

  // 4. Users Reaching Weekly Limits
  renderLimitsReached(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const categories = [
      { label: 'Hard Liquor (1 unit cap)', count: 480, total: 600, pct: 80, color: '#f59e0b' },
      { label: 'Beer (2 units cap)', count: 290, total: 600, pct: 48, color: '#0284c7' },
      { label: 'Wine (2 units cap)', count: 110, total: 600, pct: 18, color: '#10b981' },
      { label: 'Tobacco Products', count: 320, total: 600, pct: 53, color: '#ea580c' }
    ];

    let barsHtml = '<div style="display:flex;flex-direction:column;gap:14px;width:100%;">';
    categories.forEach(cat => {
      barsHtml += `
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:4px;">
            <span style="font-weight:600;color:#1e293b;">${cat.label}</span>
            <span style="color:#64748b;">${cat.count} / ${cat.total} users (${cat.pct}%)</span>
          </div>
          <div class="progress-track" style="margin:0;height:10px;">
            <div class="progress-fill" style="width:${cat.pct}%;background-color:${cat.color};"></div>
          </div>
        </div>
      `;
    });
    barsHtml += '</div>';

    el.innerHTML = barsHtml;
  },

  // 5. Age-Restricted Login Attempts Telemetry
  renderAgeAttempts(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const attempts = [3, 5, 2, 8, 4, 11, 7];
    const maxVal = 14;

    const svgWidth = 480;
    const svgHeight = 180;
    const padding = { top: 20, right: 20, bottom: 35, left: 35 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;
    const colWidth = chartWidth / days.length;

    let barsHtml = '';
    days.forEach((d, i) => {
      const x = padding.left + i * colWidth + 10;
      const h = (attempts[i] / maxVal) * chartHeight;
      const y = padding.top + chartHeight - h;

      barsHtml += `
        <rect x="${x}" y="${y}" width="24" height="${h}" rx="4" fill="#dc2626">
          <title>${d}: ${attempts[i]} attempts blocked</title>
        </rect>
        <text x="${x + 12}" y="${y - 6}" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle">${attempts[i]}</text>
        <text x="${x + 12}" y="${svgHeight - 10}" font-size="11" fill="#64748b" text-anchor="middle">${d}</text>
      `;
    });

    el.innerHTML = `
      <div style="font-size:0.82rem;color:#991b1b;margin-bottom:8px;font-weight:600;">
        🛡️ Total Preventative Interventions: 40 attempts blocked this week
      </div>
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; height: auto;">
        <line x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${svgWidth - padding.right}" y2="${padding.top + chartHeight}" stroke="#e2e8f0" />
        ${barsHtml}
      </svg>
    `;
  },

  // 6. Time-Slot Utilization
  renderSlotUtilization(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const slots = window.ualState.getTimeSlots();
    let rowsHtml = '<div style="display:flex;flex-direction:column;gap:10px;width:100%;">';

    slots.forEach(slot => {
      const pct = Math.round((slot.booked / slot.capacity) * 100);
      const color = pct >= 80 ? '#d97706' : '#059669';

      rowsHtml += `
        <div style="border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;background:#f8fafc;">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;margin-bottom:6px;">
            <strong style="color:#064e3b;">${slot.start_time} – ${slot.end_time}</strong>
            <span style="font-size:0.8rem;color:#64748b;">${slot.booked} / ${slot.capacity} reserved (${pct}%)</span>
          </div>
          <div class="progress-track" style="margin:0;height:8px;">
            <div class="progress-fill" style="width:${pct}%;background-color:${color};"></div>
          </div>
        </div>
      `;
    });

    rowsHtml += '</div>';
    el.innerHTML = rowsHtml;
  }
};

window.AnalyticsEngine = AnalyticsEngine;
