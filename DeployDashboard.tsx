import React, { useState, useEffect } from 'react';
import { Play, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

interface DeployStatus {
  platform: string;
  status: 'idle' | 'building' | 'deploying' | 'success' | 'failed';
  lastDeploy?: Date;
  logs: string[];
}

export const DeployDashboard: React.FC = () => {
  const [platforms, setPlatforms] = useState<DeployStatus[]>([
    { platform: 'Fluba Web', status: 'idle', logs: [] },
    { platform: 'QR Gear', status: 'idle', logs: [] },
    { platform: 'Kingdom Connects', status: 'idle', logs: [] },
    { platform: 'Pollsit', status: 'idle', logs: [] },
    { platform: 'AfterSignal', status: 'idle', logs: [] },
    { platform: 'Brain', status: 'idle', logs: [] },
    { platform: 'Conscience', status: 'idle', logs: [] },
  ]);

  const [deploying, setDeploying] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Fluba Web']);

  const handleDeploy = async () => {
    setDeploying(true);
    
    // Trigger GitHub Actions workflow
    for (const platform of selectedPlatforms) {
      const idx = platforms.findIndex(p => p.platform === platform);
      if (idx >= 0) {
        const updated = [...platforms];
        updated[idx].status = 'building';
        updated[idx].logs = [`[${new Date().toLocaleTimeString()}] Starting deploy...`];
        setPlatforms(updated);

        try {
          // Call GitHub Actions API
          const response = await fetch(`/api/deploy/${platform}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            updated[idx].status = 'success';
            updated[idx].logs.push(`[${new Date().toLocaleTimeString()}] Deploy complete ✓`);
            updated[idx].lastDeploy = new Date();
          } else {
            updated[idx].status = 'failed';
            updated[idx].logs.push(`[${new Date().toLocaleTimeString()}] Deploy failed ✗`);
          }
        } catch (err) {
          updated[idx].status = 'failed';
          updated[idx].logs.push(`[${new Date().toLocaleTimeString()}] Error: ${err}`);
        }

        setPlatforms(updated);
      }
    }

    setDeploying(false);
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const getStatusIcon = (status: DeployStatus['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'building': return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'deploying': return <Zap className="w-5 h-5 text-blue-500 animate-pulse" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-gray-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#070D07] text-[#EEF7EE] rounded-lg border border-[#7AB87A]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00C853] mb-2">Deploy Dashboard</h1>
        <p className="text-sm text-[#7AB87A]">One-click deployment across all platforms</p>
      </div>

      {/* Platform Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#00C853] mb-4">Select Platforms</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {platforms.map(platform => (
            <button
              key={platform.platform}
              onClick={() => togglePlatform(platform.platform)}
              className={`p-3 rounded border transition ${
                selectedPlatforms.includes(platform.platform)
                  ? 'bg-[#00C853] border-[#00C853] text-[#070D07]'
                  : 'bg-transparent border-[#7AB87A] hover:border-[#00C853]'
              }`}
            >
              <span className="text-sm font-semibold">{platform.platform}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Deploy Button */}
      <button
        onClick={handleDeploy}
        disabled={deploying || selectedPlatforms.length === 0}
        className="w-full mb-8 py-3 px-6 bg-[#00C853] text-[#070D07] rounded font-bold text-lg hover:bg-[#00B84A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Play className="w-5 h-5" />
        {deploying ? 'Deploying...' : 'Deploy Selected Platforms'}
      </button>

      {/* Status Grid */}
      <div className="grid gap-4">
        {platforms.map(platform => (
          <div
            key={platform.platform}
            className="p-4 rounded border border-[#7AB87A] bg-[#0A130A]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(platform.status)}
                <div>
                  <h3 className="font-semibold text-[#00C853]">{platform.platform}</h3>
                  <p className="text-xs text-[#7AB87A] capitalize">{platform.status}</p>
                </div>
              </div>
              {platform.lastDeploy && (
                <span className="text-xs text-[#7AB87A]">
                  {platform.lastDeploy.toLocaleTimeString()}
                </span>
              )}
            </div>

            {/* Logs */}
            {platform.logs.length > 0 && (
              <div className="bg-[#070D07] rounded p-3 text-xs font-mono text-[#7AB87A] max-h-32 overflow-y-auto">
                {platform.logs.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#7AB87A]">
        <p className="text-xs text-[#7AB87A]">
          💡 Tip: Deploy from your phone. GitHub Actions runs automatically on push.
        </p>
      </div>
    </div>
  );
};

export default DeployDashboard;
