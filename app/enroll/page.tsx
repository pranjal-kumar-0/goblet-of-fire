"use client";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";

export default function Letter() {
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
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "hogwarts_letter.png";
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }

    card.style.clipPath = originalClipPath; 
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative"
      style={{
        backgroundColor: "#4a2f0a",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/old-wall.png')",
      }}
    >
      {/* Letter */}
      <div className="relative w-full max-w-2xl" ref={letterRef}>
        <div
          className={`relative p-8 shadow-2xl border-2 border-[#b2925a] transition-all duration-1000 ${
            isOpen ? "-translate-y-16" : ""
          }`}
          style={{
            backgroundImage: `
              url('https://www.transparenttextures.com/patterns/cardboard-flat.png'),
              linear-gradient(#f9f4e1, #f6ecd0)
            `,
            backgroundBlendMode: "multiply",
            clipPath:
              "polygon(5% 0, 95% 0, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0 95%, 0 5%)",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.4), inset 0 0 100px rgba(0,0,0,0.2), 0 8px 25px rgba(0,0,0,0.5)",
          }}
        >
          {/* Decorative stains */}
          <div
            className="absolute top-6 left-8 w-24 h-24 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/coffee-stains.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              transform: "rotate(-10deg)",
            }}
          />
          <div
            className="absolute bottom-6 right-8 w-28 h-28 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/coffee-stains.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              transform: "rotate(15deg)",
            }}
          />
          <div
            className="absolute top-1/4 left-1/4 w-16 h-16 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/coffee-stains.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              transform: "rotate(45deg)",
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-20 h-20 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/coffee-stains.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              transform: "rotate(-30deg)",
            }}
          />

          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
              mixBlendMode: "multiply",
            }}
          />

          {/* Burn marks on edges */}
          <div
            className="absolute top-0 left-0 w-full h-4 opacity-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-4 opacity-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
            }}
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
              <p>Dear Student,</p>
              <p>
                We are pleased to inform you that you have been accepted at
                Hogwarts School of Witchcraft and Wizardry. Please find enclosed
                a list of all necessary books and equipment.
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
          className={`absolute top-4 right-4 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-700 border-4 border-red-900 shadow-lg ${
            isOpen ? "rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png')",
            backgroundBlendMode: "overlay",
          }}
        >
          <span className="text-white font-serif text-sm">W</span>
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 20%)",
            }}
          />
        </div>
      </div>

      {/* Magical Floating Button */}
      <button
        onClick={handleDownload}
        className="fixed bottom-6 right-6 px-5 py-2 text-sm font-serif text-white rounded-full shadow-lg transition transform hover:scale-110 bg-gradient-to-r from-yellow-700 to-yellow-900"
        style={{ boxShadow: "0 0 15px 3px rgba(255,215,0,0.7)" }}
      >
        Save Letter
      </button>
    </div>
  );
}
