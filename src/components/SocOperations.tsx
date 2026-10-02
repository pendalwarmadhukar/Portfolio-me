import React, { useState } from 'react';
import { SOC_ALERTS } from '../data/portfolioData.ts';
import { SocAlert } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  ShieldAlert,
  Terminal,
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  User,
  Radio,
  FileCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Sliders,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Server
} from 'lucide-react';

export const SocOperations: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const [viewMode, setViewMode] = useState<'overview' | 'simulator'>('overview');
  const [alerts, setAlerts] = useState<SocAlert[]>(SOC_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string>(SOC_ALERTS[0].id);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const workflowSteps = [
    { label: isHindi ? 'सुरक्षा घटना' : 'Security Event', desc: isHindi ? 'कच्चा टेलीमेट्री संकलन' : 'Raw telemetry capture' },
    { label: isHindi ? 'अलर्ट' : 'Alert', desc: isHindi ? 'नियम / SIEM ट्रिगर' : 'Rule/SIEM trigger' },
    { label: isHindi ? 'ट्राइएज' : 'Triage', desc: isHindi ? 'मिथ्या-सकारात्मक फ़िल्टर' : 'False-positive filter' },
    { label: isHindi ? 'जांच' : 'Investigation', desc: isHindi ? 'संदर्भ और IOC समीक्षा' : 'Context & IOC review' },
    { label: isHindi ? 'एस्केलेशन' : 'Escalation', desc: isHindi ? 'टियर 2 / IR स्थानांतरण' : 'Tier 2 / IR transfer' },
    { label: isHindi ? 'दस्तावेज़ीकरण' : 'Documentation', desc: isHindi ? 'घटना ऑडिट लॉग' : 'Incident audit log' }
  ];

  const handleStepToggle = (stepKey: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const handleSimulateAction = (actionType: 'contain' | 'escalate' | 'resolve') => {
    let updatedStatus: SocAlert['status'] = 'Under Investigation';
    let message = '';

    if (actionType === 'contain') {
      updatedStatus = 'Contained';
      message = isHindi
        ? `${selectedAlert.id} के लिए होस्ट/आईपी नियंत्रण शुरू। बाहर जाने वाला ट्रैफ़िक अवरुद्ध।`
        : `Simulated host/IP containment initiated for ${selectedAlert.id}. Egress blocked.`;
    } else if (actionType === 'escalate') {
      updatedStatus = 'Under Investigation';
      message = isHindi
        ? `${selectedAlert.id} के लिए टियर 2 ब्लू टीम लीड को एस्केलेशन दर्ज किया गया।`
        : `Simulated escalation to Tier 2 Blue Team Lead logged for ${selectedAlert.id}.`;
    } else if (actionType === 'resolve') {
      updatedStatus = 'Closed';
      message = isHindi
        ? `सिम्युलेटेड टिकटिंग सिस्टम में घटना प्रलेखित और बंद कर दी गई।`
        : `Incident documented and closed in simulated ticketing system.`;
    }

    setAlerts(prev => prev.map(a => a.id === selectedAlertId ? { ...a, status: updatedStatus } : a));
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const getSeverityBadge = (severity: SocAlert['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-rose-400 bg-rose-950/60 border-rose-700/40';
      case 'High':
        return 'text-amber-400 bg-amber-950/60 border-amber-700/40';
      case 'Medium':
        return 'text-amber-300 bg-amber-950/40 border-amber-700/30';
      case 'Low':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-700/40';
    }
  };

  const getStatusBadge = (status: SocAlert['status']) => {
    switch (status) {
      case 'Open':
        return 'text-rose-400 bg-rose-950/40 border-rose-800/40';
      case 'Under Investigation':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'Contained':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40';
      case 'Closed':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
    }
  };

  return (
    <section id="soc" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0e17] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>{t.soc.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.soc.title}
            </h2>
            <div className="h-0.5 w-12 bg-cyan-500 mt-3" />
          </div>

          {/* View Mode Toggle: Summary vs Live Simulator */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#111827] border border-slate-800 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('overview')}
              className={`btn-filter ${
                viewMode === 'overview' ? 'btn-filter-active' : 'btn-filter-inactive'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isHindi ? 'संक्षिप्त सारांश' : 'High-Level Overview'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('simulator')}
              className={`btn-filter ${
                viewMode === 'simulator' ? 'btn-filter-active' : 'btn-filter-inactive'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isHindi ? 'लाइव सिमुलेटर' : 'Interactive Lab'}</span>
            </button>
          </div>
        </div>

        {/* Action Feedback Banner */}
        {actionFeedback && (
          <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-200 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{actionFeedback}</span>
            </div>
            <button
              onClick={() => setActionFeedback(null)}
              className="text-cyan-400 hover:text-white text-xs cursor-pointer"
            >
              {isHindi ? 'बंद करें' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* MODE 1: HIGH-LEVEL SUMMARY VIEW (Issue 10 - Eliminates Cognitive Overload) */}
        {viewMode === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Core Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#111827] border border-slate-800 hover:border-cyan-500/30 transition-all shadow-lg">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 w-fit mb-4 text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white font-mono mb-2">
                  {isHindi ? 'L1 अलर्ट ट्राइएज और विश्लेषण' : 'L1 Alert Triage & Response'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'SIEM अलर्ट्स का त्वरित विश्लेषण, झूठी चेतावनियों की पहचान और गंभीरता के आधार पर प्राथमिक जांच।'
                    : 'Systematic analysis of incoming SIEM telemetry, false-positive validation, and immediate severity assessment within defined SOC response SLAs.'}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mean Time to Triage &lt; 15m</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#111827] border border-slate-800 hover:border-cyan-500/30 transition-all shadow-lg">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 w-fit mb-4 text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white font-mono mb-2">
                  {isHindi ? 'MITRE ATT&CK प्लेबुक क्रियान्वयन' : 'Standardized IR Playbooks'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'ब्रूट फोर्स, फ़िशिंग और क्रेडेंशियल दुरुपयोग के लिए पूर्व-निर्धारित कंटेनमेंट और एस्केलेशन कदम।'
                    : 'Step-by-step incident containment procedures covering SSH brute-force (T1110), suspicious logins, and AWS privilege escalation playbooks.'}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span>MITRE Matrix Aligned</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#111827] border border-slate-800 hover:border-cyan-500/30 transition-all shadow-lg">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 w-fit mb-4 text-cyan-400">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white font-mono mb-2">
                  {isHindi ? 'टेलीमेट्री और लॉग सहसंबंध' : 'SIEM & Detection Telemetry'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'Linux auth.log, Wazuh HIDS, Nmap और AWS CloudTrail से लॉग सहसंबंध और विसंगति पहचान।'
                    : 'Log correlation across Linux host auth logs, Wazuh HIDS detection rules, network flow monitors, and AWS CloudTrail audit events.'}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Wazuh · Splunk · Wireshark</span>
                </div>
              </div>
            </div>

            {/* Interactive Simulator Invitation Callout */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#111827] to-cyan-950/40 border border-cyan-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>{t.soc.simulatedBanner}</span>
                  <span className="text-slate-500">•</span>
                  <span>{alerts.length} Active Incidents</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                  {isHindi ? 'इंटरैक्टिव सुरक्षा परिचालन केंद्र सिमुलेटर' : 'Ready to test the live SOC workbench?'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'लाइव घटनाओं की जांच करें, टेलीमेट्री डेटा देखें, अनुशंसित प्लेबुक चरणों को पूरा करें और सिम्युलेटेड कंटेनमेंट निष्पादित करें।'
                    : 'Explore the full analyst dashboard: inspect live host telemetry, review MITRE tactics, execute step-by-step containment actions, and document triage outcomes.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewMode('simulator')}
                className="btn-primary shrink-0 text-sm py-3 px-5"
              >
                <span>{isHindi ? 'लाइव सिमुलेटर खोलें' : 'Launch Interactive SOC Simulator'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: FULL INTERACTIVE WORKBENCH SIMULATOR */}
        {viewMode === 'simulator' && (
          <div className="space-y-8 animate-fade-in">
            {/* L1 SOC Workflow Ribbon */}
            <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.soc.workflowTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('overview')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  ← {isHindi ? 'वापस सारांश पर जाएं' : 'Back to High-Level Summary'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {workflowSteps.map((step, idx) => (
                  <div
                    key={step.label}
                    className="relative p-3 rounded-lg bg-[#0a0e17] border border-slate-800/90 text-left"
                  >
                    <div className="text-xs font-mono text-cyan-400 font-bold mb-1">
                      0{idx + 1}. {step.label}
                    </div>
                    <div className="text-xs text-slate-400">
                      {step.desc}
                    </div>
                    {idx < workflowSteps.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Interactive Alert Queue */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>{t.soc.incidentQueueTitle}</span>
                  <span>{alerts.length} {t.soc.alertsActive}</span>
                </div>

                <div className="space-y-2.5">
                  {alerts.map((alert) => {
                    const isSelected = alert.id === selectedAlertId;
                    return (
                      <div
                        key={alert.id}
                        onClick={() => setSelectedAlertId(alert.id)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#151f33] border-cyan-500/60 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                            : 'bg-[#111827] border-slate-800/80 hover:border-slate-700 hover:bg-[#131c2d]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-slate-400">
                            {alert.id}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getSeverityBadge(alert.severity)}`}>
                              {alert.severity}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getStatusBadge(alert.status)}`}>
                              {alert.status}
                            </span>
                          </div>
                        </div>

                        {/* Proper Heading Hierarchy: h3 inside section under h2 */}
                        <h3 className="text-sm font-semibold text-white font-mono mb-1">
                          {alert.title}
                        </h3>

                        <div className="text-xs text-slate-400 truncate mb-2">
                          {alert.eventType}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="truncate max-w-[180px]">Src: {alert.sourceIp.split(' ')[0]}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {alert.timestamp.split(' ')[1]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Detailed Investigation Pane */}
              <div className="lg:col-span-7 rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
                <div>
                  {/* Alert Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                        <Radio className="w-3.5 h-3.5 animate-pulse" />
                        <span>{t.soc.simulatedBanner} · {selectedAlert.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white font-mono">
                        {selectedAlert.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-mono border ${getSeverityBadge(selectedAlert.severity)}`}>
                        {selectedAlert.severity}
                      </span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-mono border ${getStatusBadge(selectedAlert.status)}`}>
                        {selectedAlert.status}
                      </span>
                    </div>
                  </div>

                  {/* Telemetry Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-0.5">{t.soc.telemetry.timestamp}</div>
                      <div className="text-xs font-mono text-white">{selectedAlert.timestamp}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-0.5">{t.soc.telemetry.targetUser}</div>
                      <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedAlert.username}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-0.5">{t.soc.telemetry.sourceIp}</div>
                      <div className="text-xs font-mono text-rose-300">{selectedAlert.sourceIp}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-0.5">{t.soc.telemetry.destination}</div>
                      <div className="text-xs font-mono text-white">{selectedAlert.destination}</div>
                    </div>
                  </div>

                  {/* Event Type & MITRE ATT&CK */}
                  <div className="p-4 rounded-xl bg-[#0a0e17] border border-slate-800 space-y-2.5 mb-6">
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
                      <span className="text-slate-400">{t.soc.classification}:</span>
                      <span className="text-white font-semibold">{selectedAlert.eventType}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
                      <span className="text-slate-400">{t.soc.mitre}:</span>
                      <span className="text-cyan-400">{selectedAlert.investigationDetails.mitreTactic}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
                      <span className="text-slate-400">{t.soc.detectionMech}:</span>
                      <span className="text-slate-300">{selectedAlert.investigationDetails.detectionSource}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      {selectedAlert.investigationDetails.description}
                    </div>
                  </div>

                  {/* Analyst Action Taken */}
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 mb-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold mb-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{t.soc.analystActionTitle}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-mono">
                      {selectedAlert.analystAction}
                    </p>
                  </div>

                  {/* Recommended Playbook Checklist */}
                  <div className="mb-6">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                      <span>{t.soc.playbookTitle}</span>
                      <span className="text-xs text-cyan-400">{t.soc.interactive}</span>
                    </div>
                    <div className="space-y-2">
                      {selectedAlert.investigationDetails.recommendedPlaybook.map((step, idx) => {
                        const stepKey = `${selectedAlert.id}-step-${idx}`;
                        const isChecked = !!checkedSteps[stepKey];
                        return (
                          <div
                            key={idx}
                            onClick={() => handleStepToggle(stepKey)}
                            className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 cursor-pointer transition-colors ${
                              isChecked
                                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                                : 'bg-[#0a0e17] border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isChecked ? 'text-emerald-400' : 'text-slate-600'
                              }`}
                            />
                            <span className={isChecked ? 'line-through opacity-80' : ''}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Analyst Control Actions — mt-6 breathing room from text above (Issue 9) */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSimulateAction('contain')}
                      className="btn-ghost hover:border-rose-500/50 hover:text-rose-300"
                    >
                      {t.soc.actions.contain}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateAction('escalate')}
                      className="btn-ghost hover:border-amber-500/50 hover:text-amber-300"
                    >
                      {t.soc.actions.escalate}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateAction('resolve')}
                      className="btn-ghost hover:border-emerald-500/50 hover:text-emerald-300"
                    >
                      {t.soc.actions.resolve}
                    </button>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {t.soc.sandboxMode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
