import React, { useState } from 'react';
import { SOC_ALERTS } from '../data/portfolioData.ts';
import { SocAlert } from '../types.ts';
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
  Sparkles
} from 'lucide-react';

export const SocOperations: React.FC = () => {
  const [alerts, setAlerts] = useState<SocAlert[]>(SOC_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string>(SOC_ALERTS[0].id);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const workflowSteps = [
    { label: 'Security Event', desc: 'Raw telemetry capture' },
    { label: 'Alert', desc: 'Rule/SIEM trigger' },
    { label: 'Triage', desc: 'False-positive filter' },
    { label: 'Investigation', desc: 'Context & IOC review' },
    { label: 'Escalation', desc: 'Tier 2 / IR transfer' },
    { label: 'Documentation', desc: 'Incident audit log' }
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
      message = `Simulated host/IP containment initiated for ${selectedAlert.id}. Egress blocked.`;
    } else if (actionType === 'escalate') {
      updatedStatus = 'Under Investigation';
      message = `Simulated escalation to Tier 2 Blue Team Lead logged for ${selectedAlert.id}.`;
    } else if (actionType === 'resolve') {
      updatedStatus = 'Closed';
      message = `Incident documented and closed in simulated ticketing system.`;
    }

    setAlerts(prev => prev.map(a => a.id === selectedAlert.id ? { ...a, status: updatedStatus } : a));
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const getSeverityBadge = (severity: SocAlert['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-rose-400 bg-rose-950/60 border-rose-700/40';
      case 'High':
        return 'text-orange-400 bg-orange-950/60 border-orange-700/40';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/60 border-amber-700/40';
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>SOC Operations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Security Operations Center (L1 Triage & Playbooks)
            </h2>
            <div className="h-0.5 w-12 bg-cyan-500 mt-3" />
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 self-start md:self-auto">
            <span className="text-emerald-400 font-semibold">● Simulated SOC Investigation</span>
            <span className="text-slate-500 ml-2">| Educational Lab</span>
          </div>
        </div>

        {/* L1 SOC Workflow Ribbon */}
        <div className="mb-10 p-5 rounded-2xl bg-[#111827] border border-slate-800">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Standard Tier-1 SOC Workflow Protocol</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.label}
                className="relative p-3 rounded-lg bg-[#0a0e17] border border-slate-800/90 text-left"
              >
                <div className="text-[10px] font-mono text-cyan-400 font-bold mb-1">
                  0{idx + 1}. {step.label}
                </div>
                <div className="text-[11px] text-slate-400">
                  {step.desc}
                </div>
                {idx < workflowSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 z-10" />
                )}
              </div>
            ))}
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
              className="text-cyan-400 hover:text-white text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Alert Queue */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>SIMULATED INCIDENT QUEUE</span>
              <span>{alerts.length} ALERTS ACTIVE</span>
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
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadge(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold text-white font-mono mb-1">
                      {alert.title}
                    </h4>

                    <div className="text-xs text-slate-400 truncate mb-2">
                      {alert.eventType}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span className="truncate max-w-[180px]">Src: {alert.sourceIp.split(' ')[0]}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
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
                    <span>Simulated SOC Investigation · {selectedAlert.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono">
                    {selectedAlert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono border ${getSeverityBadge(selectedAlert.severity)}`}>
                    Severity: {selectedAlert.severity}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono border ${getStatusBadge(selectedAlert.status)}`}>
                    Status: {selectedAlert.status}
                  </span>
                </div>
              </div>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 mb-0.5">Timestamp</div>
                  <div className="text-xs font-mono text-slate-200">{selectedAlert.timestamp}</div>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 mb-0.5">Target Username</div>
                  <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedAlert.username}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 mb-0.5">Source IP / Host</div>
                  <div className="text-xs font-mono text-rose-300">{selectedAlert.sourceIp}</div>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0e17] border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 mb-0.5">Destination Target</div>
                  <div className="text-xs font-mono text-slate-200">{selectedAlert.destination}</div>
                </div>
              </div>

              {/* Event Type & MITRE ATT&CK */}
              <div className="p-4 rounded-xl bg-[#0a0e17] border border-slate-800 space-y-2.5 mb-6">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
                  <span className="text-slate-400">Event Classification:</span>
                  <span className="text-white font-semibold">{selectedAlert.eventType}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
                  <span className="text-slate-400">MITRE ATT&CK Tactic:</span>
                  <span className="text-cyan-400">{selectedAlert.investigationDetails.mitreTactic}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
                  <span className="text-slate-400">Detection Mechanism:</span>
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
                  <span>Analyst Action Taken</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  {selectedAlert.analystAction}
                </p>
              </div>

              {/* Recommended Playbook Checklist */}
              <div className="mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Incident Response Playbook Checklist</span>
                  <span className="text-[11px] text-cyan-400">Interactive</span>
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

            {/* Analyst Control Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleSimulateAction('contain')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-rose-950/50 hover:bg-rose-900/60 border border-rose-600/40 text-rose-300 transition-colors cursor-pointer"
                >
                  Simulate Containment
                </button>
                <button
                  onClick={() => handleSimulateAction('escalate')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/40 text-amber-300 transition-colors cursor-pointer"
                >
                  Escalate to Tier 2
                </button>
                <button
                  onClick={() => handleSimulateAction('resolve')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 transition-colors cursor-pointer"
                >
                  Mark Resolved
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-500">
                Mode: Sandbox Demo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
