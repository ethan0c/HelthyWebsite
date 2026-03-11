"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

function italicFirst(text: string) {
  const i = text.indexOf(" ");
  if (i === -1) return <span className="text-italics">{text}</span>;
  return <><span className="text-italics">{text.slice(0, i)}</span>{text.slice(i)}</>;
}

const testimonials = [
  {
    title: "Finally something that makes tracking easy",
    quote: "I used to hate logging food because it felt like homework. This app makes it surprisingly simple. The barcode scanner works well, and the AI meal logging is way more accurate than I expected.",
    author: "Tasshtfxv",
    date: "Feb 2026",
  },
  {
    title: "Best Fitness I've Used In A While",
    quote: "Food logging is the main thing I use. You can type what you had, say it with voice, or scan the nutrition label and it pulls the info in. It's fast—I'll do 'chicken and rice' or scan a bar and it's done in a few seconds.",
    author: "jasonc1122",
    date: "Feb 2026",
  },
  {
    title: "I'm impressed and that's not easy to do",
    quote: "Tries to do something you don't see often. An attempt to only make you require one fitness app. It does a great job of not making you feel overwhelmed, very smooth interface.",
    author: "Avarricee",
    date: "Feb 2026",
  },
  {
    title: "Helthy is what everyone needs",
    quote: "My guy has made the most reliable and flexible workout and food app! It's so easy to use, especially when tracking your meals and workouts! Highly recommended!",
    author: "Obianuju8",
    date: "Feb 2026",
  },
  {
    title: "Beautiful App!",
    quote: "This app might just be better than Apple's native fitness logging app. Not just fitness but also health! Can't wait to see the app support connecting to an Apple Watch.",
    author: "noirvaze",
    date: "Dec 2025",
  },
  {
    title: "Amazing app",
    quote: "This is the best app! I use it everyday. The progress photos feature is really useful to see the change instead of going by the scale only.",
    author: "arceus208",
    date: "Dec 2025",
  },
  {
    title: "10/10",
    quote: "The fitness app of all time. Clean layout, no clutter. It syncs with Apple Health so my steps and workouts show up. I don't have to enter runs or gym sessions twice.",
    author: "Melliciousness",
    date: "Nov 2025",
  },
  {
    title: "Helthy is awesome",
    quote: "Very amazing app. The workout side is just as good—clean layout, easy to log sets, and it actually motivates you to improve. It feels like it was built for real people.",
    author: "caakino",
    date: "Dec 2025",
  },
  {
    title: "Great user experience",
    quote: "Only food and health app I've stuck with. It made logging easy, kept me consistent with reminders, and showed me the full picture—food, steps, workouts, weight, and progress in one place.",
    author: "NarendraT-X",
    date: "Dec 2025",
  },
  {
    title: "Love!",
    quote: "Great app. The app's gotten better since I first got it. New updates keep adding useful stuff and it doesn't feel bloated. Highly recommend for anyone serious about their fitness.",
    author: "kohene",
    date: "Nov 2025",
  },
];

// Colorful gradient backgrounds for avatars
const avatarGradients = [
  "bg-gradient-to-br from-violet-500 to-purple-600",
  "bg-gradient-to-br from-pink-500 to-rose-600",
  "bg-gradient-to-br from-amber-400 to-orange-500",
  "bg-gradient-to-br from-emerald-400 to-teal-500",
  "bg-gradient-to-br from-cyan-400 to-blue-500",
  "bg-gradient-to-br from-fuchsia-500 to-pink-600",
  "bg-gradient-to-br from-lime-400 to-green-500",
  "bg-gradient-to-br from-red-500 to-rose-600",
  "bg-gradient-to-br from-indigo-500 to-violet-600",
  "bg-gradient-to-br from-yellow-400 to-amber-500",
];

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-helthy-lemon text-helthy-lemon" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const initial = testimonial.author.charAt(0).toUpperCase();
  const gradientClass = avatarGradients[index % avatarGradients.length];
  
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-colors hover:bg-white/[0.05]">
      {/* Stars */}
      <div className="mb-4">
        <StarRating />
      </div>
      
      {/* Title */}
      <h3 className="font-heading text-lg sm:text-xl font-light text-white mb-3 tracking-[-0.01em]">
        {italicFirst(testimonial.title)}
      </h3>
      
      {/* Quote */}
      <p className="text-white/50 text-sm leading-relaxed mb-6">
        {testimonial.quote}
      </p>
      
      {/* Divider */}
      <div className="h-px bg-white/[0.06] mb-5" />
      
      {/* Author with colorful avatar */}
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${gradientClass} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-semibold text-sm">{initial}</span>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <p className="font-medium text-white text-sm">{testimonial.author}</p>
          <p className="text-xs text-white/40">{testimonial.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Rating badge with bounce
      gsap.from("[data-rating-badge]", {
        y: 40,
        opacity: 0,
        scale: 0.8,
        duration: 1.0,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Heading with smooth reveal
      gsap.from("[data-testimonial-heading] > *", {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      // Carousel smooth fade with scale
      gsap.from("[data-testimonial-carousel]", {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-testimonial-carousel]",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split testimonials into two rows
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5, 10);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 bg-[#060606] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-helthy-lemon/[0.015] blur-[150px] rounded-full" />
      </div>

      <div className="relative">
        {/* App Store rating badge */}
        <div data-rating-badge className="flex justify-center mb-8 px-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <StarRating />
            <span className="font-numeric text-white font-semibold">4.7</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/50 text-sm">37 ratings on the App Store</span>
          </div>
        </div>

        {/* Section heading */}
        <div data-testimonial-heading className="text-center mb-16 lg:mb-20 px-6">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-white">
            <span className="text-italics">Real</span> people,
            <br />
            <span className="text-white/30">real results</span>
          </h2>
        </div>

        {/* Auto-scrolling carousel */}
        <div data-testimonial-carousel className="space-y-4 sm:space-y-6">
          {/* Row 1 - scrolls left */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 sm:gap-6 animate-scroll-left">
              {/* First set */}
              {row1.map((testimonial, index) => (
                <TestimonialCard key={`row1-a-${index}`} testimonial={testimonial} index={index} />
              ))}
              {/* Duplicate for seamless loop */}
              {row1.map((testimonial, index) => (
                <TestimonialCard key={`row1-b-${index}`} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>

          {/* Row 2 - scrolls right */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 sm:gap-6 animate-scroll-right">
              {/* First set */}
              {row2.map((testimonial, index) => (
                <TestimonialCard key={`row2-a-${index}`} testimonial={testimonial} index={index + row1.length} />
              ))}
              {/* Duplicate for seamless loop */}
              {row2.map((testimonial, index) => (
                <TestimonialCard key={`row2-b-${index}`} testimonial={testimonial} index={index + row1.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
