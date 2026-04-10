import { X } from "lucide-react";
import { useState } from "react";

interface DownloadGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<any>;
}

export function DownloadGuideModal({ isOpen, onClose, onSubmit }: DownloadGuideModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    setError("");

    try {
      const result = await onSubmit(email);
      setEmail("");
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setError(`Failed to send. Please try again. ${err}`);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
        <div className="relative bg-[#00122F] p-6">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-1 text-white/60 hover:text-white/90 hover:bg-white/5 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Download the Clinical Voice AI Guide
          </h2>
          <p className="text-white/70 text-sm">
            Learn why architecture determines safety in healthcare voice AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            {isSubmitting ? "Sending..." : "Download Guide"}
          </button>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
            We respect your privacy. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}