/**
 * Unakku Avlotha Limit - Alcohol Awareness & Public Health Controller
 * Implements:
 * 1. 3 Comparison Cards (🟢 Without Alcohol, 🟡 Alcohol Use, 🔴 Frequent/Daily Use)
 * 2. Frequency Comparison Tabs (🟢 No alcohol, 🟡 Occasional use, 🔴 Frequent / daily use) across 6 metrics
 * 3. Body & Mind Visual (5 Body organs + 5 Mind & Behavior faculties with SVG pulse points)
 * 4. Responsible Choice Message ("Your health comes first.") + Educational Modals
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render common headers/footers if on standalone page
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("awareness");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  // Awareness Data fallback / source
  const awarenessData = window.TASMAC_AWARENESS_DATA || {
    frequencyMatrix: {
      noAlcohol: {
        label: "No Alcohol",
        badge: "Zero Chemical Risk",
        description: "Complete abstinence from alcohol eliminates toxic exposure and avoids metabolic strain on organs.",
        metrics: {
          sleep: "Natural, undisturbed deep REM sleep cycles with high physical restoration. Waking refreshed without dehydration or grogginess.",
          concentration: "Sustained daytime mental alertness, optimal working memory, and sharp analytical focus.",
          mood: "Stable neurotransmitter balance, resilient emotional baseline, and low baseline physiological anxiety.",
          physicalHealth: "Optimal liver enzyme activity, normal blood pressure, strong cellular immunity, and reduced cancer risk.",
          dependenceRisk: "Zero risk of physical addiction, neurochemical tolerance build-up, or psychological dependence.",
          accidentRisk: "Lowest baseline risk. Fully intact sensory reflexes, motor coordination, and road safety."
        }
      },
      occasional: {
        label: "Occasional Use",
        badge: "Progressive Health Risk",
        description: "Even occasional drinking introduces transient toxicity and neural depression. Risk generally increases as alcohol exposure increases.",
        metrics: {
          sleep: "Sleep onset may feel accelerated, but restorative REM sleep is fragmented, causing frequent night wakeups and daytime fatigue.",
          concentration: "Short-term distraction, reduced complex problem-solving speed, and next-day mental sluggishness.",
          mood: "Short-lived dopamine elevation followed by temporary depressive dips, mood swings, or post-alcohol rebound anxiety.",
          physicalHealth: "The liver prioritizes toxic ethanol breakdown; temporary elevation in blood pressure and acute cellular dehydration.",
          dependenceRisk: "Risk increases if drinking frequency or volume rises over time without strict personal boundaries.",
          accidentRisk: "Substantially heightened for several hours. Reaction times decrease by 20–40% even before overt intoxication is felt."
        }
      },
      frequent: {
        label: "Frequent / Daily Use",
        badge: "High & Cumulative Hazard",
        description: "Chronic daily exposure causes progressive cellular damage, neurochemical adaptation, and systemic medical disorders.",
        metrics: {
          sleep: "Severe sleep fragmentation, chronic micro-arousals, suppression of restorative deep stages, and persistent insomnia.",
          concentration: "Chronic brain fog, diminished prefrontal cortex efficiency, and severe deficits in short-term memory retention.",
          mood: "High vulnerability to clinical depression, severe anxiety disorders, emotional volatility, and irritability.",
          physicalHealth: "Substantially increased risk of alcoholic liver cirrhosis, hypertension, cardiomyopathy, gastritis, and multiple cancers.",
          dependenceRisk: "Very high. Neuroadaptation creates tolerance, strong physical cravings, and severe withdrawal symptoms upon cessation.",
          accidentRisk: "Critically elevated risk of motor vehicle collisions, workplace mishaps, domestic falls, and severe traumatic injuries."
        }
      }
    },
    bodyMindVisual: {
      bodyPoints: [
        { id: "brain", icon: "🧠", label: "Brain", summary: "Neurotransmission & Reflexes", tag: "Central Nervous System", details: "Alcohol depresses central nervous system communications, slows neurotransmission between neurons, shrinks brain tissue over chronic use, and disrupts balance and memory formation in the hippocampus." },
        { id: "heart", icon: "❤️", label: "Heart", summary: "Cardiovascular Dynamics", tag: "Cardiovascular Health", details: "Frequent alcohol use raises blood pressure, stresses arterial walls, and increases risk of arrhythmias (irregular heartbeat), cardiomyopathy (weakened heart muscle), and stroke." },
        { id: "health", icon: "🫁", label: "General health", summary: "Immune System & Cellular Vitality", tag: "Systemic Immunity", details: "Alcohol weakens the body's immune defenses, reducing disease resistance for up to 24 hours after intake. Chronic consumption increases risk of cancers of the mouth, esophagus, colon, and breast." },
        { id: "liver", icon: "🫀", label: "Liver", summary: "Metabolic Filtration & Detox", tag: "Hepatic Organ", details: "The liver processes over 90% of ingested alcohol, generating toxic acetaldehyde. Heavy consumption leads progressively to steatosis (fatty liver), alcoholic hepatitis, fibrosis, and irreversible cirrhosis." },
        { id: "sleep", icon: "😴", label: "Sleep", summary: "Circadian Rhythm & REM Cycles", tag: "Sleep Architecture", details: "Although alcohol acts as a sedative initially, it severely interrupts REM (rapid eye movement) sleep. As blood alcohol levels drop overnight, the body experiences rebound arousal, leading to broken, non-restorative rest." }
      ],
      mindPoints: [
        { id: "concentration", icon: "🧠", label: "Concentration", summary: "Working Memory & Focus", tag: "Cognitive Faculty", details: "Alcohol impairs the frontal lobe's ability to maintain sustained attention, process complex instructions, and retain new information in working memory both during intoxication and the recovery day." },
        { id: "mood", icon: "😊", label: "Mood", summary: "Emotional Regulation", tag: "Neurochemical Balance", details: "While alcohol may temporarily relieve tension, it depletes serotonin and dopamine reserves. The rebound effect frequently triggers heightened anxiety ('hangxiety'), depressive feelings, and emotional irritability." },
        { id: "decision", icon: "🎯", label: "Decision-making", summary: "Risk Assessment & Inhibition", tag: "Executive Function", details: "Alcohol diminishes inhibitions and compromises the brain's risk-evaluation mechanisms, significantly increasing the likelihood of regretful choices, impulsive financial spending, and risky personal behavior." },
        { id: "reaction", icon: "⚡", label: "Reaction time", summary: "Motor Response & Reflexes", tag: "Psychomotor Speed", details: "Even low blood alcohol concentrations (0.02 - 0.05%) noticeably delay muscle response and optical processing. This significantly multiplies the danger when driving, operating tools, or engaging in physical tasks." },
        { id: "wellbeing", icon: "💭", label: "Mental well-being", summary: "Long-Term Psychological Health", tag: "Psychological Resilience", details: "Using alcohol to cope with stress or sadness creates a vicious cycle of chemical reliance. Long-term sobriety or reduced consumption markedly strengthens resilience, self-esteem, and relationship satisfaction." }
      ]
    }
  };

  // State
  let currentFreqTab = "noAlcohol";
  let currentAnatomyNode = "brain";

  // Frequency Tab Switcher
  window.switchFrequencyTab = (tabKey) => {
    currentFreqTab = tabKey;
    const tabBtns = document.querySelectorAll(".freq-tab-btn");
    tabBtns.forEach(btn => {
      btn.classList.remove("active");
      if (btn.classList.contains(`tab-${tabKey === 'noAlcohol' ? 'no-alcohol' : tabKey}`)) {
        btn.classList.add("active");
      }
    });

    const freqData = awarenessData.frequencyMatrix[tabKey] || awarenessData.frequencyMatrix.noAlcohol;

    // Update Badge & Description
    const badgeEl = document.getElementById("freqBadge");
    if (badgeEl) {
      badgeEl.textContent = freqData.badge;
      badgeEl.className = `status-indicator-pill ${tabKey === 'noAlcohol' ? 'status-active' : tabKey === 'occasional' ? 'status-warning' : 'status-restricted'}`;
    }

    const descEl = document.getElementById("freqDesc");
    if (descEl) {
      descEl.textContent = freqData.description;
    }

    // Update Metrics
    const metricsMap = {
      sleep: document.getElementById("metricSleep"),
      concentration: document.getElementById("metricConcentration"),
      mood: document.getElementById("metricMood"),
      physicalHealth: document.getElementById("metricPhysicalHealth"),
      dependenceRisk: document.getElementById("metricDependenceRisk"),
      accidentRisk: document.getElementById("metricAccidentRisk")
    };

    Object.keys(metricsMap).forEach(key => {
      if (metricsMap[key] && freqData.metrics[key]) {
        metricsMap[key].textContent = freqData.metrics[key];
      }
    });
  };

  // Anatomy Point Selector
  window.selectAnatomyPoint = (nodeId) => {
    currentAnatomyNode = nodeId;
    const allNodes = [...(awarenessData.bodyMindVisual.bodyPoints || []), ...(awarenessData.bodyMindVisual.mindPoints || [])];
    const node = allNodes.find(n => n.id === nodeId) || allNodes[0];

    // Update Node Buttons
    const nodeBtns = document.querySelectorAll(".bodymind-node-btn");
    nodeBtns.forEach(btn => {
      if (btn.dataset.nodeId === nodeId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update Pulse Points
    const pulsePoints = document.querySelectorAll(".anatomy-pulse-point");
    pulsePoints.forEach(pt => {
      if (pt.dataset.nodeId === nodeId) {
        pt.classList.add("active");
      } else {
        pt.classList.remove("active");
      }
    });

    // Update Detail Panel
    const detailPanel = document.getElementById("anatomyDetailPanel");
    if (detailPanel && node) {
      detailPanel.innerHTML = `
        <div class="bodymind-detail-header">
          <div class="bodymind-detail-title">
            <span>${node.icon}</span>
            <span>${node.label} — ${node.summary}</span>
          </div>
          <span class="bodymind-detail-tag">${node.tag}</span>
        </div>
        <p class="bodymind-detail-body">
          ${node.details}
        </p>
      `;
    }
  };

  // Initialize interactive elements if on page
  if (document.getElementById("freqBadge")) {
    window.switchFrequencyTab("noAlcohol");
  }
  if (document.getElementById("anatomyDetailPanel")) {
    window.selectAnatomyPoint("brain");
  }

  // Health Resources Modal
  window.openHealthResourcesModal = () => {
    let modal = document.getElementById("healthResourcesModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "healthResourcesModal";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
        <div class="modal-dialog wide">
          <div class="modal-header">
            <div class="flex items-center gap-2">
              <span style="font-size:1.3rem;">🏥</span>
              <h3 class="modal-title">Official Health & De-Addiction Support</h3>
            </div>
            <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
              Free, confidential medical counseling, de-addiction consultation, and crisis psychological support available across Tamil Nadu and nationally:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- Tele-MANAS -->
              <div class="card" style="padding:1rem; border-left:4px solid #0f5a34;">
                <span class="badge badge-success" style="font-size:0.68rem;">Govt. of India 24/7 Helpline</span>
                <h4 style="font-size:1rem; font-weight:800; color:#0f5a34; margin:0.35rem 0 0.15rem;">Tele-MANAS Helpline</h4>
                <div style="font-size:1.2rem; font-weight:900; color:#0f172a;">📞 14416 / 1800-891-4416</div>
                <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.3rem;">
                  Toll-free 24/7 mental health and addiction tele-counseling in Tamil and English.
                </p>
              </div>

              <!-- National De-addiction Helpline -->
              <div class="card" style="padding:1rem; border-left:4px solid #b45309;">
                <span class="badge badge-warning" style="font-size:0.68rem;">Ministry of Social Justice</span>
                <h4 style="font-size:1rem; font-weight:800; color:#b45309; margin:0.35rem 0 0.15rem;">National De-Addiction Helpline</h4>
                <div style="font-size:1.2rem; font-weight:900; color:#0f172a;">📞 1800-11-0031</div>
                <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.3rem;">
                  Free nationwide counseling, rehabilitation referrals, and peer family support.
                </p>
              </div>

              <!-- IMH Kilpauk -->
              <div class="card" style="padding:1rem; border-left:4px solid #0284c7;">
                <span class="badge badge-info" style="font-size:0.68rem;">Chennai Government Facility</span>
                <h4 style="font-size:1rem; font-weight:800; color:#0284c7; margin:0.35rem 0 0.15rem;">Institute of Mental Health (IMH)</h4>
                <div style="font-size:1.1rem; font-weight:800; color:#0f172a;">📞 044-2644 1999 / 2644 1998</div>
                <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.3rem;">
                  Kilpauk, Chennai. Premier state hospital specialized in clinical detox & therapy.
                </p>
              </div>

              <!-- TTK Hospital -->
              <div class="card" style="padding:1rem; border-left:4px solid #16a34a;">
                <span class="badge badge-success" style="font-size:0.68rem;">Non-Profit Pioneer Center</span>
                <h4 style="font-size:1rem; font-weight:800; color:#16a34a; margin:0.35rem 0 0.15rem;">TTK Hospital De-Addiction Center</h4>
                <div style="font-size:1.1rem; font-weight:800; color:#0f172a;">📞 044-2491 2948 / 2491 8461</div>
                <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.3rem;">
                  Shastri Nagar, Adyar, Chennai. Holistic inpatient de-addiction and family counseling.
                </p>
              </div>
            </div>

            <div style="margin-top:1.25rem; text-align:center;">
              <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">Close Support Directory</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Educational Modal
  window.openLearnMoreModal = () => {
    let modal = document.getElementById("learnMoreModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "learnMoreModal";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
        <div class="modal-dialog wide">
          <div class="modal-header">
            <div class="flex items-center gap-2">
              <span style="font-size:1.3rem;">📘</span>
              <h3 class="modal-title">Alcohol Consumption & Metabolic Physiology</h3>
            </div>
            <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">✕</button>
          </div>
          <div class="modal-body" style="line-height:1.6; font-size:0.85rem; color:var(--text-secondary);">
            <h4 style="color:#0f5a34; font-size:1rem; font-weight:800; margin-bottom:0.35rem;">How Alcohol is Processed</h4>
            <p style="margin-bottom:0.75rem;">
              Unlike carbohydrates or proteins, the human body cannot store ethanol. The metabolic pathways prioritize eliminating alcohol before all other nutrients, temporarily halting fat oxidation and glycogen storage.
            </p>

            <h4 style="color:#b45309; font-size:1rem; font-weight:800; margin-bottom:0.35rem;">Immediate Cognitive Impact</h4>
            <p style="margin-bottom:0.75rem;">
              Ethanol acts as an agonist for gamma-aminobutyric acid (GABA), slowing neuronal communication. Reaction times in emergency situations drop significantly, making operating vehicles or machinery critically hazardous.
            </p>

            <h4 style="color:#16a34a; font-size:1rem; font-weight:800; margin-bottom:0.35rem;">The Value of Moderation & Discipline</h4>
            <p style="margin-bottom:1rem;">
              The "Unakku Avlotha Limit" system promotes public awareness of weekly limits (Hard Liquor: max 1 bottle/week OR Beer: max 2/week OR Wine: max 2/week), advance booking, and mindful decisions for health and family welfare.
            </p>

            <div style="text-align:center;">
              <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">Understood</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };
});
