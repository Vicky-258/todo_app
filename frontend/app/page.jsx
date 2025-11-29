"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Zap, Shield, Layout, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        {/* Global AmbientBackground handles the atmosphere now */}

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-md shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Reimagine Productivity
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                Your Mind,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-blue-400 animate-gradient-x">
                Organized.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Obsyde is the minimal, neo-glass task manager designed to keep you in flow.
              Beautifully simple, powerfully effective.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="glass-button text-lg h-14 px-10 rounded-full group" asChild>
                <Link href="/auth/register">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-10 rounded-full bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm transition-all" asChild>
                <Link href="/auth/login">
                  Log In
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual - 3D Glass Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="mt-24 relative mx-auto max-w-6xl perspective-1000"
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/20 backdrop-blur-2xl shadow-2xl overflow-hidden aspect-[16/9] group transform transition-transform hover:scale-[1.01] duration-700">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-50" />

              {/* Mock UI Header */}
              <div className="absolute top-0 left-0 right-0 h-14 border-b border-white/5 bg-white/5 flex items-center px-6 gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="h-2 w-32 bg-white/10 rounded-full ml-4" />
              </div>

              {/* Mock UI Content */}
              <div className="absolute top-14 inset-0 p-8 flex gap-8">
                {/* Sidebar */}
                <div className="w-64 hidden md:block space-y-4">
                  <div className="h-8 w-3/4 bg-white/10 rounded-lg mb-8" />
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-full rounded-lg bg-white/5 border border-white/5" />
                  ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                  <div className="h-12 w-1/2 bg-white/10 rounded-xl mb-8" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/10 p-4 relative overflow-hidden group/card">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                        <div className="h-4 w-2/3 bg-white/10 rounded mb-3" />
                        <div className="h-2 w-full bg-white/5 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-white/5 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reflection/Glow under the card */}
            <div className="absolute -bottom-20 left-10 right-10 h-20 bg-primary/20 blur-[100px] rounded-full opacity-40 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">Why Obsyde?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Built for those who value aesthetics and functionality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Lightning Fast",
                description: "Optimized for speed. No lag, just flow."
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-400" />,
                title: "Secure by Design",
                description: "Your data is yours. Encrypted and safe."
              },
              {
                icon: <Layout className="h-8 w-8 text-purple-400" />,
                title: "Beautiful Interface",
                description: "A UI that inspires you to get things done."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl glass-card hover:bg-white/10 transition-all duration-500 group border border-white/5"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
