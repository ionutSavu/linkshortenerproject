import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Fast links, better results
            </span>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Build memorable URLs, track clicks, and share smarter.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Link Shortener helps you create branded short links, manage campaigns, and see real-time performance — all from one clean dashboard.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="default" size="lg" className="rounded-full">
                <Link href="/sign-up">Start shortening</Link>
              </Button>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">10k+</p>
                <p className="mt-3 text-sm text-slate-600">trusted short links created</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">Real-time</p>
                <p className="mt-3 text-sm text-slate-600">click tracking and analytics</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">Secure</p>
                <p className="mt-3 text-sm text-slate-600">private links with verified access</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-1 shadow-xl shadow-slate-900/10">
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white sm:p-8">
              <div className="mb-8 flex items-center justify-between rounded-3xl bg-slate-900/80 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Dashboard preview</p>
                  <p className="mt-2 text-sm text-slate-200">Shorten, organize, and review links at a glance.</p>
                </div>
                <div className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase text-slate-500">
                  Live
                </div>
              </div>
              <div className="space-y-5">
                <div className="rounded-3xl bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Create link</p>
                  <p className="mt-3 text-lg font-semibold text-white">example.com/launch</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <p className="text-sm text-slate-400">Clicks</p>
                    <p className="mt-2 text-2xl font-semibold text-white">4.2k</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <p className="text-sm text-slate-400">Conversion</p>
                    <p className="mt-2 text-2xl font-semibold text-white">18.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Smart Links</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Custom aliases</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Create branded, memorable URLs that build trust and improve click-through rates.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Growth</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Analytics built in</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Track every click in real time with clear data for campaigns and audience insights.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Control</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Secure sharing</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Keep private links protected and manage access directly from your dashboard.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
