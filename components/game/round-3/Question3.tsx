'use client';
import React, { useEffect, useState } from 'react';

const MagicHeading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-5xl text-purple-300 drop-shadow-[0_0_15px_rgba(147,51,234,0.8)] tracking-widest mb-6 text-center">
    {children}
  </h1>
);

const MagicParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-purple-100/90 leading-relaxed mb-4 font-serif tracking-wide">
    {children}
  </p>
);

// Helper hashing + fingerprint functions kept outside component (only run in browser)
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // 32-bit
  }
  return hash;
};

const getCanvasFingerprint = () => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'N/A';
    const text = 'Browser Fingerprint v1.0';
    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(text, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(text, 4, 17);
    const dataUrl = canvas.toDataURL();
    return `${simpleHash(dataUrl)}`;
  } catch {
    return 'Error';
  }
};

const getWebGLInfo = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return { vendor: 'N/A', renderer: 'N/A' };
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return { vendor: 'Unavailable', renderer: 'Unavailable' };
    return {
      vendor: gl.getParameter((debugInfo as any).UNMASKED_VENDOR_WEBGL),
      renderer: gl.getParameter((debugInfo as any).UNMASKED_RENDERER_WEBGL),
    };
  } catch {
    return { vendor: 'Error', renderer: 'Error' };
  }
};

export default function Question3() {
  const [isMobileOS, setIsMobileOS] = useState<boolean | null>(null);
  const [qrData, setQrData] = useState<any[]>([]);
  const [fallbackIds, setFallbackIds] = useState<Set<string>>(new Set());

  // Helper to extract Google Drive file ID
  const extractDriveId = (url: string) => {
    if (!url) return '';
    const match = url.match(/\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
    return match?.[1] || '';
  };

  // Detect platform once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    const platform = navigator.platform || '';
    const maxTouch = (navigator as any).maxTouchPoints || 0;
    const looksLikeDesktopPlatform = /Win32|Win64|MacIntel|MacPPC|Linux x86_64/i.test(platform);
    const isIOS = /iPhone|iPad|iPod/i.test(platform) || (/MacIntel/.test(platform) && maxTouch > 1);
    const isAndroidUA = /Android/i.test(ua);
    const isAndroid = isAndroidUA && !looksLikeDesktopPlatform;

    setIsMobileOS(isIOS || isAndroid);
  }, []);

  // Fetch QR data only when mobile
  useEffect(() => {
    if (!isMobileOS) return; 
    fetch('/api/qr')
      .then(res => res.json())
      .then(data => setQrData(data.data || []))
      .catch(err => console.error('Error fetching QR data:', err));
  }, [isMobileOS]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-stone-950 to-black flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-purple-700/40 shadow-[0_0_40px_rgba(147,51,234,0.3)]">
        <MagicHeading1>The Astrolabe of Worlds</MagicHeading1>
        <MagicParagraph>
          You find yourself in a forgotten chamber deep beneath the castle, a place whispered about only in hushed tones: the Astrolabe of Worlds. In the center of the room, floating above a pedestal of polished obsidian, is a colossal, shimmering map of the known magical world.
        </MagicParagraph>
        <MagicParagraph>
          As you draw closer, drawn by a faint hum of ancient magic, a script of liquid silver flows across the surface of the map, forming a message meant only for you:
        </MagicParagraph>
        <div className="mt-6 p-6 border-2 border-purple-600/60 bg-black/90 rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.6)] text-center">
          {/* Narrative text now ALWAYS visible */}
          <p className="text-purple-200 font-serif text-lg italic leading-relaxed">
            "Behold this grand Orrery, a marvel of enchanted craft. It shows the world in its entirety, yet it is blind. It knows the ley lines of the earth and the passage of the stars, but it does not know the wizard who stands before it. It is a window to everywhere, yet it is bound to this very room.
            <br /><br />
            The final enchantment, the one that holds the true secret, cannot be unlocked by a magic so vast and impersonal. It requires a more intimate bond. The path forward will only reveal itself through a charmed slate you carry—one that knows your touch.
            <br /><br />
            Only when this world is viewed through such a personal glass will the warmth you seek finally reveal its location."
          </p>
          {/* Show QR images only on mobile */}
          {isMobileOS && qrData.length > 0 && qrData.map((item, index) => {
            const id = extractDriveId(item.url);
            if (!id) return null;
            const primaryUrl = `https://drive.google.com/uc?export=download&id=${id}`;
            const fallbackUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
            const imgUrl = fallbackIds.has(id) ? fallbackUrl : primaryUrl;
            return (
              <div key={index} className="mt-4">
                <img
                  src={imgUrl}
                  alt="QR Image"
                  className="mx-auto block max-w-xs h-auto rounded-md border border-purple-700/40"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (!fallbackIds.has(id)) {
                      setFallbackIds(prev => new Set(prev).add(id));
                      console.warn('Primary URL failed, switching to thumbnail for id:', id);
                    } else {
                      console.error('Both primary and fallback failed for id:', id);
                    }
                  }}
                />
              </div>
            );
          })}
          {isMobileOS && qrData.length === 0 && (
            <p className="mt-4 text-sm text-purple-400">Loading mobile clue...</p>
          )}
        </div>
      </div>
    </div>
  );
}
