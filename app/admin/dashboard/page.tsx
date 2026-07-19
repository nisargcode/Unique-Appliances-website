"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

export default function AdminDashboardPage() {
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/me`, {
          credentials: "include", // must send the cookie for verifyAdmin to check it
        });

        if (!res.ok) {
          router.push("/admin/login");
          return;
        }

        const json = await res.json();
        setUsername(json.data.username);
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/admin/login");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-foreground">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome, {username}
        </h1>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <a
          href="/admin/products"
          className="rounded-2xl border border-border bg-card p-6 text-center font-semibold text-foreground shadow-sm hover:-translate-y-1 transition-transform"
        >
          Manage Products
        </a>

        <a
          href="/admin/snapshots"
          className="rounded-2xl border border-border bg-card p-6 text-center font-semibold text-foreground shadow-sm hover:-translate-y-1 transition-transform"
        >
          Manage Snapshots
        </a>

        <a
          href="/admin/schemes"
          className="rounded-2xl border border-border bg-card p-6 text-center font-semibold text-foreground shadow-sm hover:-translate-y-1 transition-transform"
        >
          Manage Schemes
        </a>
      </div>
    </div>
  );
}
