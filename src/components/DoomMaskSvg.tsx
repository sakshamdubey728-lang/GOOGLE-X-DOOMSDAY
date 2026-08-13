import React from 'react';

interface DoomMaskSvgProps {
  className?: string;
  splitDistance?: number; // Distance in px between left and right halves (0 to 40)
  glowIntensity?: number; // 0 to 1
  isAwakened?: boolean;
}

export const DoomMaskSvg: React.FC<DoomMaskSvgProps> = ({
  className = 'w-64 h-64',
  splitDistance = 0,
  glowIntensity = 1,
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 480"
        className="w-full h-full filter drop-shadow-[0_0_25px_rgba(6,59,39,0.8)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="darkSteelLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A4E4B" />
            <stop offset="40%" stopColor="#252827" />
            <stop offset="100%" stopColor="#0B0E0D" />
          </linearGradient>

          <linearGradient id="emeraldSteelRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E5E0" />
            <stop offset="35%" stopColor="#8D918E" />
            <stop offset="70%" stopColor="#0D9A5F" />
            <stop offset="100%" stopColor="#063B27" />
          </linearGradient>

          <linearGradient id="centerEnergyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#50FFB1" />
            <stop offset="50%" stopColor="#2CF598" />
            <stop offset="100%" stopColor="#063B27" />
          </linearGradient>

          <filter id="maskGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={15 * glowIntensity} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Center Energy Beam (Visible when mask splits) */}
        {splitDistance > 0 && (
          <g className="animate-pulse">
            <rect
              x={200 - splitDistance * 1.2}
              y="20"
              width={splitDistance * 2.4}
              height="440"
              fill="url(#centerEnergyGrad)"
              filter="url(#maskGlow)"
              opacity={Math.min(1, splitDistance / 10)}
            />
            {/* Energy particles beam line */}
            <line
              x1="200"
              y1="10"
              x2="200"
              y2="470"
              stroke="#FFFFFF"
              strokeWidth="4"
              opacity={0.9}
            />
          </g>
        )}

        {/* LEFT HALF OF DOOM MASK (Dark, Damaged, Shadowed Steel) */}
        <g
          style={{
            transform: `translateX(${-splitDistance}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <clipPath id="leftClip">
            <rect x="0" y="0" width="200" height="480" />
          </clipPath>
          <g clipPath="url(#leftClip)">
            {/* Hood Silhouette Shadow */}
            <path
              d="M 200,20 Q 80,30 40,140 Q 10,260 50,380 L 200,450 Z"
              fill="#080A09"
              stroke="#2D302F"
              strokeWidth="3"
            />
            {/* Left Faceplate Armor */}
            <path
              d="M 200,60 Q 100,70 70,160 Q 50,260 90,360 L 200,420 Z"
              fill="url(#darkSteelLeft)"
              stroke="#565A58"
              strokeWidth="2"
            />
            {/* Left Brow Plate */}
            <path d="M 200,120 L 90,140 L 80,180 L 200,165 Z" fill="#2D302F" stroke="#101311" strokeWidth="2" />
            {/* Left Eye Slot */}
            <polygon points="190,175 100,185 110,210 190,200" fill="#050706" stroke="#4A4E4B" strokeWidth="2" />
            <polygon points="180,182 115,190 120,204 180,196" fill="#1A1D1C" />
            <circle cx="150" cy="193" r="3" fill="#8D918E" opacity="0.5" />

            {/* Left Cheek Armor Plate */}
            <path d="M 190,210 L 105,220 L 90,290 L 190,280 Z" fill="#1D201F" stroke="#3A3D3C" strokeWidth="1.5" />
            
            {/* Left Mouth Grille / Rivets */}
            <path d="M 195,300 L 115,310 L 125,390 L 195,395 Z" fill="#121514" stroke="#2D302F" strokeWidth="2" />
            <line x1="185" y1="320" x2="135" y2="325" stroke="#3A3D3C" strokeWidth="3" />
            <line x1="185" y1="340" x2="140" y2="345" stroke="#3A3D3C" strokeWidth="3" />
            <line x1="185" y1="360" x2="145" y2="365" stroke="#3A3D3C" strokeWidth="3" />
            
            {/* Rivets */}
            <circle cx="85" cy="150" r="3" fill="#8D918E" />
            <circle cx="95" cy="350" r="3" fill="#8D918E" />

            {/* Cracks / Battle Damage */}
            <path d="M 120,100 L 135,130 L 128,150" stroke="#080A09" strokeWidth="2" fill="none" />
            <path d="M 160,230 L 140,260 L 155,275" stroke="#080A09" strokeWidth="2" fill="none" />
          </g>
        </g>

        {/* RIGHT HALF OF DOOM MASK (Emerald Illuminated, Powerful, Detailed Armor) */}
        <g
          style={{
            transform: `translateX(${splitDistance}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <clipPath id="rightClip">
            <rect x="200" y="0" width="200" height="480" />
          </clipPath>
          <g clipPath="url(#rightClip)">
            {/* Hood Silhouette Emerald Cloak */}
            <path
              d="M 200,20 Q 320,30 360,140 Q 390,260 350,380 L 200,450 Z"
              fill="#063B27"
              stroke="#2CF598"
              strokeWidth="2"
              opacity="0.9"
            />
            {/* Right Faceplate Armor */}
            <path
              d="M 200,60 Q 300,70 330,160 Q 350,260 310,360 L 200,420 Z"
              fill="url(#emeraldSteelRight)"
              stroke="#B8BAB7"
              strokeWidth="2.5"
            />
            {/* Right Brow Plate */}
            <path d="M 200,120 L 310,140 L 320,180 L 200,165 Z" fill="url(#emeraldSteelRight)" stroke="#2CF598" strokeWidth="2" />
            
            {/* Right Glowing Eye Slot */}
            <polygon points="210,175 300,185 290,210 210,200" fill="#080A09" stroke="#0D9A5F" strokeWidth="2" />
            <polygon points="220,182 285,190 280,204 220,196" fill="#2CF598" filter="url(#eyeGlow)" />
            <circle cx="250" cy="193" r="5" fill="#FFFFFF" filter="url(#eyeGlow)" />

            {/* Right Cheek Armor Plate */}
            <path d="M 210,210 L 295,220 L 310,290 L 210,280 Z" fill="#0A5C3A" stroke="#0D9A5F" strokeWidth="2" />
            
            {/* Right Mouth Grille / Cyber Vents */}
            <path d="M 205,300 L 285,310 L 275,390 L 205,395 Z" fill="#0D1310" stroke="#0D9A5F" strokeWidth="2" />
            <line x1="215" y1="320" x2="265" y2="325" stroke="#2CF598" strokeWidth="3" filter="url(#eyeGlow)" />
            <line x1="215" y1="340" x2="260" y2="345" stroke="#2CF598" strokeWidth="3" filter="url(#eyeGlow)" />
            <line x1="215" y1="360" x2="255" y2="365" stroke="#2CF598" strokeWidth="3" filter="url(#eyeGlow)" />

            {/* Latverian Crown Crest Marker */}
            <polygon points="200,60 220,90 200,110" fill="#2CF598" filter="url(#eyeGlow)" />

            {/* Silver Armor Rivets */}
            <circle cx="315" cy="150" r="3.5" fill="#E5E5E0" stroke="#063B27" strokeWidth="1" />
            <circle cx="305" cy="350" r="3.5" fill="#E5E5E0" stroke="#063B27" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
};
