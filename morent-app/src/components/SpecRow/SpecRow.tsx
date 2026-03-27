interface SpecRowProps {
  label: string;
  value: string;
}

export const SpecRow = ({ label, value }: SpecRowProps) => (
  <div className="flex items-center justify-between">
    <span className="text-lg text-secondary-300">{label}</span>
    <span className="text-lg font-semibold text-secondary-400">{value}</span>
  </div>
);
