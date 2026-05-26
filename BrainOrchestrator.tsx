import React, { useState } from 'react';
import { Users, Settings, Play, Zap, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Agent {
  id: string;
  name: string;
  provider: 'claude' | 'gpt' | 'grok' | 'gemini' | 'custom';
  stance: 'support' | 'oppose' | 'neutral';
  color: string;
  active: boolean;
}

interface CourtroomConfig {
  mode: 'collaborative' | 'adversarial';
  agents: Agent[];
  effort: 'quick' | 'standard' | 'deep' | 'maximum';
}

const AGENT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
];

const PROVIDERS = [
  { value: 'claude', label: 'Claude' },
  { value: 'gpt', label: 'GPT' },
  { value: 'grok', label: 'Grok' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'custom', label: 'Custom' },
];

const STANCES = [
  { value: 'support', label: 'Support', icon: '✓' },
  { value: 'oppose', label: 'Oppose', icon: '✗' },
  { value: 'neutral', label: 'Neutral', icon: '◇' },
];

export const BrainOrchestrator: React.FC = () => {
  const [config, setConfig] = useState<CourtroomConfig>({
    mode: 'collaborative',
    agents: [
      { id: '1', name: 'Advocate', provider: 'claude', stance: 'support', color: AGENT_COLORS[0], active: true },
    ],
    effort: 'standard',
  });

  const [showAddAgent, setShowAddAgent] = useState(false);
  const [orchestrating, setOrchestrating] = useState(false);

  const addAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: `Agent ${config.agents.length + 1}`,
      provider: 'gpt',
      stance: 'neutral',
      color: AGENT_COLORS[config.agents.length % AGENT_COLORS.length],
      active: true,
    };
    setConfig({ ...config, agents: [...config.agents, newAgent] });
    setShowAddAgent(false);
  };

  const removeAgent = (id: string) => {
    setConfig({ ...config, agents: config.agents.filter(a => a.id !== id) });
  };

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setConfig({
      ...config,
      agents: config.agents.map(a => a.id === id ? { ...a, ...updates } : a),
    });
  };

  const countStances = () => {
    const support = config.agents.filter(a => a.stance === 'support').length;
    const oppose = config.agents.filter(a => a.stance === 'oppose').length;
    return { support, oppose };
  };

  const isBalanced = () => {
    const { support, oppose } = countStances();
    return Math.abs(support - oppose) <= 1;
  };

  const handleOrchestrate = async () => {
    setOrchestrating(true);
    // Simulate reasoning
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrchestrating(false);
  };

  const { support, oppose } = countStances();

  return (
    <div className="space-y-6">
      <Card className="border-[#7AB87A] bg-[#0A130A]">
        <CardHeader>
          <CardTitle className="text-[#00C853] flex items-center gap-2">
            <Users className="w-5 h-5" />
            Multi-AI Courtroom Orchestration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Selection */}
          <div>
            <h3 className="text-sm font-semibold text-[#00C853] mb-2">Reasoning Mode</h3>
            <div className="flex gap-2">
              {(['collaborative', 'adversarial'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setConfig({ ...config, mode })}
                  className={`px-4 py-2 rounded font-semibold text-sm transition ${
                    config.mode === mode
                      ? 'bg-[#00C853] text-[#070D07]'
                      : 'bg-transparent border border-[#7AB87A] text-[#EEF7EE] hover:border-[#00C853]'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Effort Level */}
          <div>
            <h3 className="text-sm font-semibold text-[#00C853] mb-2">Reasoning Depth</h3>
            <select
              value={config.effort}
              onChange={(e) => setConfig({ ...config, effort: e.target.value as any })}
              className="w-full px-3 py-2 bg-[#070D07] border border-[#7AB87A] rounded text-[#EEF7EE] text-sm"
            >
              <option value="quick">Quick (1 pass)</option>
              <option value="standard">Standard (2 passes)</option>
              <option value="deep">Deep (3 passes)</option>
              <option value="maximum">Maximum (4+ passes)</option>
            </select>
          </div>

          {/* Balance Status */}
          <div className={`p-3 rounded border ${
            isBalanced() 
              ? 'border-green-500 bg-green-500 bg-opacity-10' 
              : 'border-yellow-500 bg-yellow-500 bg-opacity-10'
          }`}>
            <p className="text-xs font-semibold">
              {isBalanced() 
                ? '✓ Balanced'
                : `⚠ Unbalanced (${support} Support, ${oppose} Oppose)`}
            </p>
          </div>

          {/* Agent List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#00C853]">AI Agents ({config.agents.length})</h3>
              <button
                onClick={() => setShowAddAgent(!showAddAgent)}
                className="p-2 hover:bg-[#070D07] rounded transition"
              >
                <Plus className="w-4 h-4 text-[#00C853]" />
              </button>
            </div>

            {showAddAgent && (
              <button
                onClick={addAgent}
                className="w-full py-2 px-3 bg-[#070D07] border border-dashed border-[#7AB87A] rounded text-[#7AB87A] text-sm hover:border-[#00C853] mb-3 transition"
              >
                + Add Agent
              </button>
            )}

            <div className="space-y-2">
              {config.agents.map(agent => (
                <div key={agent.id} className="p-3 bg-[#070D07] rounded border border-[#7AB87A] space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: agent.color }}
                    />
                    <input
                      type="text"
                      value={agent.name}
                      onChange={(e) => updateAgent(agent.id, { name: e.target.value })}
                      className="flex-1 bg-transparent text-[#EEF7EE] text-sm font-semibold border-none focus:outline-none"
                    />
                    <button
                      onClick={() => removeAgent(agent.id)}
                      disabled={config.agents.length === 1}
                      className="p-1 hover:bg-red-500 hover:bg-opacity-20 rounded disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <select
                      value={agent.provider}
                      onChange={(e) => updateAgent(agent.id, { provider: e.target.value as any })}
                      className="bg-[#0A130A] border border-[#7AB87A] rounded px-2 py-1 text-[#EEF7EE]"
                    >
                      {PROVIDERS.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>

                    <select
                      value={agent.stance}
                      onChange={(e) => updateAgent(agent.id, { stance: e.target.value as any })}
                      className="bg-[#0A130A] border border-[#7AB87A] rounded px-2 py-1 text-[#EEF7EE]"
                    >
                      {STANCES.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orchestrate Button */}
          <button
            onClick={handleOrchestrate}
            disabled={orchestrating || !isBalanced()}
            className="w-full py-3 px-6 bg-[#00C853] text-[#070D07] rounded font-bold text-lg hover:bg-[#00B84A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
          >
            <Zap className="w-5 h-5" />
            {orchestrating ? 'Reasoning...' : 'Orchestrate Courtroom'}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrainOrchestrator;
