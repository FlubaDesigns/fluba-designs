import React, { useState } from 'react';
import { Globe, Copy, Settings, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  platforms: {
    name: string;
    enabled: boolean;
    adapted: boolean;
    customization?: string;
  }[];
}

interface Surface {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

export const ReusableListingEngine: React.FC = () => {
  const [listing, setListing] = useState<Listing>({
    id: 'lst-001',
    title: 'Professional Consulting Services',
    description: 'Expert business and AI consulting for enterprises',
    price: 150,
    platforms: [
      { name: 'QR Gear', enabled: true, adapted: false },
      { name: 'Kingdom Connects', enabled: true, adapted: false },
      { name: 'Pollsit', enabled: false, adapted: false },
      { name: 'AfterSignal', enabled: false, adapted: false },
      { name: 'Fluba Marketplace', enabled: true, adapted: false },
    ],
  });

  const [creatingListing, setCreatingListing] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const togglePlatform = (platformName: string) => {
    setListing({
      ...listing,
      platforms: listing.platforms.map(p =>
        p.name === platformName ? { ...p, enabled: !p.enabled } : p
      ),
    });
  };

  const adaptForPlatform = (platformName: string) => {
    setListing({
      ...listing,
      platforms: listing.platforms.map(p =>
        p.name === platformName ? { ...p, adapted: !p.adapted } : p
      ),
    });
  };

  const handleDeploy = async () => {
    setDeploying(true);
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDeploying(false);
    alert('Listing deployed to all platforms!');
  };

  const enabledPlatforms = listing.platforms.filter(p => p.enabled).length;
  const adaptedPlatforms = listing.platforms.filter(p => p.enabled && p.adapted).length;

  return (
    <div className="space-y-6">
      <Card className="border-[#7AB87A] bg-[#0A130A]">
        <CardHeader>
          <CardTitle className="text-[#00C853] flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Reusable Listing Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Listing Editor */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#00C853] mb-2">Listing Title</label>
              <input
                type="text"
                value={listing.title}
                onChange={(e) => setListing({ ...listing, title: e.target.value })}
                className="w-full px-3 py-2 bg-[#070D07] border border-[#7AB87A] rounded text-[#EEF7EE] text-sm focus:outline-none focus:border-[#00C853]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#00C853] mb-2">Description</label>
              <textarea
                value={listing.description}
                onChange={(e) => setListing({ ...listing, description: e.target.value })}
                className="w-full px-3 py-2 bg-[#070D07] border border-[#7AB87A] rounded text-[#EEF7EE] text-sm focus:outline-none focus:border-[#00C853]"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#00C853] mb-2">Price ($)</label>
              <input
                type="number"
                value={listing.price}
                onChange={(e) => setListing({ ...listing, price: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#070D07] border border-[#7AB87A] rounded text-[#EEF7EE] text-sm focus:outline-none focus:border-[#00C853]"
              />
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <h3 className="text-sm font-semibold text-[#00C853] mb-3">
              Deploy to Surfaces ({enabledPlatforms}/{listing.platforms.length})
            </h3>
            <div className="space-y-2">
              {listing.platforms.map(platform => (
                <div key={platform.name} className="p-3 bg-[#070D07] rounded border border-[#7AB87A] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={platform.enabled}
                        onChange={() => togglePlatform(platform.name)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-[#00C853] text-sm">{platform.name}</span>
                    </label>
                    <button
                      onClick={() => adaptForPlatform(platform.name)}
                      disabled={!platform.enabled}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition ${
                        platform.adapted
                          ? 'bg-[#00C853] text-[#070D07] font-semibold'
                          : 'bg-transparent border border-[#7AB87A] text-[#EEF7EE] hover:border-[#00C853]'
                      } ${!platform.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Copy className="w-3 h-3" />
                      {platform.adapted ? 'Adapted' : 'Adapt'}
                    </button>
                  </div>

                  {platform.enabled && platform.adapted && (
                    <div className="ml-6 p-2 bg-[#0A130A] rounded border-l-2 border-[#00C853] text-xs text-[#7AB87A]">
                      <p className="font-semibold mb-1">Platform-Specific Version:</p>
                      <p>{listing.title} - {listing.description.substring(0, 40)}...</p>
                      <p className="mt-1 text-[#00C853]">✓ Optimized for {platform.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-[#070D07] rounded border border-[#7AB87A]">
              <p className="text-xs text-[#7AB87A]">Active Platforms</p>
              <p className="text-2xl font-bold text-[#00C853]">{enabledPlatforms}</p>
            </div>
            <div className="p-3 bg-[#070D07] rounded border border-[#7AB87A]">
              <p className="text-xs text-[#7AB87A]">Adapted</p>
              <p className="text-2xl font-bold text-[#00C853]">{adaptedPlatforms}</p>
            </div>
          </div>

          {/* Deploy Button */}
          <button
            onClick={handleDeploy}
            disabled={deploying || enabledPlatforms === 0}
            className="w-full py-3 px-6 bg-[#00C853] text-[#070D07] rounded font-bold text-lg hover:bg-[#00B84A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
          >
            <Send className="w-5 h-5" />
            {deploying ? 'Deploying...' : `Deploy to ${enabledPlatforms} Platform${enabledPlatforms !== 1 ? 's' : ''}`}
          </button>

          {/* Info */}
          <div className="p-3 bg-[#070D07] rounded border border-[#7AB87A] border-opacity-30 space-y-1">
            <p className="text-xs font-semibold text-[#00C853]">💡 How It Works:</p>
            <ul className="text-xs text-[#7AB87A] space-y-1">
              <li>• Create once, deploy everywhere</li>
              <li>• AI adapts content per platform automatically</li>
              <li>• Global hard rules apply across all surfaces</li>
              <li>• Per-instance customization available</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReusableListingEngine;
