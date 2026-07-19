"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stops the browser's default full-page-reload form submission
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT: tells the browser to accept/store the httpOnly cookie your backend sets
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        // your backend sends { success: false, message: "Invalid credentials" } on failure
        setError(json.message || "Login failed");
        return;
      }

      // success — cookie is now set by the browser automatically, redirect to dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm"
      >
        <h1 className="mb-6 text-2xl font-bold text-foreground">Admin Login</h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="mb-1 block text-sm font-medium text-foreground">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-lg border border-border bg-background p-2 text-foreground"
          required
        />

        <label className="mb-1 block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border border-border bg-background p-2 text-foreground"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-2 font-semibold text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>  
  );
}
