import { ConnectButton } from '@rainbow-me/rainbowkit';
import BaseModal from '../base-modal';
import { useAccount } from 'wagmi';

export default function AccountModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { address } = useAccount();
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div>
        <div>{address}</div>
      </div>
    </BaseModal>
  );
}
