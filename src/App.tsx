import { useEffect, useMemo, useState } from "react";
import svgPaths from "../imports/svg-609wlp8roy.ts";

type BatchId = 1 | 2 | 3 | 4;
type Risk = "safe" | "critical" | "warning";
type StatusFilter = "all" | Risk;

interface BatchData {
  id: BatchId;
  name: string;
  weight: string;
  status: Risk;
  updatedAgo: string;
}

// ─── SVG icons (from import) ───────────────────────────────────────────────

function BellIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip-bell)">
          <path d={svgPaths.p23925a80} stroke="#64748B" strokeWidth="1.33333" />
          <path d={svgPaths.p11d94f00} stroke="#64748B" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip-bell"><rect fill="white" height="16" width="16" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ThermoIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip-thermo)">
          <path d={svgPaths.p2d7e2c00} stroke="#64748B" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip-thermo"><rect fill="white" height="16" width="16" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WaveIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip-wave)">
          <path d={svgPaths.p293937f0} stroke="#64748B" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip-wave"><rect fill="white" height="16" width="16" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckIconSm({ stroke = "#15803D" }: { stroke?: string }) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <path d="M15 4.5L6.75 12.75L3 9" stroke={stroke} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function AlertTriangleSm({ stroke = "#DC2626" }: { stroke?: string }) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <path d="M7.72 2.9L1.37 13.5a1.5 1.5 0 001.28 2.25h12.7a1.5 1.5 0 001.28-2.25L10.28 2.9a1.5 1.5 0 00-2.56 0z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="7" x2="9" y2="10" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="12.5" x2="9.01" y2="12.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function InfoCircleSm({ stroke = "#92400E" }: { stroke?: string }) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <circle cx="9" cy="9" r="7.5" stroke={stroke} strokeWidth="1.5" />
        <path d="M9 6v4M9 12h.01" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────

const batches: BatchData[] = [
  { id: 1 as BatchId, name: "Pineapple #001", weight: "500 kg", status: "safe" as const, updatedAgo: "Updated 5 min ago" },
  { id: 2 as BatchId, name: "Banana #002", weight: "750 kg", status: "critical" as const, updatedAgo: "Updated 2 min ago" },
  { id: 3 as BatchId, name: "Mango #003", weight: "620 kg", status: "warning" as const, updatedAgo: "Updated 8 min ago" },
  { id: 4 as BatchId, name: "Papaya #004", weight: "410 kg", status: "safe" as const, updatedAgo: "Updated 12 min ago" },
];

interface GaugeData { value: string; unit: string; label: string; color: "green" | "red" | "yellow" }

interface PanelData {
  batchLabel: string;
  gauges: GaugeData[];
  chartPoints: { temp: string; hum: string; eth: string };
  risk: Risk;
  riskTitle: string;
  riskSubtitle: string;
  riskStatusText: string;
  riskBatchLabel: string;
  recLabel: string;
  recItems: string[];
  spoilWarning: string;
}

