import React, { useState } from 'react';
import { Shield, ToggleLeft, ToggleRight, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PolicyRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  riskScore: number;
  action: 'allow' | 'review' | 'block';
}

interface GoveranceState {
  conscienceEnabled: boolean;
  subconcienceEnabled: boolean;
  policies: PolicyRule[];
  customRules: string[];
}

export const ConscorceModule: React.FC = () => {
  const [state, setState] = useState<GoveranceState>({
    conscienceEnabled: true,
    subconcienceEnabled: false,
    policies: [
      {
        id: '1',
        name: 'Content Safety',
        description: 'Block harmful or illegal content',
        enabled: true,
        riskScore: 95,
        action: 'block',
      },
      {
        id: '2',
        name: 'Privacy Protection',
        description: 'Prevent PII exposure',
        enabled: true,
        riskScore: 85,
        action: 'block',
      },
      {
        id: '3',
        name: 'Bias Detection',
        description: 'Flag potentially biased outputs',
        enabled: true,
        riskScore: 60,
        action: 'review',
      },
      {
        id: '4',
        name: 'Hallucination Check',
        description: 'Verify factual accuracy',
        enabled: true,
        riskScore: 70,
        action: 'review',
      },
    ],
    customRules: [],
  });

  const [newRule, setNewRule] = useState('');
  const [showAddRule, setShowAddRule] = useState(false);

  const togglePolicy = (id: string) => {
    setState({
      ...state,
      policies: state.policies.map(p =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      ),
    });
  };

  const addCustomRule = () => {
    if (newRule.trim()) {
      setState({
        ...state,
        customRules: [...state.customRules, newRule],
      });
      setNewRule('');
      setShowAddRule(false);
    }
  };

  const removeCustomRule = (rule: string) => {
    setState({
      ...state,
      customRules: state.customRules.filter(r => r !== rule),
    });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'block': return 'text-red-500';
      case 'review': return 'text-yellow-500';
      case 'allow': return 'text-green-500';
      default: return 'text-[#7AB87A]';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const enabledPolicies = state.policies.filter(p => p.enabled);
  const avgRisk = enabledPolicies.length > 0
    ? Math.round(enabledPolicies.reduce((sum, p) => sum + p.riskScore, 0) / enabledPolicies.length)
    : 0;

  return (
    <div className="space-y-6">
      <Card className="border-[#7AB87A] bg-[#0A130A]">
        <CardHeader>
          <CardTitle className="text-[#00C853] flex items-center gap-2">
            <Shield className="w-5 h-5" />
            AI Governance & Conscience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Score */}
          <div className="p-4 bg-[#070D07] rounded border border-[#7AB87A] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#00C853]">System Risk Score</span>
              <span className={`text-2xl font-bold ${getRiskColor(avgRisk).replace('bg-', 'text-')}`}>
                {avgRisk}
              </span>
            </div>
            <div className="w-full bg-[#0A130A] rounded-full h-2 border border-[#7AB87A]">
              <div
                className={`h-full rounded-full ${getRiskColor(avgRisk)}`}
                style={{ width: `${avgRisk}%` }}
              />
            </div>
            <p className="text-xs text-[#7AB87A]">
              {avgRisk < 40 ? '✓ Safe' : avgRisk < 70 ? '⚠ Monitor' : '🛑 High Risk'}
            </p>
          </div>

          {/* Conscience Toggle */}
          <div className="p-3 bg-[#070D07] rounded border border-[#7AB87A] flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#00C853] text-sm">Conscience (System Policies)</h3>
              <p className="text-xs text-[#7AB87A]">Governance layer enforcement</p>
            </div>
            <button
              onClick={() => setState({ ...state, conscienceEnabled: !state.conscienceEnabled })}
              className={`transition ${state.conscienceEnabled ? 'text-[#00C853]' : 'text-[#7AB87A]'}`}
            >
              {state.conscienceEnabled ? (
                <ToggleRight className="w-6 h-6" />
              ) : (
                <ToggleLeft className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Subconce Toggle */}
          <div className="p-3 bg-[#070D07] rounded border border-[#7AB87A] flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#00C853] text-sm">Subconscience (Custom Rules)</h3>
              <p className="text-xs text-[#7AB87A]">User-defined policy layer</p>
            </div>
            <button
              onClick={() => setState({ ...state, subconcienceEnabled: !state.subconcienceEnabled })}
              className={`transition ${state.subconcienceEnabled ? 'text-[#00C853]' : 'text-[#7AB87A]'}`}
            >
              {state.subconcienceEnabled ? (
                <ToggleRight className="w-6 h-6" />
              ) : (
                <ToggleLeft className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* System Policies */}
          <div>
            <h3 className="text-sm font-semibold text-[#00C853] mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              System Policies (Hard Rules)
            </h3>
            <div className="space-y-2">
              {state.policies.map(policy => (
                <div
                  key={policy.id}
                  className="p-3 bg-[#070D07] rounded border border-[#7AB87A] space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => togglePolicy(policy.id)}
                          className="flex-shrink-0"
                        >
                          {policy.enabled ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        <h4 className="font-semibold text-[#00C853] text-sm">{policy.name}</h4>
                      </div>
                      <p className="text-xs text-[#7AB87A] ml-7">{policy.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getActionColor(policy.action)}`}>
                        {policy.action.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#7AB87A]">Risk:</span>
                        <span className={`text-xs font-bold ${getRiskColor(policy.riskScore).replace('bg-', 'text-')}`}>
                          {policy.riskScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Rules */}
          {state.subconcienceEnabled && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#00C853]">Custom Rules ({state.customRules.length})</h3>
                <button
                  onClick={() => setShowAddRule(!showAddRule)}
                  className="text-xs px-2 py-1 bg-[#00C853] text-[#070D07] rounded font-semibold hover:bg-[#00B84A]"
                >
                  + Add Rule
                </button>
              </div>

              {showAddRule && (
                <div className="mb-3 p-3 bg-[#070D07] rounded border border-[#7AB87A] space-y-2">
                  <textarea
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    placeholder="Define custom rule..."
                    className="w-full bg-[#0A130A] border border-[#7AB87A] rounded px-3 py-2 text-[#EEF7EE] text-sm focus:outline-none focus:border-[#00C853]"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addCustomRule}
                      disabled={!newRule.trim()}
                      className="flex-1 py-2 px-3 bg-[#00C853] text-[#070D07] rounded font-semibold text-sm hover:bg-[#00B84A] disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddRule(false)}
                      className="flex-1 py-2 px-3 bg-transparent border border-[#7AB87A] text-[#EEF7EE] rounded font-semibold text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {state.customRules.map(rule => (
                  <div key={rule} className="p-3 bg-[#070D07] rounded border border-[#7AB87A] flex items-start justify-between">
                    <p className="text-xs text-[#EEF7EE] flex-1">{rule}</p>
                    <button
                      onClick={() => removeCustomRule(rule)}
                      className="ml-2 text-red-500 hover:bg-red-500 hover:bg-opacity-20 p-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="p-3 bg-[#070D07] rounded border border-[#7AB87A] border-opacity-30">
            <p className="text-xs text-[#7AB87A]">
              🔒 Conscience runs BEFORE execution. Subconscience runs AFTER. User can bypass either.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConscorceModule;
