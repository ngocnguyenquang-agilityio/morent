interface SpecRowProps {
  label: string;
  value: string;
}

export const SpecRow = ({ label, value }: SpecRowProps) => (
  <div className="flex items-center justify-between">
    <span className="text-xs lg:text-lg text-secondary-300">{label}</span>
    <span className="text-xs text-secondary lg:text-lg font-semibold lg:text-secondary-400">
      {value}
    </span>
  </div>
);
