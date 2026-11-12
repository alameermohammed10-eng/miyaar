import React, { useEffect, useRef, useState, useCallback, useId } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useMascot } from '../../context/MascotContext';
import { Sparkles, Heart } from 'lucide-react';

interface MiyaarMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeech?: boolean;
}

export const MiyaarMascot: React.FC<MiyaarMascotProps> = ({
  className = '',
  size = 'md',
  showSpeech = true,
}) => {
  const { language } = useLanguage();
  const { mood, customSpeech, triggerReaction } = useMascot();

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate unique ID prefix to prevent SVG gradient collision across multiple instances
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');

  const pearlHeadId = `pearl-head-${uid}`;
  const pearlTorsoId = `pearl-torso-${uid}`;
  const titaniumId = `titanium-${uid}`;
  const goldId = `gold-${uid}`;
  const visorId = `visor-${uid}`;
  const eyeGlowId = `eye-glow-${uid}`;
  const bloomId = `bloom-${uid}`;

  // Smooth interpolated tracking state
  const [targetPupil, setTargetPupil] = useState({ x: 0, y: 0 });
  const [currentPupil, setCurrentPupil] = useState({ x: 0, y: 0 });
  const [targetHead, setTargetHead] = useState({ rotateX: 0, rotateY: 0 });
  const [currentHead, setCurrentHead] = useState({ rotateX: 0, rotateY: 0 });

  // Blinking cycle
  const [isBlinking, setIsBlinking] = useState(false);
  const [isClickExcited, setIsClickExcited] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Speech bubble state
  const [speechMessage, setSpeechMessage] = useState<string>('');

  // Initial welcome message
  useEffect(() => {
    if (customSpeech) {
      setSpeechMessage(customSpeech);
    } else {
      setSpeechMessage(
        language === 'ar'
          ? 'مرحباً بك في مِعيار! أنا رفيقك الرقمي.'
          : 'Welcome to Miyaar! I am your digital guide.'
      );
    }
  }, [customSpeech, language]);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4200);

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouse tracking with viewport bounds & smooth lerp
  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isPointerInWindow = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isPointerInWindow) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - mascotCenterX;
      const deltaY = e.clientY - mascotCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance === 0) return;

      // Max eye deflection: ±8px horizontal, ±5px vertical
      const maxEyeX = 8;
      const maxEyeY = 5;
      const eyeFactor = Math.min(distance / 250, 1);
      const angle = Math.atan2(deltaY, deltaX);

      setTargetPupil({
        x: Math.cos(angle) * maxEyeX * eyeFactor,
        y: Math.sin(angle) * maxEyeY * eyeFactor,
      });

      // Subtle 3D head rotation: ±14deg Y, ±10deg X
      const maxHeadRotY = 14;
      const maxHeadRotX = 10;
      const headFactor = Math.min(distance / 500, 1);

      setTargetHead({
        rotateY: Math.cos(angle) * maxHeadRotY * headFactor,
        rotateX: -Math.sin(angle) * maxHeadRotX * headFactor,
      });
    };

    const handleMouseLeave = () => {
      isPointerInWindow = false;
      setTargetPupil({ x: 0, y: 0 });
      setTargetHead({ rotateX: 0, rotateY: 0 });
    };

    const handleMouseEnter = () => {
      isPointerInWindow = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation frame lerp loop
    let animId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateLoop = () => {
      setCurrentPupil((prev) => ({
        x: lerp(prev.x, targetPupil.x, 0.12),
        y: lerp(prev.y, targetPupil.y, 0.12),
      }));

      setCurrentHead((prev) => ({
        rotateX: lerp(prev.rotateX, targetHead.rotateX, 0.08),
        rotateY: lerp(prev.rotateY, targetHead.rotateY, 0.08),
      }));

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [targetPupil, targetHead]);

  // Handle Mascot Click Interaction
  const handleMascotClick = useCallback(() => {
    setIsClickExcited(true);
    setClickCount((c) => c + 1);

    const arabicPhrases = [
      'يسعدني وجودك هنا! كيف أساعدك اليوم؟ ✨',
      'فريق مِعيار جاهز لتصميم مشروعك بأعلى دقة! 🎯',
      'هل ترغب بمحادثة سريعة عبر واتساب؟ 💬',
      'كل سطر برمجي نصنعه مصمم ليدوم طويلاً! ⚡',
    ];

    const englishPhrases = [
      'Glad to have you here! How can I assist today? ✨',
      'Miyaar is ready to craft your next digital breakthrough! 🎯',
      'Would you like a direct consultation on WhatsApp? 💬',
      'Every line of code is engineered for lasting elegance! ⚡',
    ];

    const pool = language === 'ar' ? arabicPhrases : englishPhrases;
    const randomPhrase = pool[clickCount % pool.length];

    triggerReaction('happy', randomPhrase, 3500);

    setTimeout(() => {
      setIsClickExcited(false);
    }, 700);
  }, [clickCount, language, triggerReaction]);

  // Dimension scaling
  const sizeClasses = {
    sm: 'w-28 h-28',
    md: 'w-40 h-40 sm:w-48 sm:h-48',
    lg: 'w-52 h-52 sm:w-64 sm:h-64',
  }[size];

  // Eye styling based on mood
  const isHappy = mood === 'happy' || isClickExcited;
  const isSurprised = mood === 'surprised';

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center select-none group ${className}`}
      onClick={handleMascotClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive Miyaar Digital Mascot"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleMascotClick();
        }
      }}
    >
      {/* Interactive Floating Speech Bubble */}
      {showSpeech && (
        <div
          className={`mb-4 px-4 py-2 rounded-2xl bg-[var(--color-charcoal-surface)]/95 backdrop-blur-xl border border-[var(--color-gold-champagne)]/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 max-w-[260px] sm:max-w-[320px] text-center relative pointer-events-none ${
            isClickExcited ? 'scale-105 border-[var(--color-gold-champagne)]' : ''
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--color-alabaster)] font-medium leading-relaxed">
            {isHappy ? (
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold-champagne)] shrink-0 animate-spin" />
            ) : (
              <Heart className="w-3.5 h-3.5 text-[var(--color-gold-champagne)] shrink-0 opacity-70" />
            )}
            <span>{speechMessage}</span>
          </div>

          {/* Speech Bubble Arrow Indicator */}
          <div className="absolute -bottom-1.5 start-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--color-charcoal-surface)] border-b border-e border-[var(--color-gold-champagne)]/40 rotate-45" />
        </div>
      )}

      {/* Main Mascot Visual Frame with 3D Head Tilt */}
      <div
        className={`relative ${sizeClasses} cursor-pointer transition-transform duration-150 ease-out`}
        style={{
          transform: `perspective(600px) rotateX(${currentHead.rotateX}deg) rotateY(${currentHead.rotateY}deg) ${
            isClickExcited ? 'scale(1.08) translateY(-8px)' : ''
          }`,
        }}
      >
        {/* Soft Ambient Floating Glow Underneath */}
        <div className="absolute -bottom-4 start-1/2 -translate-x-1/2 w-36 h-8 bg-[var(--color-gold-champagne)]/30 rounded-full blur-xl pointer-events-none" />

        {/* 3D SVG Robot Body & Faceplate */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        >
          <defs>
            {/* Metallic Pearl Ivory Head Shell Gradient */}
            <linearGradient id={pearlHeadId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#F8FAFC" />
              <stop offset="70%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Metallic Pearl Ivory Torso Gradient */}
            <linearGradient id={pearlTorsoId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Brushed Titanium Silver for Mechanical Joints */}
            <linearGradient id={titaniumId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Brushed Champagne Gold Accent Gradient */}
            <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4BD" />
              <stop offset="35%" stopColor="#E5C568" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9E7D22" />
            </linearGradient>

            {/* Deep Glossy Graphite Visor Gradient */}
            <linearGradient id={visorId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0D12" />
              <stop offset="50%" stopColor="#141822" />
              <stop offset="100%" stopColor="#1D2230" />
            </linearGradient>

            {/* Radiant Luminous Golden Eye Gradient */}
            <radialGradient id={eyeGlowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFF2A3" />
              <stop offset="65%" stopColor="#FFD700" />
              <stop offset="90%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.2)" />
            </radialGradient>

            {/* Golden Bloom Filter for Glowing Eyes & Accents */}
            <filter id={bloomId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ============================================================ */}
          {/* LAYER 1: TORSO, SHOULDERS & LOWER CHASSIS (PEARL-WHITE SILHOUETTE) */}
          {/* ============================================================ */}

          {/* Left Shoulder / Arm Pod (Solid Pearl White + Gold Rim) */}
          <ellipse
            cx="42"
            cy="138"
            rx="14"
            ry="18"
            fill="#F1F5F9"
          />
          <ellipse
            cx="42"
            cy="138"
            rx="14"
            ry="18"
            fill={`url(#${pearlTorsoId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="1.8"
          />
          <circle
            cx="42"
            cy="126"
            r="5"
            fill={`url(#${titaniumId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="1"
          />

          {/* Right Shoulder / Arm Pod (Solid Pearl White + Gold Rim) */}
          <ellipse
            cx="158"
            cy="138"
            rx="14"
            ry="18"
            fill="#F1F5F9"
          />
          <ellipse
            cx="158"
            cy="138"
            rx="14"
            ry="18"
            fill={`url(#${pearlTorsoId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="1.8"
          />
          <circle
            cx="158"
            cy="126"
            r="5"
            fill={`url(#${titaniumId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="1"
          />

          {/* Torso Chest Armor (Substantial Pearl White Curved Plate) */}
          <rect
            x="52"
            y="116"
            width="96"
            height="56"
            rx="26"
            fill="#F8FAFC"
          />
          <rect
            x="52"
            y="116"
            width="96"
            height="56"
            rx="26"
            fill={`url(#${pearlTorsoId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="1.8"
          />

          {/* Chest Gold Contour Engravings */}
          <path
            d="M 66 132 Q 100 142 134 132"
            fill="none"
            stroke={`url(#${goldId})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Center Brand Medallion on Chest */}
          <circle cx="100" cy="148" r="8.5" fill={`url(#${goldId})`} filter={`url(#${bloomId})`} />
          <circle cx="100" cy="148" r="6.8" fill="#121620" />
          <text
            x="100"
            y="151.8"
            textAnchor="middle"
            fill={`url(#${goldId})`}
            fontSize="8"
            fontFamily="Alexandria, sans-serif"
            fontWeight="bold"
          >
            مِ
          </text>

          {/* Levitating Collar Orbit Ring */}
          <ellipse
            cx="100"
            cy="176"
            rx="48"
            ry="12"
            fill="none"
            stroke={`url(#${goldId})`}
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.85"
          />

          {/* Lower Thruster Pod (Titanium Silver + Gold Accent) */}
          <path
            d="M 72 168 Q 100 184 128 168 Z"
            fill={`url(#${titaniumId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="1.5"
          />

          {/* ============================================================ */}
          {/* LAYER 2: TITANIUM MECHANICAL NECK JOINT */}
          {/* ============================================================ */}
          <rect
            x="86"
            y="106"
            width="28"
            height="14"
            rx="4"
            fill={`url(#${titaniumId})`}
            stroke="#64748B"
            strokeWidth="1"
          />

          {/* ============================================================ */}
          {/* LAYER 3: DOMINANT PEARL-WHITE HELMET SHELL */}
          {/* ============================================================ */}

          {/* Solid White Base Layer to guarantee bright silhouette */}
          <rect
            x="40"
            y="24"
            width="120"
            height="94"
            rx="47"
            fill="#FFFFFF"
          />

          {/* Metallic Pearl Ivory Gradient Shell */}
          <rect
            x="40"
            y="24"
            width="120"
            height="94"
            rx="47"
            fill={`url(#${pearlHeadId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="2.4"
          />

          {/* Realistic Curved Silver Metallic Reflection on Helmet Crest */}
          <path
            d="M 52 42 C 72 30, 128 30, 148 42 C 132 35, 68 35, 52 42 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />

          {/* Champagne Gold Crown Trim Arch */}
          <path
            d="M 54 44 Q 100 32 146 44"
            fill="none"
            stroke={`url(#${goldId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Top Antenna Node (Titanium Silver Stem + Radiant Gold Beacon) */}
          <line
            x1="100"
            y1="24"
            x2="100"
            y2="8"
            stroke={`url(#${titaniumId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="22" r="4" fill={`url(#${goldId})`} />
          <circle cx="100" cy="7" r="6" fill={`url(#${goldId})`} filter={`url(#${bloomId})`} />

          {/* Left & Right Mechanical Ear Pods (Pearl White + Titanium + Gold Sensor) */}
          {/* Left Ear */}
          <g transform="translate(26, 52)">
            <rect x="0" y="0" width="16" height="38" rx="8" fill="#F8FAFC" />
            <rect x="0" y="0" width="16" height="38" rx="8" fill={`url(#${titaniumId})`} stroke={`url(#${goldId})`} strokeWidth="1.8" />
            <circle cx="8" cy="19" r="5" fill={`url(#${goldId})`} />
            <circle cx="8" cy="19" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Right Ear */}
          <g transform="translate(158, 52)">
            <rect x="0" y="0" width="16" height="38" rx="8" fill="#F8FAFC" />
            <rect x="0" y="0" width="16" height="38" rx="8" fill={`url(#${titaniumId})`} stroke={`url(#${goldId})`} strokeWidth="1.8" />
            <circle cx="8" cy="19" r="5" fill={`url(#${goldId})`} />
            <circle cx="8" cy="19" r="2.5" fill="#FFFFFF" />
          </g>

          {/* ============================================================ */}
          {/* LAYER 4: PROPORTIONAL INSET VISOR (DEEP GLOSSY GRAPHITE SCREEN) */}
          {/* ============================================================ */}

          {/* Solid Dark Base + Visor Gradient */}
          <rect
            x="58"
            y="46"
            width="84"
            height="50"
            rx="25"
            fill="#10131A"
          />
          <rect
            x="58"
            y="46"
            width="84"
            height="50"
            rx="25"
            fill={`url(#${visorId})`}
            stroke={`url(#${goldId})`}
            strokeWidth="1.8"
          />

          {/* Curved Glossy Visor Reflection Arc */}
          <path
            d="M 64 54 Q 100 48 136 54 C 132 64, 68 64, 64 54 Z"
            fill="rgba(255, 255, 255, 0.28)"
          />

          {/* ============================================================ */}
          {/* LAYER 5: LUMINOUS GOLDEN CYBER-EYES WITH SMOOTH PARALLAX */}
          {/* ============================================================ */}
          <g
            id="mascot-eyes"
            style={{
              transform: `translate(${currentPupil.x}px, ${currentPupil.y}px)`,
              transition: isBlinking ? 'transform 0.05s' : 'none',
            }}
          >
            {isBlinking ? (
              /* Blink Horizontal Slits in Pure Radiant Gold */
              <>
                <line x1="74" y1="71" x2="94" y2="71" stroke="#FFF199" strokeWidth="4" strokeLinecap="round" filter={`url(#${bloomId})`} />
                <line x1="106" y1="71" x2="126" y2="71" stroke="#FFF199" strokeWidth="4" strokeLinecap="round" filter={`url(#${bloomId})`} />
              </>
            ) : isHappy ? (
              /* Joyful Arched Glowing Eyes (^ ^) */
              <>
                <path
                  d="M 74 76 Q 85 60 96 76"
                  fill="none"
                  stroke="#FFF2A3"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter={`url(#${bloomId})`}
                />
                <path
                  d="M 104 76 Q 115 60 126 76"
                  fill="none"
                  stroke="#FFF2A3"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter={`url(#${bloomId})`}
                />
              </>
            ) : isSurprised ? (
              /* Wide Surprised Eyes (O O) */
              <>
                <circle cx="85" cy="71" r="13" fill={`url(#${eyeGlowId})`} filter={`url(#${bloomId})`} />
                <circle cx="115" cy="71" r="13" fill={`url(#${eyeGlowId})`} filter={`url(#${bloomId})`} />
                <circle cx="82.5" cy="67.5" r="4.5" fill="#FFFFFF" />
                <circle cx="112.5" cy="67.5" r="4.5" fill="#FFFFFF" />
              </>
            ) : (
              /* Default Highly Luminous Friendly Eyes */
              <>
                {/* Left Eye */}
                <ellipse
                  cx="85"
                  cy="71"
                  rx="10.5"
                  ry="12.5"
                  fill={`url(#${eyeGlowId})`}
                  filter={`url(#${bloomId})`}
                />
                {/* Left Primary Specular Glint */}
                <circle cx="82" cy="66.5" r="3.8" fill="#FFFFFF" />
                {/* Left Secondary Micro Glint */}
                <circle cx="88.5" cy="74.5" r="1.6" fill="#FFFBEA" />

                {/* Right Eye */}
                <ellipse
                  cx="115"
                  cy="71"
                  rx="10.5"
                  ry="12.5"
                  fill={`url(#${eyeGlowId})`}
                  filter={`url(#${bloomId})`}
                />
                {/* Right Primary Specular Glint */}
                <circle cx="112" cy="66.5" r="3.8" fill="#FFFFFF" />
                {/* Right Secondary Micro Glint */}
                <circle cx="118.5" cy="74.5" r="1.6" fill="#FFFBEA" />
              </>
            )}
          </g>

          {/* Subtle Cyber Cheek Accents */}
          <line x1="68" y1="88" x2="76" y2="88" stroke="rgba(212,175,55,0.7)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="124" y1="88" x2="132" y2="88" stroke="rgba(212,175,55,0.7)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Interactive Helper Subtitle */}
      <span className="mt-2 text-[11px] font-mono text-[var(--color-slate-titanium)] opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-gold-champagne)] transition-colors">
        {language === 'ar' ? 'انقر لتتحدث مع مِعياري' : 'Click to interact with Miyaari'}
      </span>
    </div>
  );
};
