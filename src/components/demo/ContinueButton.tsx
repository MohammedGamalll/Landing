import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { ts } from "@/lib/translations";

export default function ContinueButton({
  onClick,
  disabled,
  loading,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}) {
  const { lang, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-background transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:scale-[1.02]"
    >
      {loading ? ts(lang, "commonLoading") : label ?? ts(lang, "commonContinue")}
      {!loading && <Arrow size={18} />}
    </button>
  );
}
