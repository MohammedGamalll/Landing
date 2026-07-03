import { trainingLocationOptions, equipmentOptions } from "./steps";
import { CardGrid } from "./AssessmentStep";
import { useLang } from "@/lib/lang-context";
import { trStep } from "@/lib/step-translations";

export default function TrainingSetupStep({
  location,
  equipment,
  onLocationChange,
  onEquipmentChange,
}: {
  location: string;
  equipment: string;
  onLocationChange: (v: string) => void;
  onEquipmentChange: (v: string) => void;
}) {
  const { lang } = useLang();
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-sm font-semibold text-muted">{trStep("Where will you train?", lang)}</p>
        <CardGrid options={trainingLocationOptions} value={location} onChange={onLocationChange} />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted">{trStep("What equipment do you have?", lang)}</p>
        <CardGrid options={equipmentOptions} value={equipment} onChange={onEquipmentChange} />
      </div>
    </div>
  );
}
