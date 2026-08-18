import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-50 dark:bg-indigo-900/20 blur-3xl rounded-full opacity-50 -z-10" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
             <span className="relative rounded-full px-4 py-1.5 text-sm font-medium leading-6 text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 ring-1 ring-indigo-600/20">
                🚀 New roles just added. <Link href="/jobs" className="font-semibold text-indigo-600 dark:text-indigo-400 ml-1"><span className="absolute inset-0" aria-hidden="true" />Explore &rarr;</Link>
             </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl mb-6">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Career Opportunities</span> Begin
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-400">
            Discover part-time and full-time job opportunities across the USA. Explore roles that match your skills, experience, and career goals, and take the next step toward your future.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-full px-8 py-6 text-lg shadow-lg">
                Build career &rarr;
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                Contact us &rarr;
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image / Mockup Area */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="rounded-2xl bg-gradient-to-b from-white/40 to-white/10 dark:from-slate-800/40 dark:to-slate-900/10 p-2 ring-1 ring-inset ring-slate-200/50 dark:ring-slate-700/50 shadow-2xl backdrop-blur-md">
            <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative h-[400px]">
              {/* Using a Pexels image as requested */}
              <img 
                src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team working together" 
                className="w-full h-full object-cover opacity-80 mix-blend-multiply dark:mix-blend-overlay"
              />
              
              {/* Floating Glassmorphism Elements overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg text-center border border-white/20 dark:border-slate-700/50">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Efficiently transform your candidate experience.</h3>
                  <p className="text-slate-600 dark:text-slate-400">Join a modern workforce platform that automates the whole process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
