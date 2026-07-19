"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/config";
import { categories } from "@/lib/categories";

type Product = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  images: { url: string; publicId: string }[];
  badge?: string;
  rating?: number;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // form fields
  const [editingId, setEditingId] = useState<string | null>(null); // null = create mode, otherwise = editing this product's _id
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [rating, setRating] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/api/products`);
    const json = await res.json();
    setProducts(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setCategory("");
    setBrand("");
    setDescription("");
    setBadge("");
    setRating("");
    setFiles(null);
    setError("");
  };

  const startEdit = (p: Product) => {
    setEditingId(p._id);
    setName(p.name);
    setCategory(p.category);
    setBrand(p.brand);
    setDescription(p.description);
    setBadge(p.badge || "");
    setRating(p.rating?.toString() || "");
    setFiles(null); // editing never touches images here — separate flow
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId: string) => {
    const confirmed = window.confirm(
      "Delete this product permanently? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Failed to delete product");
        return;
      }

      fetchProducts(); // refresh the list
    } catch (err) {
      alert("Something went wrong while deleting");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // image is required only when creating, not when editing
    if (!editingId && (!files || files.length === 0)) {
      setError("Please select at least one image");
      return;
    }

    setSubmitting(true);

    try {
      let res: Response;

      if (editingId) {
        // EDIT MODE — plain JSON, no image touched here
        res = await fetch(`${API_BASE_URL}/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name,
            category,
            brand,
            description,
            badge: badge || undefined,
            rating: rating || undefined,
          }),
        });
      } else {
        // CREATE MODE — FormData, includes images
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("brand", brand);
        if (description) formData.append("description", description);
        if (badge) formData.append("badge", badge);
        if (rating) formData.append("rating", rating);
        for (let i = 0; i < files!.length; i++) {
          formData.append("images", files![i]);
        }

        res = await fetch(`${API_BASE_URL}/api/products`, {
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
      fetchProducts();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Manage Products
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 max-w-xl rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
          required
        />

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

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
        />

        <select
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
        >
          <option value="">No badge</option>
          <option value="Popular">Popular</option>
          <option value="New">New</option>
          <option value="Best Seller">Best Seller</option>
        </select>

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating (optional)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mb-3 w-full rounded-lg border border-border bg-background p-2 text-foreground"
        />

        {!editingId && (
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="mb-4 w-full rounded-lg border border-border bg-background p-2 text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:opacity-90"
            required
          />
        )}

        {editingId && (
          <p className="mb-4 text-xs text-muted-foreground">
            Image editing isn't available here yet — use the image management
            section (coming next) to add/remove photos.
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
                : "Create Product"}
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
        Existing Products
      </h2>
      {loading ? (
        <p className="text-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <img
                src={p.images?.[0]?.url || "/placeholder.svg"}
                alt={p.name}
                className="mb-2 h-40 w-full rounded-lg object-cover"
              />
              <p className="font-semibold text-foreground">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.brand}</p>
              <button
                onClick={() => startEdit(p)}
                className="mt-2 rounded-lg border border-border px-3 py-1 text-xs font-semibold text-foreground"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="rounded-lg border border-red-600 px-3 py-1 text-xs font-semibold text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
