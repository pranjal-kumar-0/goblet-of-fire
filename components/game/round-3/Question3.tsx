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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Collect fingerprint (educational/demo only) – logs to console
    const webglInfo = getWebGLInfo();
    const fingerprint = {
      'User Agent': navigator.userAgent,
      'Operating System (OS)': navigator.platform,
      'Screen Resolution': `${window.screen.width} x ${window.screen.height}`,
      'Available Screen Size': `${window.screen.availWidth} x ${window.screen.availHeight}`,
      'Color Depth': `${window.screen.colorDepth}-bit`,
      'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'Language': navigator.language,
      'Cookies Enabled': navigator.cookieEnabled,
      'CPU Cores': (navigator as any).hardwareConcurrency || 'N/A',
      'Device Memory (GB)': (navigator as any).deviceMemory || 'N/A',
      'Canvas Fingerprint': getCanvasFingerprint(),
      'WebGL Vendor': webglInfo.vendor,
      'WebGL Renderer': webglInfo.renderer,
    };
    // eslint-disable-next-line no-console
    console.log('--- Browser Fingerprint Data ---');
    // eslint-disable-next-line no-console
    console.table(fingerprint);

    // Improved OS detection: require consistency with platform & touch capability
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    const platform = navigator.platform || '';
    const maxTouch = (navigator as any).maxTouchPoints || 0;

    const looksLikeDesktopPlatform = /Win32|Win64|MacIntel|MacPPC|Linux x86_64/i.test(platform);

    // iOS detection (includes iPadOS which reports MacIntel but has touch)
    const isIOS = /iPhone|iPad|iPod/i.test(platform) || (/MacIntel/.test(platform) && maxTouch > 1);

    // Android detection: UA contains Android AND platform not clearly desktop
    const isAndroidUA = /Android/i.test(ua);
    const isAndroid = isAndroidUA && !looksLikeDesktopPlatform;

    setIsMobileOS(isIOS || isAndroid);
  }, []);

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
          {isMobileOS && (
            <p className="text-purple-200 font-serif text-lg italic leading-relaxed">
              "Behold this grand Orrery, a marvel of enchanted craft. It shows the world in its entirety, yet it is blind. It knows the ley lines of the earth and the passage of the stars, but it does not know the wizard who stands before it. It is a window to everywhere, yet it is bound to this very room.
              <br /><br />
              The final enchantment, the one that holds the true secret, cannot be unlocked by a magic so vast and impersonal. It requires a more intimate bond. The path forward will only reveal itself through a charmed slate you carry—one that knows your touch.
              <br /><br />
              Only when this world is viewed through such a personal glass will the warmth you seek finally reveal its location."
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
