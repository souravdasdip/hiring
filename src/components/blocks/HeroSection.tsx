import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100 via-purple-50 to-transparent dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-transparent rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-100 via-blue-50 to-transparent dark:from-cyan-950/30 dark:to-transparent rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-200 dark:ring-indigo-700/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New roles added weekly across the United States
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl leading-[1.08] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find Your Next{" "}
            <span className="gradient-text animate-gradient">
              Career Move
            </span>{" "}
            in the USA
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Discover part-time, full-time, remote, and on-site employment opportunities across the United States. Find roles that match your skills and take the next step in your career.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/jobs">
              <Button
                size="lg"
                className="group inline-flex items-center gap-2 rounded-full px-8 py-6 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 active:scale-95 border-none"
              >
                Explore Opportunities
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-base font-semibold border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all duration-200"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-slate-500 dark:text-slate-400 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" />
              Opportunities across all 50 states
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-violet-500" />
              Part-time &amp; full-time available
            </span>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mt-20 relative mx-auto max-w-5xl animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 dark:shadow-slate-900/60 ring-1 ring-slate-200 dark:ring-slate-800">
            {/* Gradient overlay top bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-slate-900 flex items-center px-4 gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-xs text-slate-400 flex items-center px-3">
                jobflow.com/jobs
              </div>
            </div>

            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Professionals collaborating in a modern workspace"
              className="w-full h-[380px] sm:h-[460px] object-cover object-center"
            />

            {/* Overlay glass cards */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Floating stat card - left */}
            <div className="absolute bottom-8 left-6 glass-card rounded-2xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Active Positions</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">500+ Jobs</p>
                </div>
              </div>
            </div>

            {/* Floating stat card - right */}
            <div className="absolute bottom-8 right-6 glass-card rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  🚀
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Employment Type</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Remote &amp; On-site</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
