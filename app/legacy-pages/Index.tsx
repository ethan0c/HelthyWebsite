import { ArrowUpRight, Trophy, Flame, Mail, Instagram, CheckCircle, Paperclip, Plus, Image as ImageIcon, Calendar, BarChart3, Bell, Infinity as InfinityIcon, HelpCircle, Dumbbell, Apple, Moon, Salad, Clock, Mic, Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Icon from '@mdi/react';
import { mdiFood, mdiFoodDrumstick } from '@mdi/js';
import WaitlistSection from "../../components/legacy/WaitlistSection";
import SiteFooter from "../../components/legacy/SiteFooter";
// Navbar and MobileSidebar are now global in layout
import { ThemeKey, getTheme, getThemeDisplayName, isDarkTheme } from "../../lib/colors";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/accordion";
import OcelabsBanner from "../../components/legacy/OcelabsBanner";
import AutoScrollRow from "../../components/legacy/AutoScrollRow";
import FeatureCard from "../../components/legacy/FeatureCard";
import TheProblemSection from "../../components/legacy/TheProblemSection";
import StackingCards from "../../components/legacy/StackingCards";
import IcoSphere from "../../components/legacy/IcoSphere";
// Removed PinnedHorizontalSequence usage; component kept for future use


export default function Index() {
  const [activeFeature] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('emerald_forest');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [resultText, setResultText] = useState('');
  const [isResultTyping, setIsResultTyping] = useState(false);
  const [typingSource, setTypingSource] = useState('What should I eat after a 5k run?');
  const [autoSendAfterTyping, setAutoSendAfterTyping] = useState(false);
  const [resultAnimate, setResultAnimate] = useState(false);
  const heroLogoRef = useRef<HTMLImageElement | null>(null);
  const [heroLogoTop, setHeroLogoTop] = useState<number | null>(null);
  
  // Section refs
  const aiSectionRef = useRef<HTMLElement | null>(null);
  const differentSectionRef = useRef<HTMLElement | null>(null);

  const features = [
    {
      title: "Tailored Workouts for Every Goal",
      screenshot: "/phones/home.svg"
    },
    {
      title: "Smart Nutrition Plans", 
      screenshot: "/phones/nutrition.svg"
    },
    {
      title: "Track Progress with Ease",
      screenshot: "/phones/progress.svg"
    }
  ];


  // Theme keys to show in selector (skip "automatic" to keep 7 curated themes)
  const themeKeys: ThemeKey[] = [
    'dark',
    'light',
    'ocean_abyss',
    'emerald_forest',
    'sunset_orange',
    'hello_kitty',
    'midnight_aurora',
  ];

  // Mood-based theme matching
  const [moodStep, setMoodStep] = useState<'pick' | 'feeling' | 'matched'>('pick');
  const [userMood, setUserMood] = useState('');
  const [isTypingMood, setIsTypingMood] = useState(false);
  const [matchedTheme, setMatchedTheme] = useState<ThemeKey | null>(null);
  const [showManualInMatched, setShowManualInMatched] = useState(false);
  
  // Quick-pick mood options to avoid typing
  const moodOptions = [
    'calm',
    'focused',
    'energetic',
    'playful',
    'creative',
    'clean',
    'dark',
    'vibrant',
    'balanced',
    'dreamy'
  ] as const;

  const moodToTheme = (mood: string): ThemeKey => {
    const moodLower = mood.toLowerCase();
    const words = moodLower.split(/\s+/);
    
    // Create scoring system for better matching
    const scores: Record<ThemeKey, number> = {
      'dark': 0,
      'light': 0,
      'automatic': 0,
      'ocean_abyss': 0,
      'emerald_forest': 0,
      'sunset_orange': 0,
      'hello_kitty': 0,
      'midnight_aurora': 0,
    };
    
    words.forEach(word => {
      // Dark theme keywords
      if (['dark', 'black', 'minimal', 'sleek', 'night', 'moody', 'edgy', 'shadow', 'void', 'gothic', 'stark', 'monochrome'].includes(word)) {
        scores.dark += 3;
      }
      
      // Ocean Abyss keywords  
      if (['deep', 'focus', 'focused', 'serious', 'intense', 'determined', 'blue', 'ocean', 'water', 'navy', 'professional', 'concentrated', 'study', 'work'].includes(word)) {
        scores.ocean_abyss += 3;
      }
      
      // Emerald Forest keywords
      if (['calm', 'peaceful', 'zen', 'relaxed', 'balanced', 'natural', 'green', 'forest', 'earth', 'grounded', 'tranquil', 'serene', 'meditative', 'fresh'].includes(word)) {
        scores.emerald_forest += 3;
      }
      
      // Sunset Orange keywords
      if (['energetic', 'pumped', 'motivated', 'excited', 'ready', 'vibrant', 'warm', 'orange', 'fire', 'dynamic', 'active', 'bold', 'enthusiastic', 'passionate'].includes(word)) {
        scores.sunset_orange += 3;
      }
      
      // Hello Kitty keywords
      if (['playful', 'cute', 'happy', 'cheerful', 'fun', 'pink', 'sweet', 'bubbly', 'joyful', 'bright', 'colorful', 'positive', 'upbeat', 'sunny'].includes(word)) {
        scores.hello_kitty += 3;
      }
      
      // Midnight Aurora keywords
      if (['creative', 'mystical', 'dreamy', 'magical', 'inspired', 'purple', 'cosmic', 'ethereal', 'artistic', 'mysterious', 'enchanted', 'spiritual', 'visionary', 'imaginative'].includes(word)) {
        scores.midnight_aurora += 3;
      }
      
      // Light theme keywords
      if (['clean', 'simple', 'pure', 'white', 'minimal', 'crisp', 'clear', 'bright', 'airy', 'spacious', 'modern', 'neutral', 'classic', 'traditional'].includes(word)) {
        scores.light += 3;
      }
    });
    
    // Add partial matches for broader coverage
    if (moodLower.includes('tired') || moodLower.includes('sleepy')) scores.dark += 2;
    if (moodLower.includes('stressed') || moodLower.includes('overwhelmed')) scores.ocean_abyss += 2;
    if (moodLower.includes('anxious') || moodLower.includes('nervous')) scores.emerald_forest += 2;
    if (moodLower.includes('angry') || moodLower.includes('frustrated')) scores.sunset_orange += 2;
    if (moodLower.includes('sad') || moodLower.includes('lonely')) scores.hello_kitty += 2;
    if (moodLower.includes('confused') || moodLower.includes('lost')) scores.midnight_aurora += 2;
    
    // Find the theme with highest score
    const maxScore = Math.max(...Object.values(scores));
    
    // If no clear winner, pick based on overall sentiment
    if (maxScore === 0) {
      const themes: ThemeKey[] = ['emerald_forest', 'ocean_abyss', 'sunset_orange', 'hello_kitty', 'midnight_aurora', 'dark'];
      return themes[Math.floor(Math.random() * themes.length)];
    }
    
    // Return the theme with highest score
    const winner = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as ThemeKey;
    return winner || 'emerald_forest';
  };

  const handleMoodSubmit = (override?: string) => {
    const input = (override ?? userMood).trim();
    if (!input) return;
    setUserMood(input);
    setIsTypingMood(true);
    setTimeout(() => {
      const theme = moodToTheme(input);
      setMatchedTheme(theme);
      setSelectedTheme(theme);
      setMoodStep('matched');
      setIsTypingMood(false);
    }, 1500);
  };

  const handleMoodOptionClick = (word: string) => {
    if (isTypingMood) return;
    handleMoodSubmit(word);
  };

  const resetMoodFlow = () => {
    setMoodStep('pick');
    setUserMood('');
    setMatchedTheme(null);
    setShowManualInMatched(false);
  };

  // Currently selected theme object for dynamic styling
  const activeTheme = getTheme(selectedTheme);
  const grad1 = activeTheme.gradient1 ?? activeTheme.primary;
  const grad2 = activeTheme.gradient2 ?? activeTheme.accent ?? activeTheme.primary;

  // Utility: convert hex (#RRGGBB or #RRGGBBAA) to rgba(r,g,b,a)
  const toRgba = (hex: string, alpha: number) => {
    try {
      let h = hex.trim();
      if (h.startsWith('#')) h = h.slice(1);
      if (h.length === 3) {
        const r = parseInt(h[0] + h[0], 16);
        const g = parseInt(h[1] + h[1], 16);
        const b = parseInt(h[2] + h[2], 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      if (h.length === 6 || h.length === 8) {
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return hex; // fallback
    } catch {
      return hex;
    }
  };
  // Align hero logo center with navbar pill on desktop and hamburger button on mobile
  useEffect(() => {
    const compute = () => {
      const logo = heroLogoRef.current;
      if (!logo) return;
      // Prefer mobile menu button when in mobile viewport
      const mobileBtn = document.getElementById('mobile-menu-button');
      const pill = document.getElementById('nav-pill');
      let target: HTMLElement | null = null;
      const isMobile = window.matchMedia('(max-width: 767px)').matches; // md breakpoint just before 768px
      if (isMobile && mobileBtn) {
        target = mobileBtn;
      } else if (pill) {
        target = pill;
      }
      if (!target) return;
      const tRect = target.getBoundingClientRect();
      const lRect = logo.getBoundingClientRect();
      const centerY = tRect.top + tRect.height / 2;
      const top = Math.max(0, centerY - lRect.height / 2);
      setHeroLogoTop(Math.round(top));
    };
    const raf = requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    window.addEventListener('orientationchange', compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', compute);
      window.removeEventListener('orientationchange', compute);
    };
  }, []);

  // Simple typing effect for AI input demo (driven by typingSource)
  useEffect(() => {
    if (!isTyping) return;
    const demoText = typingSource || '';
    setTypedText(''); // Clear any previous text
    let i = 0;
    const id = setInterval(() => {
      if (i < demoText.length) {
        setTypedText(demoText.slice(0, i + 1));
        i += 1;
      } else {
        clearInterval(id);
        setIsTyping(false);
        // wait for user to Send; keep result hidden until thinking completes
        setShowResult(false);
        if (autoSendAfterTyping) {
          // start thinking with the just-typed prompt
          startThinking(demoText);
          setAutoSendAfterTyping(false);
        }
      }
    }, 40);
    return () => clearInterval(id);
  }, [isTyping, typingSource, autoSendAfterTyping]);

  // Preloaded prompts and answers (health-related)
  const suggestions = [
    'Build me a 3-day beginner workout',
    'What should I eat after a 5k run?',
    'How can I improve my sleep quality?',
    'Quick 20‑min hotel workout',
    'High‑protein 1800 kcal day',
    'How to reduce cravings?'
  ];

  const answers: Record<string, string> = {
    'Build me a 3-day beginner workout':
      `A gentle, effective 3‑day plan to build consistency and whole‑body strength:\n\nDay 1 – Full Body A\n• Goblet Squat 3×8 (2–3 RIR)\n• Push‑ups 3×6–10 (incline if needed)\n• One‑arm Row 3×10/side (DB or band)\n• Plank 3×30–45s\n\nDay 2 – Active Recovery\n• 25–35 min brisk walk or easy cycle\n• 8–10 min mobility (hips, T‑spine, ankles)\n\nDay 3 – Full Body B\n• Hip Hinge 3×8 (RDL or hip thrust)\n• Overhead Press 3×8 (DB)\n• Split Squat 3×8/leg\n• Dead Bug 3×8/side\n\nProgression\n• If all sets feel comfortable, add 1–2 reps next week.\n• Keep rest ~60–90s; focus on clean technique.`,
    'What should I eat after a 5k run?':
      `Refuel within ~60 min to speed recovery:\n• Carbs: 1–1.2 g/kg (rice, oats, fruit)\n• Protein: 20–30 g (eggs, yogurt, lean meat)\n• Fluids + electrolytes: water + pinch of salt or sports drink\n\nFast, tasty options\n• Greek yogurt + banana, berries, honey\n• Eggs on sourdough + avocado, OJ\n• Rice, chicken, roasted veg + olive oil`,
    'How can I improve my sleep quality?':
      `Better sleep tonight:\n• Same wake time daily (yes, weekends)\n• Morning light: 5–10 min daylight\n• Wind‑down: 30–45 min no screens (read, stretch, breathe)\n• Room: cool (18–20°C), dark, quiet\n• Caffeine: cut 8–10h before bed\n• Late hunger: light carb snack (banana, toast)`,
    'Quick 20‑min hotel workout':
      `No equipment, total body (AMRAP style):\n• 5 push‑ups (elevate hands if needed)\n• 10 squats\n• 10 glute bridges\n• 10 alternating reverse lunges\n• 20‑sec plank\nRepeat for 20 min at steady pace; warm up 3–5 min, cool down 3–5 min.`,
    'High‑protein 1800 kcal day':
      `Sample day (~1800 kcal, ~140–160 g protein):\nBreakfast: Greek yogurt bowl + berries, granola, honey\nLunch: Chicken, rice, roasted veg, olive oil\nSnack: Cottage cheese + fruit\nDinner: Salmon, potatoes, salad\nTip: Distribute protein 25–40 g per meal.`,
    'How to reduce cravings?':
      `Strategies that work:\n• Eat enough protein + fiber each meal\n• Don’t skip meals; keep 3–4 hr rhythm\n• Hydrate; mild thirst can feel like cravings\n• Sleep 7–9 h; low sleep ↑ cravings\n• Keep favorite treats, but pre‑portion them`
  };

  // Start typing the AI answer character-by-character
  useEffect(() => {
    if (!isResultTyping || !selectedPrompt) return;
    const full = answers[selectedPrompt] ?? 'Here’s guidance tailored to you. We’ll personalize even more with your goals and history.';
    let i = 0;
    const id = setInterval(() => {
      if (i < full.length) {
        setResultText(full.slice(0, i + 1));
        i += 1;
      } else {
        clearInterval(id);
        setIsResultTyping(false);
      }
    }, 16);
    return () => clearInterval(id);
  }, [isResultTyping, selectedPrompt]);

  // Animate result card on show
  useEffect(() => {
    if (showResult) {
      setResultAnimate(false);
      const id = requestAnimationFrame(() => setResultAnimate(true));
      return () => cancelAnimationFrame(id);
    } else {
      setResultAnimate(false);
    }
  }, [showResult]);

  const startThinking = (prompt: string) => {
    const p = prompt.trim();
    if (!p) return;
    setSelectedPrompt(p);
    setResultText(''); // Clear any previous result
    setShowResult(false);
    setIsThinking(true);
    setIsResultTyping(false);
    setTimeout(() => {
      setIsThinking(false);
      setShowResult(true);
      setIsResultTyping(true);
    }, 1200);
  };

  const handleSuggestionClick = (prompt: string) => {
    // Type into the input first, then auto-send
    setTypedText(''); // Clear any existing text
    setResultText(''); // Clear any existing result
    setShowResult(false); // Hide any existing result
    setTypingSource(prompt);
    setIsTyping(true);
    setAutoSendAfterTyping(true);
  };

  const handleSend = () => {
    if (isThinking || isResultTyping) return;
    const promptToSend = (typedText || typingSource || suggestions[1]).trim();
    if (!promptToSend) return;
    startThinking(promptToSend);
  };

  // Animated placeholder that types, pauses, and deletes when input is empty
  const placeholderPhrases = [
    'Click one of the cards',
    'Build me a 3-day beginner workout',
    'High‑protein 1800 kcal day',
    'Quick 20‑min hotel workout'
  ];
  const [phIndex, setPhIndex] = useState(0);
  const [phText, setPhText] = useState('');
  const [phDeleting, setPhDeleting] = useState(false);

  useEffect(() => {
    // Run placeholder animation only when there is no active user typing demo
    if (typedText.length > 0 || isTyping) return;
    const phrase = placeholderPhrases[phIndex % placeholderPhrases.length];
    let timer: number | undefined;
    const typeDelay = 42;
    const deleteDelay = 28;
    const pauseFullMs = 900;
    const pauseEmptyMs = 220;

    if (!phDeleting) {
      if (phText.length < phrase.length) {
        timer = window.setTimeout(() => setPhText(phrase.slice(0, phText.length + 1)), typeDelay);
      } else {
        timer = window.setTimeout(() => setPhDeleting(true), pauseFullMs);
      }
    } else {
      if (phText.length > 0) {
        timer = window.setTimeout(() => setPhText(phrase.slice(0, phText.length - 1)), deleteDelay);
      } else {
        timer = window.setTimeout(() => {
          setPhDeleting(false);
          setPhIndex((i) => (i + 1) % placeholderPhrases.length);
        }, pauseEmptyMs);
      }
    }

    return () => { if (timer) window.clearTimeout(timer); };
  }, [phText, phDeleting, phIndex, typedText, isTyping]);
  return (
    <div className="min-h-screen bg-white">
  {/* Global Navbar/Sidebar rendered in layout */}

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-[900px]">
        {/* Background video with right-side dark gradient overlay */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/videos/hero-man-running.webm" type="video/webm" />
          <source src="/videos/hero-man-running.mp4" type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(270.77deg, rgba(0, 0, 0, 0) 62.1%, rgba(0, 0, 0, 0.6) 93.98%)",
          }}
          aria-hidden
        />

        {/* Logo now rendered globally via AlignedLogo in layout */}

        {/* Copy block positioned per Figma (left aligned, vertically centered) */}
        <div className="absolute z-10 left-[20px] sm:left-[40px] md:left-[78px] top-1/2 -translate-y-1/2 pr-4 right-4 sm:right-8">
          <div className="w-full max-w-[585.21px] space-y-4 sm:space-y-6 md:space-y-8">
            <h1
              className="scroll-reveal animate-slide-up font-sans text-[28px] sm:text-[40px] md:text-[56px] lg:text-[72px] xl:text-[96.2px] leading-[1] tracking-[-0.02em] text-white/70"
              style={{ backdropFilter: 'blur(2.65px)', fontWeight: 500 }}
            >
              Your Health,
              <br />
              Your Power
            </h1>

            <p
              className="scroll-reveal animate-slide-up stagger-1 font-sans text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.3] text-white max-w-[515.82px]"
            >
              Helthy helps you build a stronger body and a happier mind one
              workout, one meal, and one good habit at a time. No pressure, no
              perfection just progress.
            </p>

            <a
              href="#waitlist"
              className="scroll-reveal animate-scale-in stagger-2 group inline-flex items-center justify-center gap-3 sm:gap-4 md:gap-6 rounded-[47px] border-2 border-white/30 bg-[#CDFB50] py-1.5 sm:py-2 pl-[20px] sm:pl-[25px] md:pl-[30px] pr-1.5 sm:pr-2 shadow-[0px_8px_16px_rgba(114,146,28,0.2)] hover:shadow-lg transition-shadow"
            >
              <span className="text-[#151515] font-medium text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[22px] tracking-[0.17px]">
                Join Waitlist
              </span>
              <div className="bg-[#151515] w-[36px] sm:w-[44px] md:w-[52px] h-[36px] sm:h-[44px] md:h-[52px] rounded-[30px] flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-white" strokeWidth={3} />
              </div>
            </a>
          </div>
        </div>

        {/* Line Graph */}
        <div className="absolute bottom-10 sm:bottom-15 md:bottom-20 left-[20px] sm:left-[40px] md:left-[78px] hidden lg:block scroll-reveal animate-slide-up stagger-3">
          <img
            src="/figma-components/hero/hero-graph.svg"
            alt="Performance line graph"
            className="w-[200px] md:w-[280px] lg:w-[324px] h-auto drop-shadow-lg"
          />
        </div>
      </section>

      {/* Waitlist section (shared component) */}
      <WaitlistSection />

      <TheProblemSection />

  {/* What Makes Helthy Different — Card Row Carousel */}
  <section ref={differentSectionRef} className="relative bg-gradient-to-b from-helthy-black via-helthy-lemon/5 to-helthy-black pt-24 md:pt-32 pb-20 md:pb-24 overflow-hidden">
        {/* Decorative glows */}
        <div aria-hidden className="pointer-events-none absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-helthy-lemon/10 blur-[140px] opacity-40" />
        <div aria-hidden className="pointer-events-none absolute bottom-20 right-10 w-[350px] h-[350px] rounded-full bg-helthy-lemon/10 blur-[120px] opacity-40" />

  <div className="relative mx-auto max-w-[1600px] px-0 md:px-6 mb-12 lg:mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 scroll-reveal animate-scale-in">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 text-helthy-lemon text-sm font-medium tracking-wide">
                Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-white mb-6 scroll-reveal animate-slide-up stagger-1" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
              What Makes Helthy <span className="text-helthy-lemon">Different</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed scroll-reveal animate-slide-up stagger-2">
              A holistic approach to movement, nutrition, and progress — built to help you stay consistent and reach your goals.
            </p>
          </div>
        </div>

        <div className="relative scroll-reveal animate-slide-up stagger-3">
          <AutoScrollRow className="w-full" speedSeconds={38} gapClass="gap-8 lg:gap-10">
            <FeatureCard
              title="Real Progress Insights"
              subtitle="See clear trends, celebrate wins, and stay motivated."
              imageSrc="/figma-components/different/full-length-woman-wearing-sunglasses-against-sky%201.png"
              leftColor="#CDFB50"
              rightColor="#8AE58C"
            />
            <FeatureCard
              title="Personalized Workouts"
              subtitle="Smart routines adapt to your goals, body, and schedule."
              imageSrc="/figma-components/different/full-shot-woman-exercising-gym-2%201.png"
              leftColor="#7FBAD1"
              rightColor="#B28CF1"
            />
            <FeatureCard
              title="Nutrition Made Simple"
              subtitle="Track meals and macros with clarity—not complexity."
              imageSrc="/figma-components/different/full-shot-man-eating-eating-salad%201.png"
              leftColor="#FFB86C"
              rightColor="#F26D6D"
            />
            <FeatureCard
              title="Community Support"
              subtitle="Move, eat, and grow together—accountability built-in."
              imageSrc="/figma-components/different/group-people-exercising-together-outdoors 1.svg"
              leftColor="#7FD1AE"
              rightColor="#6FA8FF"
            />
          </AutoScrollRow>
        </div>

        {/* Smooth fade into next section */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 md:h-32 bg-gradient-to-b from-transparent to-helthy-black" />
  </section>

  {/* Voice & Meal Intelligence Section */}
  <section
        ref={aiSectionRef}
        id="ai"
        className="relative overflow-hidden bg-helthy-black py-20"
      >
        {/* Features Section */}
        <div className="container mx-auto px-6 lg:px-20 mb-20">
          <div className="text-center mb-16 lg:mb-20">
            <div className="mb-6 scroll-reveal animate-scale-in">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 text-helthy-lemon text-sm font-medium tracking-wide">
                Smart Logging
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-helthy-lemon mb-6 scroll-reveal animate-slide-up stagger-1" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
              Voice & Meal Intelligence
            </h2>
            <p className="font-sans text-[18px] md:text-[20px] max-w-3xl mx-auto text-white/80 leading-relaxed scroll-reveal animate-slide-up stagger-2">
              Log workouts and meals hands‑free. Get simple meal breakdowns that make eating well easy.
            </p>
          </div>

          {/* Voice & Photo logging at the bottom */}
          <div className="flex flex-col items-center gap-20 max-w-[1440px] mx-auto">
              {/* Section title */}
            
              {/* Cards container */}
              <div className="w-full lg:h-[600px] bg-helthy-black rounded-[20px] relative p-4 overflow-visible touch-pan-y select-none scroll-reveal animate-slide-up stagger-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-3 lg:h-full overflow-visible">
                  {/* Meal Intelligence Card */}
                  <div className="relative w-full h-[477px] bg-gradient-to-b from-white/10 to-transparent rounded-[20px] overflow-hidden" 
                       style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 108.72%), rgba(23, 23, 23, 0.2)' }}>
                    {/* Background image section */}
                    <div className="absolute w-full lg:w-[632px] h-[320px] left-0 lg:left-[-2px] top-0 bg-[#262724]">
                      <img 
                        src="/figma-components/ai/roasted-chicken-dinner-platter-delicious-feast 1.svg" 
                        alt="Roasted chicken dinner platter delicious feast" 
                        className="absolute w-[200px] sm:w-[250px] lg:w-[300.9px] h-[200px] sm:h-[250px] lg:h-[300.9px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                      />
                      
                      {/* Chicken nutrition card with glass effect */}
                      <div className="absolute w-[160px] sm:w-[180px] lg:w-[222px] h-[56px] sm:h-[60px] lg:h-[68px] right-[8px] sm:right-[12px] lg:left-[375px] top-[16px] sm:top-[20px] lg:top-[26.34px] rounded-[6px] lg:rounded-[8px] overflow-hidden"
                           style={{ 
                             background: 'rgba(0, 0, 0, 0.15)',
                             borderLeft: '6px solid #CDFB50',
                             boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.05), inset 0px 0px 10px 3px rgba(255, 255, 255, 0.5)',
                             backdropFilter: 'blur(5px)',
                             WebkitBackdropFilter: 'blur(5px)',
                             fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif'
                           }}>
                        {/* Icon */}
                        <div className="absolute w-[28px] h-[30px] sm:w-[32px] sm:h-[34px] lg:w-[34px] lg:h-[36px] left-[12px] sm:left-[14px] lg:left-[17px] top-[13px] sm:top-[14px] lg:top-[16px] bg-white/30 rounded-[6px] flex items-center justify-center">
                          <Icon path={mdiFoodDrumstick} size={0.7} className="sm:w-[0.75] lg:w-[0.8]" color="white" />
                        </div>
                        
                        {/* Content */}
                        <div className="absolute left-[48px] sm:left-[54px] lg:left-[65px] top-[10px] sm:top-[11px] lg:top-[12px] right-[38px] sm:right-[42px] lg:right-[45px]">
                          <div className="flex flex-col gap-0.5 lg:gap-1">
                            <span className="text-white font-semibold text-[8px] sm:text-[9px] lg:text-[10px] leading-[120%] uppercase tracking-wide">Chicken</span>
                            <span className="text-white text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">100g</span>
                            <div className="flex gap-2 sm:gap-3 lg:gap-4 mt-0.5 lg:mt-1">
                              <span className="text-[#CDFB50] text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">P 4g</span>
                              <span className="text-[#CDFB50] text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">C 7g</span>
                              <span className="text-[#CDFB50] text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">F 4g</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Calories */}
                        <div className="absolute right-[10px] sm:right-[12px] lg:right-[17px] top-[11px] sm:top-[12px] lg:top-[14px] flex flex-col items-end">
                          <span className="text-white text-[16px] sm:text-[18px] lg:text-[20px] leading-[120%] font-normal">81</span>
                          <span className="text-white text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">cal</span>
                        </div>
                      </div>
                      
                      {/* Potatoes nutrition card with glass effect */}
                      <div className="absolute w-[160px] sm:w-[180px] lg:w-[222px] h-[56px] sm:h-[60px] lg:h-[68px] left-[8px] sm:left-[12px] lg:left-[29px] bottom-[16px] sm:bottom-[20px] lg:top-[211px] rounded-[6px] lg:rounded-[8px] overflow-hidden"
                           style={{ 
                             background: 'rgba(0, 0, 0, 0.15)',
                             borderLeft: '6px solid #CDFB50',
                             boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.05), inset 0px 0px 10px 3px rgba(255, 255, 255, 0.5)',
                             backdropFilter: 'blur(5px)',
                             WebkitBackdropFilter: 'blur(5px)',
                             fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif'
                           }}>
                        {/* Icon */}
                        <div className="absolute w-[28px] h-[30px] sm:w-[32px] sm:h-[34px] lg:w-[34px] lg:h-[36px] left-[12px] sm:left-[14px] lg:left-[17px] top-[13px] sm:top-[14px] lg:top-[16px] bg-white/30 rounded-[6px] flex items-center justify-center">
                          <Icon path={mdiFood} size={0.7} className="sm:w-[0.75] lg:w-[0.8]" color="white" />
                        </div>
                        
                        {/* Content */}
                        <div className="absolute left-[48px] sm:left-[54px] lg:left-[65px] top-[10px] sm:top-[11px] lg:top-[12px] right-[38px] sm:right-[42px] lg:right-[45px]">
                          <div className="flex flex-col gap-0.5 lg:gap-1">
                            <span className="text-white font-semibold text-[8px] sm:text-[9px] lg:text-[10px] leading-[120%] uppercase tracking-wide">Potatoes</span>
                            <span className="text-white text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">300g</span>
                            <div className="flex gap-2 sm:gap-3 lg:gap-4 mt-0.5 lg:mt-1">
                              <span className="text-[#CDFB50] text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">P 4g</span>
                              <span className="text-[#CDFB50] text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">C 7g</span>
                              <span className="text-[#CDFB50] text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">F 4g</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Calories */}
                        <div className="absolute right-[10px] sm:right-[12px] lg:right-[17px] top-[11px] sm:top-[12px] lg:top-[14px] flex flex-col items-end">
                          <span className="text-white text-[16px] sm:text-[18px] lg:text-[20px] leading-[120%] font-normal">120</span>
                          <span className="text-white text-[7px] sm:text-[7.5px] lg:text-[8px] leading-[120%]">cal</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content section */}
                    <div className="absolute w-full left-0 right-0 px-6 lg:w-[324px] lg:left-[32.41px] bottom-6 lg:top-[352px] flex flex-col gap-3 lg:gap-[17px]">
                      <h3 className="text-[#CDFB50] text-[20px] lg:text-[24px] leading-[120%] tracking-[-0.02em] font-normal">
                        Meal Intelligence
                      </h3>
                      <p className="text-white/60 text-[14px] lg:text-[16px] leading-[140%] lg:leading-[120%] tracking-[0.02em] max-w-full lg:w-[434.99px]">
                        Helthy helps you eat better, not harder. AI-driven nutrition suggestions make it easy to plan balanced meals and discover healthy options that fit your lifestyle.
                      </p>
                    </div>
                  </div>

                  {/* Voice Logging Card */}
                  <div className="relative bg-gradient-to-b from-white/10 to-transparent rounded-[20px] border-t border-white/30 overflow-hidden h-[477px] touch-pan-y select-none">
                    {/* Header area with cleaner visualization */}
                    <div className="relative top-0 left-0 right-0 h-[240px] bg-[rgba(190,231,80,0.04)] rounded-t-[20px]">
                      {/* Centered mic button with subtle glow */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute -inset-8 rounded-full bg-helthy-lemon/20 blur-2xl" aria-hidden />
                          <div className="w-[72px] h-[72px] rounded-full bg-helthy-lemon text-helthy-black flex items-center justify-center shadow-[0_8px_24px_rgba(205,251,80,0.35)] border border-black/10">
                            <Mic className="w-7 h-7" />
                          </div>
                        </div>
                      </div>

                      {/* Minimal waveform (static, clean) */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-[6px]" aria-hidden>
                        {Array.from({ length: 24 }, (_, i) => {
                          const prng01 = (n: number) => {
                            const x = Math.sin(n * 12.9898) * 43758.5453;
                            return x - Math.floor(x);
                          };
                          const base = 10 + prng01(i) * 36; // 10..46px
                          return (
                            <div
                              key={i}
                              className="w-[4px] rounded-full"
                              style={{
                                height: `${base.toFixed(0)}px`,
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.85), rgba(205,251,80,0.9))',
                                boxShadow: '0 2px 8px rgba(205,251,80,0.25)'
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
                      <h3 className="text-helthy-lemon text-[20px] lg:text-[24px] leading-[120%] tracking-[-0.02em] font-normal mb-3">
                        Voice Logging
                      </h3>
                      <p className="text-white/70 text-[14px] lg:text-[16px] leading-[150%] tracking-[0.01em] max-w-full lg:max-w-[520px] mb-3">
                        Log workouts and meals hands‑free. Speak naturally—Helthy captures the details and saves them instantly.
                      </p>
                      <ul className="text-white/70 text-xs lg:text-sm grid grid-cols-1 sm:grid-cols-2 gap-y-2 max-w-full lg:max-w-[520px]">
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-helthy-lemon" />
                          Hands‑free logging
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-helthy-lemon" />
                          Understands natural speech
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-helthy-lemon" />
                          Instant save, zero friction
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-helthy-lemon" />
                          Works anywhere
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


  {/* Themes Section - Rotating Spheres */}
  <section 
    className="relative py-20 md:py-28 overflow-hidden transition-all duration-700"
    style={{ 
      background: selectedTheme 
        ? `radial-gradient(ellipse at center, ${toRgba(getTheme(selectedTheme).primary, 0.08)}, transparent 70%), ${getTheme(selectedTheme).background}`
        : '#CDFB50'
    }}
  >
    {/* Ambient glow orbs matching selected theme */}
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
      <div 
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-700" 
        style={{ 
          background: `radial-gradient(closest-side, ${selectedTheme ? toRgba(getTheme(selectedTheme).primary, 0.25) : 'rgba(205,251,80,0.3)'}, transparent)`
        }} 
      />
      <div 
        className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-700" 
        style={{ 
          background: `radial-gradient(closest-side, ${selectedTheme ? toRgba(getTheme(selectedTheme).accent || getTheme(selectedTheme).primary, 0.2) : 'rgba(124,108,255,0.2)'}, transparent)`
        }} 
      />
    </div>

    {/* MouseRings removed for smoother scrolling */}

  <div className="relative z-20 w-full px-0">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2 
          className="scroll-reveal animate-slide-up text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-4 transition-colors duration-700" 
          style={{ 
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
            color: selectedTheme ? getTheme(selectedTheme).text : '#111111'
          }}
        >
          Pick your <span style={{ color: selectedTheme ? getTheme(selectedTheme).primary : '#111111' }}>vibe</span>
        </h2>
        <p 
          className="scroll-reveal animate-slide-up stagger-1 text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-700" 
          style={{ 
            color: selectedTheme ? `${getTheme(selectedTheme).text}99` : '#111111CC'
          }}
        >
          Choose a theme that matches your energy
        </p>
      </div>

      {/* 7 IcoSphere buttons */}
      <div className="scroll-reveal animate-scale-in stagger-2 flex justify-center items-center gap-6 md:gap-8 lg:gap-10 mb-12 overflow-x-auto pb-4 pt-8">
        {themeKeys.map((key) => (
          <button
            key={key}
            onClick={() => setSelectedTheme(key)}
            className={`group relative flex-shrink-0 transition-all duration-500 ${
              selectedTheme === key 
                ? 'scale-110' 
                : 'hover:scale-105 opacity-80 hover:opacity-100'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* IcoSphere canvas (static) */}
            <IcoSphere
              size={96}
              colorA={getTheme(key).gradient1 || getTheme(key).primary}
              colorB={getTheme(key).gradient2 || getTheme(key).accent || getTheme(key).primary}
              subdivisions={1}
              ambient={0.25}
              lightDir={[-0.4, 0.85, 0.35]}
              rotationSpeed={Math.PI / 8}
              animate={false}
              highlighted={selectedTheme === key}
              className="transition-all duration-700"
            />

            {/* Theme name label */}
            <div 
              className={`mt-3 text-sm md:text-base font-medium text-center transition-all duration-500 ${
                selectedTheme === key ? 'opacity-100' : 'opacity-60'
              }`}
              style={{ 
                color: selectedTheme ? getTheme(selectedTheme).text : '#111111'
              }}
            >
              {getThemeDisplayName(key)}
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>

        {/* Pricing moved to /pricing page */}

      

      {/* FAQ + Waitlist Combined Section */}
      <section id="faq" className="relative bg-helthy-black py-20 lg:py-32 overflow-hidden">
        {/* Smooth fade from previous section */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 md:h-24 bg-gradient-to-b from-helthy-black to-transparent" />
        
  {/* MouseRings removed for smoother scrolling */}
        <div className="container relative z-20 mx-auto px-6 lg:px-20">
          {/* FAQ */}
          <h2 className="scroll-reveal animate-slide-up font-sans text-[36px] md:text-[48px] leading-[1.2] tracking-[-0.02em] text-helthy-lemon text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="scroll-reveal animate-slide-up stagger-1 max-w-3xl mx-auto faq-questions">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white text-base md:text-lg">What is Helthy?</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  Helthy is an all-in-one fitness app that brings workouts, smart nutrition, progress tracking, and HELTHY AI coaching together in one simple experience — completely free.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white text-base md:text-lg">How much does Helthy cost?</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  Helthy is 100% free. No subscriptions, no trials, no credit card needed. All features are available to everyone, forever. Learn more on our <a href="/pricing" className="underline text-helthy-lemon">Pricing</a> page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white text-base md:text-lg">Why is it free?</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  We believe everyone deserves access to quality health tools. Helthy is supported by partnerships and our community. No ads, no data selling — just a commitment to your wellness.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white text-base md:text-lg">Does it sync with Apple Health or Google Fit?</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  Yes. Helthy integrates with Apple Health and Google Fit so your activity and metrics stay in sync.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-white text-base md:text-lg">Will there be paid features in the future?</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  All core features will always be free. We may introduce optional premium add-ons (like 1-on-1 coaching), but the complete Helthy experience you see today will remain free forever.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-white text-base md:text-lg">How does HELTHY AI use my data?</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  HELTHY AI uses your inputs to personalize plans and insights. Your data is processed securely, never sold, and you control what you share.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Waitlist moved above under hero */}
        </div>
        {/* Lemon blur ellipse at section bottom */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="mx-auto w-[1200px] max-w-[95vw] h-[180px] bg-helthy-lemon/60 blur-[150px] rounded-full" />
        </div>
      </section>

      {/* Waitlist section moved above; removed duplicate from here */}

      {/* Shared footer */}
      <SiteFooter />

      
    </div>
  );
}
