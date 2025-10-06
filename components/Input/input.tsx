export default function Input({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <input
      value={value}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      className={`p-2 rounded border border-gray-300 m-2 ${className}`}
    />
  );
}
