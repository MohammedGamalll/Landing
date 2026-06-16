import { ArrowRight } from "lucide-react";

export default function ContinueButton({
  onClick,
  disabled,
  loading,
  label = "Continue",
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-background transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:scale-[1.02]"
    >
      {loading ? "Loading…" : label}
      {!loading && <ArrowRight size={18} />}
    </button>
  );
}