const panels: Record<BatchId, PanelData> = {
  1: {
    batchLabel: "Pineapple #001",
    gauges: [
      { value: "26.5°", unit: "Celsius", label: "Temperature", color: "green" },
      { value: "70%", unit: "Humidity", label: "Moisture", color: "green" },
      { value: "2.1", unit: "ppm", label: "Ethylene Gas", color: "green" },
    ],
    chartPoints: {
      temp: "0,140 54,138 108,136 162,135 216,136 270,138 324,140 378,138 432,137",
      hum: "0,55 54,56 108,58 162,60 216,58 270,56 324,55 378,56 432,57",
      eth: "0,195 54,195 108,194 162,194 216,195 270,195 324,194 378,195 432,195",
    },
    risk: "safe",
    riskTitle: "Status Check",
    riskSubtitle: "Pineapple #001",
    riskStatusText: "SAFE",
    riskBatchLabel: "Batch #001 — Pineapple",
    recLabel: "All Clear:",
    recItems: [
      "All readings are within the safe range",
      "No action needed",
      "Next check recommended in 2 hours",
    ],
    spoilWarning: "Everything looks great! Your pineapples are in good condition.",
  },
  2: {
    batchLabel: "Banana #002",
    gauges: [
      { value: "34.2°", unit: "Celsius", label: "Temperature", color: "red" },
      { value: "62%", unit: "Humidity", label: "Moisture", color: "green" },
      { value: "8.4", unit: "ppm", label: "Ethylene Gas", color: "red" },
    ],
    chartPoints: {
      temp: "0,160 54,150 108,140 162,125 216,110 270,90 324,70 378,60 432,58",
      hum: "0,30 54,34 108,40 162,48 216,56 270,64 324,70 378,74 432,76",
      eth: "0,194 54,193 108,192 162,190 216,187 270,184 324,181 378,178 432,175",
    },
    risk: "critical",
    riskTitle: "Risk Alert",
    riskSubtitle: "Current Assessment",
    riskStatusText: "CRITICAL",
    riskBatchLabel: "Batch #002 — Banana",
    recLabel: "What You Should Do:",
    recItems: [
      "Call your transporter for pickup right away",
      "Move bananas to cold storage to slow ripening",
      "Check back in 1 hour if you can't move them yet",
    ],
    spoilWarning: "Your bananas may spoil in about 4 hours if not moved!",
  },
  3: {
    batchLabel: "Mango #003",
    gauges: [
      { value: "30.8°", unit: "Celsius", label: "Temperature", color: "yellow" },
      { value: "68%", unit: "Humidity", label: "Moisture", color: "green" },
      { value: "4.2", unit: "ppm", label: "Ethylene Gas", color: "green" },
    ],
    chartPoints: {
      temp: "0,150 54,145 108,138 162,130 216,120 270,112 324,105 378,100 432,96",
      hum: "0,50 54,52 108,55 162,56 216,58 270,60 324,62 378,64 432,65",
      eth: "0,195 54,194 108,194 162,193 216,192 270,192 324,191 378,190 432,190",
    },
    risk: "warning",
    riskTitle: "Risk Alert",
    riskSubtitle: "Current Assessment",
    riskStatusText: "ACT SOON",
    riskBatchLabel: "Batch #003 — Mango",
    recLabel: "What You Should Do:",
    recItems: [
      "Temperature is rising — move to a shaded area",
      "Check back in 30 minutes",
      "Prepare cold storage as a backup",
    ],
    spoilWarning: "Not critical yet, but don't wait too long to act.",
  },
  4: {
    batchLabel: "Papaya #004",
    gauges: [
      { value: "25.8°", unit: "Celsius", label: "Temperature", color: "green" },
      { value: "72%", unit: "Humidity", label: "Moisture", color: "green" },
      { value: "1.8", unit: "ppm", label: "Ethylene Gas", color: "green" },
    ],
    chartPoints: {
      temp: "0,145 54,144 108,142 162,140 216,142 270,143 324,144 378,142 432,143",
      hum: "0,48 54,50 108,52 162,50 216,48 270,50 324,52 378,50 432,49",
      eth: "0,196 54,196 108,195 162,196 216,196 270,195 324,196 378,196 432,196",
    },
    risk: "safe",
    riskTitle: "Status Check",
    riskSubtitle: "Papaya #004",
    riskStatusText: "SAFE",
    riskBatchLabel: "Batch #004 — Papaya",
    recLabel: "All Clear:",
    recItems: [
      "All readings are within the safe range",
      "Storage conditions are ideal for papayas",
      "Next check recommended in 3 hours",
    ],
    spoilWarning: "Everything looks great! Your papayas are in good condition.",
  },
};

const riskCfg: Record<Risk, {
  border: string; headerIconBg: string; headerIconStroke: string;
  circleBg: string; ring: string; statusText: string;
  recBg: string; recBorder: string; recLabelColor: string; recArrow: string;
  spoilBg: string; spoilText: string;
  recCheckStroke: string;
}> = {
  safe: {
    border: "#dcfce7", headerIconBg: "bg-[#f0fdf4]", headerIconStroke: "#15803D",
    circleBg: "bg-[#15803d]", ring: "#15803d", statusText: "text-[#15803d]",
    recBg: "bg-[#f0fdf4]", recBorder: "border-[#22c55e]", recLabelColor: "text-[#15803d]", recArrow: "text-[#22c55e]",
    spoilBg: "bg-[#f0fdf4]", spoilText: "text-[#15803d]",
    recCheckStroke: "#15803D",
  },
  critical: {
    border: "#fee2e2", headerIconBg: "bg-[#fee2e2]", headerIconStroke: "#DC2626",
    circleBg: "bg-[#ef4444]", ring: "#ef4444", statusText: "text-[#dc2626]",
    recBg: "bg-[#fef2f2]", recBorder: "border-[#ef4444]", recLabelColor: "text-[#dc2626]", recArrow: "text-[#ef4444]",
    spoilBg: "bg-[#fee2e2]", spoilText: "text-[#dc2626]",
    recCheckStroke: "#DC2626",
  },
  warning: {
    border: "#fef3c7", headerIconBg: "bg-[#fef3c7]", headerIconStroke: "#92400E",
    circleBg: "bg-[#f59e0b]", ring: "#f59e0b", statusText: "text-[#92400e]",
    recBg: "bg-[#fffbeb]", recBorder: "border-[#f59e0b]", recLabelColor: "text-[#92400e]", recArrow: "text-[#f59e0b]",
    spoilBg: "bg-[#fef3c7]", spoilText: "text-[#92400e]",
    recCheckStroke: "#92400E",
  },
};

