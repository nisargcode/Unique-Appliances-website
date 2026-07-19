"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/config";
import { categories } from "@/lib/categories";

type Snapshot = {
  _id: string;
  image: { url: string; publicId: string };
  category: string;
  description?: string;
};

export default function AdminSnapshotsPage() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchSnapshots = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/api/snapshots`);
    const json = await res.json();
    setSnapshots(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSnapshots();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setCategory("");
    setDescription("");
    setFile(null);
    setError("");
  };

  const startEdit = (s: Snapshot) => {
    setEditingId(s._id);
    setCategory(s.category);
    setDescription(s.description || "");
    setFile(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!editingId && !file) {
      setError("Please select an image");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    setSubmitting(true);

    try {
      let res: Response;

      if (editingId) {
        // EDIT MODE — JSON only, image untouched
        res = await fetch(`${API_BASE_URL}/api/snapshots/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ category, description }),
        });
      } else {
        // CREATE MODE — FormData, includes the single image
        const formData = new FormData();
        formData.append("category", category);
        if (description) formData.append("description", description);
        formData.append("image", file!);

        res = await fetch(`${API_BASE_URL}/api/snapshots`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
      }

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "Something went wrong");
        return;
      }

      resetForm();
      fetchSnapshots();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this snapshot permanently? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/snapshots/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Failed to delete snapshot");
        return;
      }

      fetchSnapshots();
    } catch (err) {
      alert("Something went wrong while deleting");
    }
  };

  const getCategoryLabel = (categoryId: string) => {
    const match = categories.find((c) => c.id === categoryId);
    return match ? match.label : "";
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Manage Snapshots
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 max-w-xl rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {editingId ? "Edit Snapshot" : "Add New Snapshot"}
        </h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
        />

        {!editingId && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-4 w-full rounded-lg border border-border bg-background p-2 text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:opacity-90"
            required
          />
        )}

        {editingId && (
          <p className="mb-4 text-xs text-muted-foreground">
            Image can't be changed here — delete and re-create if you need a
            different photo.
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:opacity-50"
          >
            {submitting
              ? editingId
                ? "Saving..."
                : "Creating..."
              : editingId
                ? "Save Changes"
                : "Create Snapshot"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-border px-4 py-2 font-semibold text-foreground"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Existing Snapshots
      </h2>
      {loading ? (
        <p className="text-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {snapshots.map((s) => (
            <div
              key={s._id}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <img
                src={s.image?.url || "/placeholder.svg"}
                alt={s.description || "Snapshot"}
                className="mb-2 h-40 w-full rounded-lg object-cover"
              />
              <p className="text-xs font-semibold uppercase text-primary">
                {getCategoryLabel(s.category)}
              </p>
              {s.description && (
                <p className="text-sm text-foreground">{s.description}</p>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => startEdit(s)}
                  className="rounded-lg border border-border px-3 py-1 text-xs font-semibold text-foreground"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="rounded-lg border border-red-600 px-3 py-1 text-xs font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
