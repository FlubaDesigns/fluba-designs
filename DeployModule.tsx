import React, { useState, useEffect } from 'react';
import { Play, AlertCircle, CheckCircle, Clock, Zap, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DeployStatus {
  platform: string;
  status: 'idle' | 'building' | 'deploying' | 'success' | 'failed';
  lastDeploy?: Date;
  logs: string[];
  buildTime?: number;
}

export const DeployModule: React.FC = () => {
  const [platforms, setPlatforms] = useState<DeployStatus[]>([
    { platform: 'Fluba Web', status: 'idle', logs: [], buildTime: 0 },
    { platform: 'QR Gear', status: 'idle', logs: [], buildTime: 0 },
    { platform: 'Kingdom Connects', status: 'idle', logs: [], buildTime: 0 },
    { platform: 'Pollsit', status: 'idle', logs: [], buildTime: 0 },
    { platform: 'AfterSignal', status: 'idle', logs: [], buildTime: 0 },
    { platform: 'Brain', status: 'idle', logs: [], buildTime: 0 },
    { platform: 'Conscience', status: 'idle', logs: [], buildTime: 0 },
  ]);

  const [deploying, setDeploying] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Fluba Web']);

  const handleDeploy = async () => {
    setDeploying(true);
    const startTime = Date.now();

    for (const platform of selectedPlatforms) {
      const idx = platforms.findIndex(p => p.platform === platform);
      if (idx >= 0) {
        const updated = [...platforms];
        updated[idx].status = 'building';
        updated[idx].logs = [`[${new Date().toLocaleTimeString()}] Starting build...`];
        setPlatforms(updated);

        // Simulate build steps
        await new Promise(resolve => setTimeout(resolve, 1000));
        updated[idx].logs.push(`[${new Date().toLocaleTimeString()}] Installing dependencies...`);
        setPlatforms([...updated]);

        await new Promise(resolve => setTimeout(resolve, 2000));
        updated[idx].logs.push(`[${new Date().toLocaleTimeString()}] Building...`);
        updated[idx].status = 'deploying';
        setPlatforms([...updated]);

        await new Promise(resolve => setTimeout(resolve, 1500));
        updated[idx].logs.push(`[${new Date().toLocaleTimeString()}] Deploying to Firebase...`);
        setPlatforms([...updated]);

        await new Promise(resolve => setTimeout(resolve, 1000));
        updated[idx].status = 'success';
        updated[idx].logs.push(`[${new Date().toLocaleTimeString()}] Deploy complete ✓`);
        updated[idx].lastDeploy = new Date();
        updated[idx].buildTime = Math.round((Date.now() - startTime) / 1000);
        setPlatforms([...updated]);
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
      default: return <div className="w-5 h-5 rounded-full border-2 border-[#7AB87A]" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#7AB87A] bg-[#0A130A]">
        <CardHeader>
          <CardTitle className="text-[#00C853] flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Deploy Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Platform Selection */}
          <div>
            <h3 className="text-sm font-semibold text-[#00C853] mb-3">Select Platforms</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {platforms.map(platform => (
                <button
                  key={platform.platform}
                  onClick={() => togglePlatform(platform.platform)}
                  disabled={deploying}
                  className={`p-2 rounded text-sm font-semibold transition ${
                    selectedPlatforms.includes(platform.platform)
                      ? 'bg-[#00C853] text-[#070D07] border border-[#00C853]'
                      : 'bg-transparent border border-[#7AB87A] text-[#EEF7EE] hover:border-[#00C853]'
                  } ${deploying ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {platform.platform}
                </button>
              ))}
            </div>
          </div>

          {/* Deploy Button */}
          <button
            onClick={handleDeploy}
            disabled={deploying || selectedPlatforms.length === 0}
            className="w-full py-3 px-6 bg-[#00C853] text-[#070D07] rounded font-bold text-lg hover:bg-[#00B84A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
          >
            <Play className="w-5 h-5" />
            {deploying ? `Deploying... (${selectedPlatforms.length})` : 'Deploy Selected'}
          </button>

          {/* Status Grid */}
          <div className="grid gap-3">
            {platforms.map(platform => (
              <div
                key={platform.platform}
                className="p-3 rounded border border-[#7AB87A] bg-[#070D07] hover:border-[#00C853] transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(platform.status)}
                    <div>
                      <h4 className="font-semibold text-[#00C853] text-sm">{platform.platform}</h4>
                      <p className="text-xs text-[#7AB87A] capitalize">{platform.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {platform.buildTime && (
                      <p className="text-xs text-[#7AB87A]">{platform.buildTime}s</p>
                    )}
                    {platform.lastDeploy && (
                      <p className="text-xs text-[#7AB87A]">
                        {platform.lastDeploy.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Logs */}
                {platform.logs.length > 0 && (
                  <div className="bg-[#0A130A] rounded p-2 text-xs font-mono text-[#7AB87A] max-h-24 overflow-y-auto border border-[#7AB87A] border-opacity-30">
                    {platform.logs.map((log, idx) => (
                      <div key={idx} className="text-xs">{log}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="p-3 bg-[#070D07] rounded border border-[#7AB87A] border-opacity-30">
            <p className="text-xs text-[#7AB87A]">
              💡 Deploy from your phone. All 7 platforms in one click. Free tier: GitHub Actions + Firebase.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeployModule;
