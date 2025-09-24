"use client";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import styles from "./Enroll.module.css";

export default function AdmissionLetter({name}:{name: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!letterRef.current) return;

    const card = letterRef.current;
    const originalClipPath = card.style.clipPath;
    card.style.clipPath = "none"; 

    try {
      const dataUrl = await toPng(card, {
        cacheBust: true,
        backgroundColor: "#fdf6e3",
        // Skip external fonts and images to avoid CORS issues
        skipFonts: true,
        // Filter out external resources that cause CORS issues
        filter: (node: Element) => {
          // Skip external stylesheets and fonts that cause CORS issues
          if (node.tagName === 'LINK') {
            const href = node.getAttribute('href');
            if (href?.includes('fonts.googleapis.com') || href?.includes('transparenttextures.com')) {
              return false;
            }
          }
          return true;
        }
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "hogwarts_letter.png";
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
      // Fallback: show a message to the user
      alert("Unable to download image due to browser security restrictions. You can take a screenshot instead!");
    }

    card.style.clipPath = originalClipPath; 
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 relative ${styles.container}`}
    >
      {/* Letter */}
      <div className="relative w-full max-w-2xl" ref={letterRef}>
        <div
          className={`relative p-8 shadow-2xl border-2 border-[#b2925a] transition-all duration-1000 ${styles.letter} ${
            isOpen ? "-translate-y-16" : ""
          }`}
        >
          {/* Decorative stains */}
          <div
            className={`absolute top-6 left-8 w-24 h-24 opacity-20 pointer-events-none ${styles.stain1}`}
          />
          <div
            className={`absolute bottom-6 right-8 w-28 h-28 opacity-20 pointer-events-none ${styles.stain2}`}
          />
          <div
            className={`absolute top-1/4 left-1/4 w-16 h-16 opacity-15 pointer-events-none ${styles.stain3}`}
          />
          <div
            className={`absolute bottom-1/3 right-1/3 w-20 h-20 opacity-10 pointer-events-none ${styles.stain4}`}
          />

          {/* Paper texture overlay */}
          <div
            className={`absolute inset-0 pointer-events-none opacity-15 ${styles.paperTexture}`}
          />

          {/* Burn marks on edges */}
          <div
            className={`absolute top-0 left-0 w-full h-4 opacity-20 pointer-events-none ${styles.burnTop}`}
          />
          <div
            className={`absolute bottom-0 left-0 w-full h-4 opacity-20 pointer-events-none ${styles.burnBottom}`}
          />

          {/* Hogwarts Crest */}
          <div className="text-center mb-6 relative z-10">
            <div className="inline-block p-2 rounded-full shadow-md bg-[#f3d9a4]">
              <svg
                className="w-16 h-16"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M256 32L32 160L256 288L480 160L256 32Z"
                  fill="#740001"
                  stroke="#D3A625"
                  strokeWidth="16"
                />
                <path
                  d="M480 160L256 288V512L480 384V160Z"
                  fill="#1A472A"
                  stroke="#D3A625"
                  strokeWidth="16"
                />
                <path
                  d="M32 160L256 288V512L32 384V160Z"
                  fill="#0E1A40"
                  stroke="#D3A625"
                  strokeWidth="16"
                />
                <path
                  d="M256 288L32 384L256 480L480 384L256 288Z"
                  fill="#5D5D5D"
                  stroke="#D3A625"
                  strokeWidth="16"
                />
                <path
                  d="M256 224C273.673 224 288 209.673 288 192C288 174.327 273.673 160 256 160C238.327 160 224 174.327 224 192C224 209.673 238.327 224 256 224Z"
                  fill="#D3A625"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="text-center mb-8 relative z-10">
            <p className="text-xs uppercase tracking-widest mb-2 text-[#5a3c0a] opacity-80">
              Hogwarts School of Witchcraft and Wizardry
            </p>
            <h1 className="text-3xl font-serif font-bold text-[#3a2807] mb-6">
              OFFER OF ADMISSION
            </h1>
            <div className="text-left space-y-4 font-serif text-[#3b2b0b] opacity-90">
              <p>Dear {name},</p>
              <p>
                We are pleased to inform you that you have been accepted at
                Hogwarts School of Witchcraft and Wizardry. A magical sign-in link has been sent to your email.
              </p>
              <p>
                To access the magical authentication portal, please check your email and click the magic link to sign in without needing a password. The link will redirect you to our secure authentication system.
              </p>
              <p>
                Term begins on September 1. We await your owl by no later than
                July 31.
              </p>
              <p className="mt-8">Yours sincerely,</p>
              <div className="ml-8">
                <p className="font-bold">Kathrina Elangbam</p>
                <p className="text-sm">President</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t-2 border-[#b2925a] pt-6">
            <p className="font-semibold text-[#3b2b0b]">
              This magical experience is presented by
            </p>
            <p className="font-bold text-lg text-[#3a2807]">
              Women in Open Source
            </p>
          </div>
        </div>

        {/* Wax Seal */}
        <div
          className={`absolute top-4 right-4 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-700 border-4 border-red-900 shadow-lg ${styles.waxSeal} ${
            isOpen ? "rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-white font-serif text-sm">W</span>
          <div
            className={`absolute inset-0 rounded-full opacity-30 ${styles.sealGlow}`}
          />
        </div>
      </div>

      {/* Magical Floating Button */}
      <button
        onClick={handleDownload}
        className={`fixed bottom-6 right-6 px-5 py-2 text-sm font-serif text-white rounded-full shadow-lg transition transform hover:scale-110 bg-gradient-to-r from-yellow-700 to-yellow-900 ${styles.saveButton}`}
      >
        Save Letter
      </button>
    </div>
  );
}
