
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl space-y-12 text-center">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Multimedia Library
            </h1>
            <p className="text-xl text-slate-300">
              Organize and explore your books, movies, and series in one place
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center">
            <Link
              href="/login"
              className="rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 pt-12 sm:grid-cols-3">
            <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6 backdrop-blur-sm transition-all hover:bg-purple-500/20 hover:border-purple-500/60">
              <div className="mb-3 text-3xl">📚</div>
              <h3 className="mb-2 font-semibold text-white">Books</h3>
              <p className="text-sm text-slate-400">Track and manage your reading collection</p>
            </div>
            <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6 backdrop-blur-sm transition-all hover:bg-purple-500/20 hover:border-purple-500/60">
              <div className="mb-3 text-3xl">🎬</div>
              <h3 className="mb-2 font-semibold text-white">Movies</h3>
              <p className="text-sm text-slate-400">Catalog your favorite films</p>
            </div>
            <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6 backdrop-blur-sm transition-all hover:bg-purple-500/20 hover:border-purple-500/60">
              <div className="mb-3 text-3xl">📺</div>
              <h3 className="mb-2 font-semibold text-white">Series</h3>
              <p className="text-sm text-slate-400">Keep track of your series</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-6 text-center text-slate-500">
        <p>© 2026 Multimedia Library. All rights reserved.</p>
      </footer>
    </div>
  );
}
