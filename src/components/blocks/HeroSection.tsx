import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dcbpbntcj/image/upload/v1720626359/grid_1_h3l8tz.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
             <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-indigo-300 ring-1 ring-white/10 hover:ring-white/20">
                We are hiring. <Link href="/jobs" className="font-semibold text-white"><span className="absolute inset-0" aria-hidden="true" />View Openings <span aria-hidden="true">&rarr;</span></Link>
             </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Find Your Next <span className="text-indigo-400">Dream Role</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Join top companies and build the future. Discover opportunities that match your skills, passion, and ambition in a fast-paced, innovative environment.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/jobs">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8">
                Explore Jobs
              </Button>
            </Link>
            <Link href="/blogs">
              <Button variant="link" className="text-white hover:text-indigo-300">
                Read Our Blog <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
