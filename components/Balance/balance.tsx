import { formatUnits } from 'viem';

export default function Balance({
  amount = BigInt(0),
  symbol = '',
  decimals = 18,
}: {
  amount?: bigint;
  symbol?: string;
  decimals?: number;
}) {
  const formattedAmount = Number(formatUnits(amount, decimals));
  return (
    <div>
      <span>{formattedAmount}</span>
      <span> {symbol}</span>
    </div>
  );
}
