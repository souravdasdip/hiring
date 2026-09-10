"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const trendingSearches = [
    { label: "Remote", href: "/jobs" },
    { label: "Software Engineer", href: "/jobs" },
    { label: "Product Designer", href: "/jobs" },
    { label: "Marketing Manager", href: "/jobs" },
    { label: "Healthcare", href: "/jobs" },
  ];

  return (
    <section className="relative w-full overflow-hidden min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex items-center bg-slate-900">
      
      {/* Full View Width Background Hiring Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hiring-banner.jpg"
          alt="Hiring team collaborating in a modern tech office"
          className="w-full h-full object-cover object-[center_28%] scale-100"
        />
        
        {/* Directional scrim: Only darkens the left side for crisp text contrast, leaving the right side bright and vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/75 via-55% to-slate-950/15 sm:w-[75%] lg:w-[62%]" />
        
        {/* Very subtle bottom transition to blend with next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950/60 to-transparent" />
      </div>

      {/* Text & Search Bar Content ON the Banner Image */}
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
        
        <div className="max-w-3xl">
          
          {/* Top Active Hiring Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-400/40 backdrop-blur-md shadow-lg shadow-emerald-950/50 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>WE ARE ACTIVELY HIRING &bull; 500+ OPEN ROLES ACROSS USA</span>
          </div>

          {/* Main Headline (Bold, High Contrast, 100% Readable) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6 drop-shadow-sm">
            Discover Your Next{" "}
            <span className="text-indigo-400">
              Career Breakthrough
            </span>{" "}
            in the USA
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-normal leading-relaxed max-w-2xl mb-8 drop-shadow-sm">
            Connect directly with verified employers and high-growth teams. Explore curated full-time, part-time, and flexible remote opportunities tailored to your ambitions.
          </p>

          {/* Integrated Job Search Bar ON the Banner */}
          <div className="w-full max-w-2xl mb-4">
            <form
              onSubmit={handleSearch}
              className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl shadow-black/40 border border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              {/* Keyword Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-slate-200">
                <Search className="w-5 h-5 text-indigo-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0">
                <MapPin className="w-5 h-5 text-violet-600 shrink-0" />
                <input
                  type="text"
                  placeholder="City, State, or 'Remote'..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
                />
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                size="lg"
                className="rounded-xl sm:rounded-full px-8 py-6 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/35 transition-all duration-300 active:scale-95 shrink-0 border-none cursor-pointer"
              >
                Search Jobs
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>
          </div>

          {/* Trending Searches */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-200 mb-8">
            <span className="font-bold text-white flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              Trending:
            </span>
            {trendingSearches.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold transition-colors backdrop-blur-sm"
              >
                {tag.label}
              </Link>
            ))}
          </div>

          {/* Perks Row on Banner */}
          <div className="pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/25 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <span>
                <strong className="text-white block font-semibold">48h Fast Response</strong>
                Direct hiring reviews
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>
                <strong className="text-white block font-semibold">Verified Employers</strong>
                100% scam-free listings
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/25 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>
                <strong className="text-white block font-semibold">Clear Compensation</strong>
                Upfront salary ranges
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Badges on Desktop Right Side of Banner */}
      <div className="hidden xl:block absolute top-12 right-12 z-20">
        <div className="bg-slate-900/85 border border-white/20 backdrop-blur-xl p-4 rounded-2xl shadow-2xl text-white max-w-xs animate-float">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-indigo-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Hiring Surge
              </div>
              <div className="text-base font-bold text-white">120+ New This Week</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 mt-2.5 leading-tight">
            Top tech, finance, and healthcare companies are actively conducting interviews.
          </p>
        </div>
      </div>

      <div className="hidden xl:block absolute bottom-12 right-12 z-20">
        <div className="bg-slate-900/85 border border-white/20 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl text-white flex items-center gap-3 animate-float" style={{ animationDelay: "2s" }}>
          <div className="flex -space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-indigo-500 object-cover"
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
              alt="Candidate"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-violet-500 object-cover"
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
              alt="Candidate"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-cyan-500 object-cover"
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
              alt="Candidate"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-white">14,800+ Hired</div>
            <div className="text-[10px] text-slate-300">Across 50 states</div>
          </div>
        </div>
      </div>

    </section>
  );
}