const gaugeCfg: Record<"green" | "red" | "yellow", { border: string; bg: string }> = {
  green: { border: "border-[#15803d]", bg: "bg-[#f0fdf4]" },
  red: { border: "border-[#780000]", bg: "bg-[#fef2f2]" },
  yellow: { border: "border-[#bc6c25]", bg: "bg-[#fffbeb]" },
};

const statusCfg: Record<"safe" | "critical" | "warning", { bg: string; text: string; label: string }> = {
  safe: { bg: "bg-[#f0fdf4]", text: "text-[#15803d]", label: "SAFE" },
  critical: { bg: "bg-[#fef2f2]", text: "text-[#dc2626]", label: "CRITICAL" },
  warning: { bg: "bg-[#fffbeb]", text: "text-[#92400e]", label: "ACT SOON" },
};

interface AlertItem {
  batch: string;
  level: Exclude<Risk, "safe">;
  desc: string;
  time: string;
}

const alerts: AlertItem[] = [
  { batch: "Banana #002", level: "critical" as const, desc: "Ethylene gas spiked above safe level", time: "2 minutes ago" },
  { batch: "Mango #003", level: "warning" as const, desc: "Temperature rising — keep an eye on it", time: "15 minutes ago" },
  { batch: "Banana #002", level: "critical" as const, desc: "Humidity levels changed unexpectedly", time: "45 minutes ago" },
];

interface DashboardData {
  batches: BatchData[];
  panels: Record<BatchId, PanelData>;
  alerts: AlertItem[];
  sensorUptime: number;
}

const dashboardDefaults: DashboardData = {
  batches,
  panels,
  alerts,
  sensorUptime: 98.2,
};

const statusFilters: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "safe", label: "Safe" },
  { value: "warning", label: "Warning" },
  { value: "critical", label: "Critical" },
];

function normalizeDashboardData(payload?: Partial<DashboardData> | null): DashboardData {
  return {
    batches: payload?.batches?.length ? payload.batches : dashboardDefaults.batches,
    panels: payload?.panels ? { ...dashboardDefaults.panels, ...payload.panels } : dashboardDefaults.panels,
    alerts: payload?.alerts?.length ? payload.alerts : dashboardDefaults.alerts,
    sensorUptime: typeof payload?.sensorUptime === "number" ? payload.sensorUptime : dashboardDefaults.sensorUptime,
  };
}

