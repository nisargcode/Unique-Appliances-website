"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/config";

type Scheme = {
  _id: string;
  title: string;
  description: string;
  image: { url: string; publicId: string };
  active: boolean;
};

export default function AdminSchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchSchemes = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/api/schemes`);
    const json = await res.json();
    setSchemes(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setActive(true);
    setFile(null);
    setError("");
  };

  const startEdit = (s: Scheme) => {
    setEditingId(s._id);
    setTitle(s.title);
    setDescription(s.description);
    setActive(s.active);
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

    setSubmitting(true);

    try {
      let res: Response;

      if (editingId) {
        // EDIT MODE — JSON only, image untouched
        res = await fetch(`${API_BASE_URL}/api/schemes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, description, active }),
        });
      } else {
        // CREATE MODE — FormData, includes the single image
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("active", String(active));
        formData.append("image", file!);

        res = await fetch(`${API_BASE_URL}/api/schemes`, {
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
      fetchSchemes();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this scheme permanently? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/schemes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Failed to delete scheme");
        return;
      }

      fetchSchemes();
    } catch (err) {
      alert("Something went wrong while deleting");
    }
  };

  // quick toggle: flips active without opening the full edit form
  const handleToggleActive = async (s: Scheme) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/schemes/${s._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ active: !s.active }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Failed to update scheme");
        return;
      }

      fetchSchemes();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Manage Schemes
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 max-w-xl rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {editingId ? "Edit Scheme" : "Add New Scheme"}
        </h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
        />

        <label className="mb-3 flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Active
        </label>

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
                : "Create Scheme"}
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
        Existing Schemes
      </h2>
      {loading ? (
        <p className="text-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.map((s) => (
            <div
              key={s._id}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <img
                src={s.image?.url || "/placeholder.svg"}
                alt={s.title}
                className="mb-2 h-40 w-full rounded-lg object-cover"
              />
              <p className="font-semibold text-foreground">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.description}</p>
              <p className="mt-1 text-xs font-semibold">
                {s.active ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => handleToggleActive(s)}
                  className="rounded-lg border border-border px-3 py-1 text-xs font-semibold text-foreground"
                >
                  {s.active ? "Deactivate" : "Activate"}
                </button>
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
