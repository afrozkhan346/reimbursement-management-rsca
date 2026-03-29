"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { AtSign, Lock, Loader2, ArrowRight, CreditCard, CheckCircle2, Scale, Users } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setError(null);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-gray-900">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px] opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30">
              <CreditCard className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">ReimburseFlow</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Expense Management</p>
            </div>
          </div>

          <div className="mt-20 max-w-lg">
            <h2 className="text-5xl font-extrabold leading-[1.15] tracking-tight">
              Bring your <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">reimbursements</span> <br />
              under control.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              One workspace for employees, managers, and admins—with intelligent workflows that match how your company actually approves spend.
            </p>

            <div className="mt-12 space-y-4">
              <div className="flex items-start space-x-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:bg-white/[0.05]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">Multi-step approvals</h3>
                  <p className="mt-1 text-sm text-slate-400">Customizable routing with a crystal-clear audit trail.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:bg-white/[0.05]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">FX-aware & Structured</h3>
                  <p className="mt-1 text-sm text-slate-400">Automatic currency conversion and smart categorization.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:bg-white/[0.05]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">Role-based queues</h3>
                  <p className="mt-1 text-sm text-slate-400">Dedicated, clutter-free views for managers and finance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500">© 2026 ReimburseFlow</div>
      </div>

      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              New to the product?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Create a company account
              </Link>
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              {error && (
                <div className="rounded-xl border border-red-200/90 bg-red-50 px-3 py-3 text-sm text-red-800">{error}</div>
              )}

              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AtSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-email"
                    {...form.register("email")}
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:text-sm"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="mt-2 text-sm text-error">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="login-password"
                    {...form.register("password")}
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:text-sm"
                  />
                </div>
                {form.formState.errors.password && (
                  <p className="mt-2 text-sm text-error">{form.formState.errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="remember-me" className="flex items-center gap-2">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Forgot password?</a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
          </form>

          <div className="mt-8">
            <div className="flex items-center gap-3 text-center">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Quick Test Accounts</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  form.setValue("email", "admin@acme.com");
                  form.setValue("password", "password123");
                }}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  form.setValue("email", "manager@acme.com");
                  form.setValue("password", "password123");
                }}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Manager
              </button>
              <button
                type="button"
                onClick={() => {
                  form.setValue("email", "employee@acme.com");
                  form.setValue("password", "password123");
                }}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