async function loadDashboardData(): Promise<{ data: DashboardData; source: "live" | "mock"; error: string | null }> {
  const apiBaseUrl = import.meta.env.VITE_HARVESTGUARD_API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    return { data: dashboardDefaults, source: "mock", error: null };
  }

  try {
    const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/dashboard`);

    if (!response.ok) {
      throw new Error(`Dashboard request failed with ${response.status}`);
    }

    const payload = (await response.json()) as Partial<DashboardData>;
    return { data: normalizeDashboardData(payload), source: "live", error: null };
  } catch {
    return {
      data: dashboardDefaults,
      source: "mock",
      error: "Could not load live dashboard data. Showing simulated data instead.",
    };
  }
}

// ─── Sub-components ────────────────────────────────────────────────────────

function RiskHeaderIcon({ risk }: { risk: Risk }) {
  const c = riskCfg[risk];
  return (
    <div className={`${c.headerIconBg} content-stretch flex items-center justify-center relative rounded-[18px] shrink-0 size-[36px]`}>
      {risk === "safe" && <CheckIconSm stroke={c.headerIconStroke} />}
      {risk === "critical" && <AlertTriangleSm stroke={c.headerIconStroke} />}
      {risk === "warning" && <InfoCircleSm stroke={c.headerIconStroke} />}
    </div>
  );
}

function RiskCircleIcon({ risk }: { risk: Risk }) {
  if (risk === "safe") {
    return (
      <div className="relative shrink-0 size-[30px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="30" preserveAspectRatio="none" viewBox="0 0 30 30" width="30">
          <path d="M25 7.5L11.25 21.25L5 15" stroke="white" strokeLinecap="round" strokeWidth="3.125" />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative shrink-0 size-[30px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="30" preserveAspectRatio="none" viewBox="0 0 30 30" width="30">
        <line x1="15" y1="10" x2="15" y2="15" stroke="white" strokeLinecap="round" strokeWidth="3.125" />
        <line x1="15" y1="20" x2="15.01" y2="20" stroke="white" strokeLinecap="round" strokeWidth="3.125" />
      </svg>
    </div>
  );
}

function RecIcon({ risk }: { risk: Risk }) {
  const c = riskCfg[risk];
  if (risk === "safe") return <CheckIconSm stroke={c.recCheckStroke} />;
  if (risk === "critical") return <AlertTriangleSm stroke={c.recCheckStroke} />;
  return <InfoCircleSm stroke={c.recCheckStroke} />;
}

function RiskCard({ panel }: { panel: PanelData }) {
  const c = riskCfg[panel.risk];
  return (
    <div
      className={`bg-white content-stretch flex flex-col gap-[12px] items-start p-[24px] relative rounded-[16px] shrink-0 w-full`}
      style={{ border: `1.6px solid ${c.border}` }}
    >
      {/* Header */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <RiskHeaderIcon risk={panel.risk} />
        <div>
          <p className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] leading-[22.5px] text-[#1e293b]">{panel.riskTitle}</p>
          <p className="font-['Segoe_UI:Regular',sans-serif] text-[12px] leading-[18px] text-[#64748b]">{panel.riskSubtitle}</p>
        </div>
      </div>

      {/* Pulse circle + status text */}
      <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
        {/* Left: pulse wrapper */}
        <div className="content-stretch flex flex-col items-center pt-[12px] relative shrink-0">
          <div className="content-stretch flex flex-col items-center py-[16px] relative shrink-0 w-[161px]">
            <div className="relative flex items-center justify-center" style={{ width: 104, height: 104 }}>
              <style>{`
                @keyframes rPulse {
                  0% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
                  100% { transform: translate(-50%,-50%) scale(1.4); opacity: 0; }
                }
                @keyframes liveDot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
              `}</style>
              <span
                className="absolute rounded-full"
                style={{
                  top: "50%", left: "50%",
                  width: 88, height: 88,
                  border: `2.5px solid ${c.ring}`,
                  animation: "rPulse 2s ease-out infinite",
                }}
              />
              <span
                className="absolute rounded-full"
                style={{
                  top: "50%", left: "50%",
                  width: 104, height: 104,
                  border: `2.5px solid ${c.ring}`,
                  animation: "rPulse 2s ease-out infinite 0.5s",
                }}
              />
              <div className={`relative z-10 ${c.circleBg} flex items-center justify-center rounded-full size-[72px]`}>
                <RiskCircleIcon risk={panel.risk} />
              </div>
            </div>
            <div className={`font-['Segoe_UI:Bold',sans-serif] text-[15px] leading-[22.5px] tracking-[1.2px] pt-[14px] text-center ${c.statusText}`}>
              {panel.riskStatusText}
            </div>
            <div className="font-['Segoe_UI:Regular',sans-serif] text-[12px] leading-[18px] text-[#64748b] pt-[4px] text-center">
              {panel.riskBatchLabel}
            </div>
          </div>
        </div>

        {/* Right: recommendation box */}
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[270px]">
          <div className={`${c.recBg} content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[8px] shrink-0 w-full`}>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <RecIcon risk={panel.risk} />
              <p className={`font-['Segoe_UI:Semibold',sans-serif] leading-[18px] text-[12px] whitespace-nowrap ${c.recLabelColor}`}>{panel.recLabel}</p>
            </div>
            <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full">
              {panel.recItems.map((item, i) => (
                <div key={i} className="content-stretch flex flex-col items-start pl-[16px] py-[4px] relative shrink-0 w-full">
                  <p className="font-['Segoe_UI:Regular',sans-serif] relative shrink-0 text-[#374151] text-[13px] leading-[19.5px]">{item}</p>
                  <p className={`absolute font-['Segoe_UI:Bold',sans-serif] left-0 top-[4px] ${c.recArrow}`}>→</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spoil warning */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <div className={`${c.spoilBg} content-stretch flex flex-col items-center px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-full`}>
          <p className={`font-['Segoe_UI:Semibold',sans-serif] leading-[18px] text-[12px] text-center whitespace-nowrap ${c.spoilText}`}>{panel.spoilWarning}</p>
        </div>
      </div>
    </div>
  );
}

function AirQualityCard({ panel }: { panel: PanelData }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-full">
      {/* Title row */}
      <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full">
        <ThermoIcon />
        <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[22.5px] text-[15px] text-[#1e293b] whitespace-nowrap">{"How's the Air?"}</p>
        <div className="bg-[#22c55e] relative rounded-[4px] shrink-0 size-[8px]" style={{ animation: "liveDot 2s infinite" }} />
        <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[16.5px] text-[11px] text-[#22c55e] whitespace-nowrap">LIVE</p>
      </div>

      {/* Showing label */}
      <div className="content-stretch flex flex-col h-[34px] items-center justify-center pt-[16px] relative shrink-0 w-full">
        <p className="font-['Segoe_UI:Regular',sans-serif] leading-[18px] text-[12px] text-[#64748b] whitespace-nowrap">Showing: {panel.batchLabel}</p>
      </div>

      {/* Gauges */}
      <div className="content-stretch flex gap-[14px] items-center justify-center pt-[12px] relative shrink-0 w-full">
        {panel.gauges.map((g) => {
          const gc = gaugeCfg[g.color];
          return (
            <div key={g.label} className="content-stretch flex flex-col items-start relative shrink-0 w-[100px]">
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                <div className={`[word-break:break-word] ${gc.bg} ${gc.border} border-[5.6px] border-solid content-stretch flex flex-col items-center justify-center not-italic relative rounded-[45px] shrink-0 size-[90px] text-center whitespace-nowrap`}>
                  <p className="font-['Cousine:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#1e293b] text-[16px]">{g.value}</p>
                  <p className="font-['Segoe_UI:Regular',sans-serif] leading-[15px] relative shrink-0 text-[#64748b] text-[10px]">{g.unit}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col h-[26px] items-center pt-[8px] relative shrink-0 w-[100px]">
                <p className="font-['Segoe_UI:Regular',sans-serif] leading-[18px] text-[12px] text-[#64748b] text-center whitespace-nowrap">{g.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="content-stretch flex gap-[16px] h-[44.5px] items-start justify-center pt-[16px] relative shrink-0 w-full">
        {[
          { dot: "bg-[#15803d]", label: "Safe" },
          { dot: "bg-[#f59e0b]", label: "Act Soon" },
          { dot: "bg-[#ef4444]", label: "Critical" },
        ].map(({ dot, label }) => (
          <div key={label} className="content-stretch flex gap-[4px] h-full items-center relative shrink-0">
            <div className={`${dot} relative rounded-[5px] shrink-0 size-[10px]`} />
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16.5px] text-[11px] text-[#64748b] whitespace-nowrap">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartCard({ panel }: { panel: PanelData }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip p-[24px] relative rounded-[16px] shrink-0 w-full">
      {/* Title */}
      <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full">
        <WaveIcon />
        <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[22.5px] text-[15px] text-[#1e293b] whitespace-nowrap">24-Hour Trend — {panel.batchLabel}</p>
      </div>

      {/* Legend */}
      <div className="content-stretch flex gap-[16px] h-[33px] items-center justify-center pt-[16px] relative shrink-0 w-full">
        <div className="content-stretch flex gap-[5px] h-full items-center relative shrink-0">
          <div className="bg-[#ef4444] h-[3px] relative rounded-[2px] shrink-0 w-[18px]" />
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16.5px] text-[11px] text-[#64748b] whitespace-nowrap">Temperature</p>
        </div>
        <div className="content-stretch flex gap-[5px] h-full items-center relative shrink-0">
          <div className="bg-[#3b82f6] h-[3px] relative rounded-[2px] shrink-0 w-[18px]" />
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16.5px] text-[11px] text-[#64748b] whitespace-nowrap">Humidity</p>
        </div>
        <div className="content-stretch flex gap-[5px] h-full items-center relative shrink-0">
          <div className="border-[#f59e0b] border-dashed border-t-[1.6px] h-[3px] relative rounded-[2px] shrink-0 w-[18px]" />
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16.5px] text-[11px] text-[#64748b] whitespace-nowrap">Ethylene</p>
        </div>
      </div>

      {/* Chart area */}
      <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full">
        <div className="content-stretch flex items-start pl-[25px] pr-[45px] relative shrink-0 w-full">
          {/* Chart container */}
          <div className="border-[#cbd5e1] border-b-[0.8px] border-l-[0.8px] border-r-[0.8px] border-solid h-[200px] overflow-clip relative rounded-bl-[4px] rounded-br-[4px] shrink-0 flex-1">
            {/* Zone backgrounds */}
            <div className="absolute bg-gradient-to-b from-[rgba(254,202,202,0.5)] h-[59.75px] left-0 to-[rgba(254,226,226,0.2)] top-0 w-full" />
            <div className="absolute bg-[rgba(254,243,199,0.15)] h-[49.8px] left-0 top-[59.75px] w-full" />
            <div className="absolute bg-gradient-to-t from-[rgba(187,247,208,0.4)] h-[89.638px] left-0 to-[rgba(220,252,231,0.1)] top-[109.56px] w-full" />
            {/* Grid lines */}
            <div className="absolute bg-[#e2e8f0] h-px left-0 top-[49.8px] w-full" />
            <div className="absolute bg-[#e2e8f0] h-px left-0 top-[99.6px] w-full" />
            <div className="absolute bg-[#e2e8f0] h-px left-0 top-[149.4px] w-full" />
            {/* SVG lines */}
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 432 199">
              <path d={`M ${panel.chartPoints.temp}`} stroke="#EF4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.96386" fill="none" />
              <path d={`M ${panel.chartPoints.hum}`} stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.96386" fill="none" />
              <path d={`M ${panel.chartPoints.eth}`} stroke="#F59E0B" strokeDasharray="9.48 4.74" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.37109" fill="none" />
            </svg>
          </div>
          {/* Y-axis left */}
          <div className="absolute left-0 top-0 h-[200px] w-[26px] flex flex-col justify-between items-end pr-[6px] font-['Cousine:Regular',sans-serif] text-[10px] text-[#64748b] leading-[15px]">
            {["40.0", "35.0", "30.0", "25.0", "20.0"].map((v) => <p key={v} className="relative shrink-0">{v}</p>)}
          </div>
          {/* Y-axis right */}
          <div className="absolute right-0 top-0 h-[200px] w-[36px] flex flex-col justify-between items-start pl-[6px] font-['Cousine:Regular',sans-serif] text-[10px] text-[#64748b] leading-[15px]">
            {["100.0", "75.0", "50.0", "25.0", "0.0"].map((v) => <p key={v} className="relative shrink-0">{v}</p>)}
          </div>
        </div>
        {/* Time labels */}
        <div className="content-stretch flex h-[29px] items-start justify-between pl-[18px] pr-[41px] pt-[14px] relative shrink-0 w-full">
          {["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM", "3AM", "Now"].map((t) => (
            <p key={t} className="font-['Cousine:Regular',sans-serif] leading-[15px] text-[10px] text-[#94a3b8] whitespace-nowrap">{t}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertsCard({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="bg-white flex flex-col p-[24px] rounded-[16px] w-full h-full">
      {/* Header */}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <BellIcon />
          <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[22.5px] text-[15px] text-[#1e293b] whitespace-nowrap">Recent Alerts</p>
        </div>
        <div className="bg-[#fee2e2] content-stretch flex flex-col items-start px-[8px] py-[3px] relative rounded-[10px] shrink-0">
          <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[16.5px] text-[11px] text-[#dc2626] whitespace-nowrap">3 new</p>
        </div>
      </div>

      {/* Alert items */}
      {alerts.map((a, i) => (
        <div
          key={i}
          className={`content-stretch flex flex-col items-start relative shrink-0 w-full ${i === 0 ? "pt-[16px]" : i === alerts.length - 1 ? "py-[10px]" : "pt-[10px]"}`}
        >
          <div className="bg-[#f8fafc] content-stretch flex flex-col items-start p-[12px] relative rounded-[6px] shrink-0 w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[19.5px] text-[13px] text-[#1e293b] whitespace-nowrap">{a.batch}</p>
              <div
                className={`content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[8px] shrink-0 ${
                  a.level === "critical" ? "bg-[#fef2f2]" : "bg-[#fffbeb]"
                }`}
              >
                <p className={`font-['Segoe_UI:Semibold',sans-serif] leading-[15px] text-[10px] whitespace-nowrap ${a.level === "critical" ? "text-[#dc2626]" : "text-[#92400e]"}`}>
                  {a.level === "critical" ? "Critical" : "Watch"}
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col h-[22px] items-start pt-[4px] relative shrink-0 w-full">
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[18px] text-[12px] text-[#64748b] whitespace-nowrap">{a.desc}</p>
            </div>
            <div className="content-stretch flex flex-col h-[21px] items-start pt-[4px] relative shrink-0 w-full">
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16.5px] text-[11px] text-[#94a3b8] whitespace-nowrap">{a.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BatchCard({ batch, selected, onClick }: { batch: BatchData; selected: boolean; onClick: () => void }) {
  const sc = statusCfg[batch.status];
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${batch.name}, ${sc.label.toLowerCase()}, ${batch.weight}`}
      className={`bg-white flex flex-col items-start p-[20px] rounded-[16px] w-full h-full cursor-pointer transition-shadow duration-150 text-left focus:outline-none focus:ring-2 focus:ring-[#283618] focus:ring-offset-2`}
      style={{
        border: selected ? "2px solid #283618" : "2px solid transparent",
        boxShadow: selected ? "-1px 4px 4px 0px rgba(0,0,0,0.25)" : "none",
      }}
      onClick={onClick}
    >
      {/* Name + status badge on same row, badge pushed right */}
      <div className="flex items-center justify-between gap-[8px] shrink-0 w-full">
        <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[21px] text-[14px] text-[#1e293b] whitespace-nowrap">{batch.name}</p>
        <div className={`${sc.bg} flex items-center px-[10px] py-[4px] rounded-[20px] shrink-0`}>
          <p className={`font-['Segoe_UI:Semibold',sans-serif] leading-[16.5px] text-[11px] whitespace-nowrap ${sc.text}`}>{sc.label}</p>
        </div>
      </div>
      {/* Weight */}
      <div className="flex flex-col items-start pt-[6px] shrink-0 w-full">
        <p className="font-['Segoe_UI:Regular',sans-serif] leading-[18px] text-[12px] text-[#64748b] whitespace-nowrap">{batch.weight}</p>
      </div>
      {/* Footer — pushed to bottom */}
      <div className="flex flex-col items-center pt-[8px] w-full mt-auto">
        <div className="border-[#f1f5f9] border-solid border-t-[0.8px] content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full">
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16.5px] text-[11px] text-[#94a3b8] whitespace-nowrap">{batch.updatedAgo}</p>
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16.5px] text-[11px] text-[#283618] whitespace-nowrap">Tap for details ›</p>
        </div>
      </div>
    </button>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [selected, setSelected] = useState<BatchId>(1);
  const [now, setNow] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardData>(dashboardDefaults);
  const [dashboardSource, setDashboardSource] = useState<"live" | "mock">("mock");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function run() {
      setIsLoading(true);
      const result = await loadDashboardData();

      if (!active) {
        return;
      }

      setDashboardData(result.data);
      setDashboardSource(result.source);
      setError(result.error);
      setIsLoading(false);
    }

    run();

    return () => {
      active = false;
    };
  }, [refreshKey]);

  const filteredBatches = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return dashboardData.batches.filter((batch) => {
      const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [batch.name, batch.weight, batch.updatedAgo].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    });
  }, [dashboardData.batches, searchQuery, statusFilter]);

  useEffect(() => {
    if (!filteredBatches.length) {
      return;
    }

    if (!filteredBatches.some((batch) => batch.id === selected)) {
      setSelected(filteredBatches[0].id);
    }
  }, [filteredBatches, selected]);

  const selectedBatch = dashboardData.batches.find((batch) => batch.id === selected) ?? dashboardData.batches[0] ?? dashboardDefaults.batches[0];
  const panel = dashboardData.panels[selected] ?? dashboardDefaults.panels[selectedBatch.id];
  const activeCount = dashboardData.batches.filter((batch) => batch.status === "safe").length;
  const attentionCount = dashboardData.batches.filter((batch) => batch.status !== "safe").length;
  const sourceLabel = dashboardSource === "live" ? "Live API" : "Simulated data";

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(now);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  return (
    <div className="bg-[#f5f6fa] flex flex-col relative h-screen w-full overflow-hidden">
      {/* HEADER */}
      <header className="bg-white border-[#e2e8f0] border-b-[0.8px] border-solid content-stretch flex items-center justify-between px-[32px] py-[16px] relative shrink-0 w-full sticky top-0 z-10">
        {/* Logo */}
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
          <div className="bg-[#15803d] relative rounded-[8px] shrink-0 size-[36px]" />
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <p className="font-['Segoe_UI:Bold',sans-serif] leading-[27px] text-[18px] whitespace-nowrap">
              <span className="text-[#1a1f2e]">HarvestGuard </span>
              <span className="text-[#283618]">AI</span>
            </p>
          </div>
        </div>
        {/* Right: welcome + date + bell */}
        <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[0] text-[#64748b] text-[0px] whitespace-nowrap">
              <span className="leading-[21px] text-[14px]">Welcome,</span>
              <span className="font-['Segoe_UI:Bold',sans-serif] leading-[21px] text-[#1e293b] text-[14px]">{" Juan!"}</span>
            </p>
          </div>
          <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start px-[12px] py-[6px] relative rounded-[20px] shrink-0">
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[18px] text-[12px] text-[#64748b] whitespace-nowrap">{formattedDate} · {formattedTime}</p>
          </div>
          <div className="bg-[#eef6ef] content-stretch flex items-center px-[10px] py-[6px] relative rounded-[20px] shrink-0">
            <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[18px] text-[11px] text-[#15803d] whitespace-nowrap">{sourceLabel}</p>
          </div>
          <button
            type="button"
            className="bg-[#f1f5f9] content-stretch flex items-center justify-center relative rounded-[18px] shrink-0 size-[36px] focus:outline-none focus:ring-2 focus:ring-[#283618] focus:ring-offset-2"
            aria-label="Refresh dashboard data"
            onClick={() => setRefreshKey((value) => value + 1)}
          >
            <span className="font-['Segoe_UI:Semibold',sans-serif] text-[14px] text-[#1e293b]">↻</span>
          </button>
          <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center relative rounded-[18px] shrink-0 size-[36px]">
            <BellIcon />
            <div className="absolute bg-[#ef4444] content-stretch flex items-center justify-center left-[22px] rounded-[8px] size-[16px] top-[-2px]" aria-hidden="true">
              <p className="font-['Segoe_UI:Bold',sans-serif] leading-[15px] text-[10px] text-white whitespace-nowrap">3</p>
            </div>
          </div>
        </div>
      </header>

      {/* SUMMARY STRIP */}
      <div className="bg-white border-[#e2e8f0] border-b-[0.8px] border-solid content-stretch flex items-center justify-between gap-[16px] px-[32px] py-[12px] relative shrink-0 w-full">
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 flex-wrap">
          {[
            { dot: "bg-[#22c55e]", bold: String(activeCount), rest: " Active Batches" },
            { dot: "bg-[#ef4444]", bold: String(attentionCount), rest: " Needs Attention" },
            { dot: "bg-[#3b82f6]", bold: `${dashboardData.sensorUptime.toFixed(1)}%`, rest: " Sensors Working" },
          ].map(({ dot, bold, rest }) => (
            <div key={rest} className="content-stretch flex gap-[6px] items-center relative self-stretch shrink-0">
              <div className={`${dot} relative rounded-[4px] shrink-0 size-[8px]`} />
              <div className="content-stretch flex flex-col items-start relative shrink-0">
                <p className="font-['Segoe_UI:Bold',sans-serif] leading-[0] text-[#1e293b] text-[0px] whitespace-nowrap">
                  <span className="leading-[19.5px] text-[13px]">{bold}</span>
                  <span className="font-['Segoe_UI:Regular',sans-serif] leading-[19.5px] text-[#64748b] text-[13px]">{rest}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="content-stretch flex items-center gap-[12px] shrink-0 flex-wrap justify-end">
          <label className="bg-[#f8fafc] border-[#e2e8f0] border-solid border-[1px] content-stretch flex items-center gap-[8px] px-[12px] py-[8px] relative rounded-[12px] shrink-0">
            <span className="sr-only">Search batches</span>
            <span aria-hidden="true" className="text-[#94a3b8]">⌕</span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search batches"
              className="bg-transparent border-none outline-none font-['Segoe_UI:Regular',sans-serif] text-[12px] text-[#1e293b] placeholder:text-[#94a3b8] w-[160px]"
            />
          </label>
          <div className="content-stretch flex items-center gap-[6px] flex-wrap" role="group" aria-label="Batch status filter">
            {statusFilters.map((filter) => {
              const active = statusFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-[10px] py-[8px] rounded-[12px] border-[1px] border-solid font-['Segoe_UI:Semibold',sans-serif] text-[11px] leading-[16px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#283618] focus:ring-offset-2 ${active ? "bg-[#283618] border-[#283618] text-white" : "bg-white border-[#e2e8f0] text-[#64748b]"}`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-[#fffbeb] border-b border-[#f59e0b] px-[32px] py-[10px] text-[#92400e] text-[12px]" role="alert">
          {error}
        </div>
      )}

      {/* MAIN — fills remaining viewport height, no outer scroll */}
      <main className="flex flex-1 gap-[12px] overflow-hidden px-[32px] py-[24px] w-full" aria-busy={isLoading}>

        {/* Left: Batch cards — fills full height, cards share space equally */}
        <section className="flex flex-col gap-[12px] shrink-0 w-[267px] h-full" aria-label="Batch list">
          {isLoading ? (
            <div className="flex flex-col gap-[12px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white border border-[#e2e8f0] animate-pulse rounded-[16px] h-[132px]" />
              ))}
            </div>
          ) : filteredBatches.length ? (
            filteredBatches.map((batch) => (
              <div key={batch.id} className="flex-1 min-h-0">
                <BatchCard batch={batch} selected={selected === batch.id} onClick={() => setSelected(batch.id)} />
              </div>
            ))
          ) : (
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[20px] text-center text-[#64748b] text-[13px]">
              No batches match your search or filter.
            </div>
          )}
        </section>

        {/* Center: scrollable group of Status Check + Air + Chart */}
        <section className="flex-1 overflow-y-auto flex flex-col gap-[12px] min-w-0" aria-live="polite">
          {isLoading ? (
            <div className="grid gap-[12px]">
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] h-[320px] animate-pulse" />
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] h-[210px] animate-pulse" />
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] h-[340px] animate-pulse" />
            </div>
          ) : filteredBatches.length ? (
            <>
              <RiskCard panel={panel} />
              <AirQualityCard panel={panel} />
              <ChartCard panel={panel} />
            </>
          ) : (
            <div className="bg-white border border-dashed border-[#cbd5e1] rounded-[16px] p-[28px] text-center text-[#64748b]">
              <p className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-[#1e293b]">No batch selected</p>
              <p className="pt-[8px] text-[13px]">Try a different search term or status filter.</p>
            </div>
          )}
        </section>

        {/* Right: Alerts — stretches full height, no scroll */}
        <section className="shrink-0 w-[330px] flex flex-col" aria-label="Recent alerts">
          {isLoading ? (
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] h-full animate-pulse" />
          ) : (
            <AlertsCard alerts={dashboardData.alerts} />
          )}
        </section>

      </main>
    </div>
  );
}
