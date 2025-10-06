export default function Button({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer  p-2 rounded ${className}`}
    >
      {children}
    </button>
  );
}
