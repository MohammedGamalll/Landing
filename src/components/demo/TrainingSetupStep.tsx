import { trainingLocationOptions, equipmentOptions } from "./steps";
import { CardGrid } from "./AssessmentStep";

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
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-sm font-semibold text-muted">Where will you train?</p>
        <CardGrid options={trainingLocationOptions} value={location} onChange={onLocationChange} />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted">What equipment do you have?</p>
        <CardGrid options={equipmentOptions} value={equipment} onChange={onEquipmentChange} />
      </div>
    </div>
  );
}
