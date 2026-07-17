import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiStar, FiShield, FiZap } from "react-icons/fi";
import Button from "../../components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Nav */}
      <nav className="border-b border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl">
        <div className="page-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm">Q</div>
            <span className="text-lg font-bold text-surface-900 dark:text-surface-100">QuickNest</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="page-container pt-20 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-900/20 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-400">
            <FiZap size={14} /> Now open for providers
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-surface-100">
            Book services <br className="hidden sm:block" />
            <span className="text-brand-600">in seconds</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-surface-500 dark:text-surface-400">
            QuickNest connects you with trusted service providers. Clean, fast, and reliable booking for everyone.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/register">
              <Button size="lg">Get Started <FiArrowRight size={18} /></Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">Sign In</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="page-container pb-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: FiCheck, title: "Easy Booking", desc: "Book any service in under 60 seconds with our streamlined flow." },
            { icon: FiShield, title: "Verified Providers", desc: "Every provider is vetted and reviewed by real customers." },
            { icon: FiStar, title: "Top Rated", desc: "See honest ratings and reviews before you book anything." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-card"
            >
              <div className="mb-4 inline-flex rounded-xl bg-brand-50 dark:bg-brand-900/20 p-3 text-brand-600 dark:text-brand-400">
                <f.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100">{f.title}</h3>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
