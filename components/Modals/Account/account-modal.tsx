import { ConnectButton } from '@rainbow-me/rainbowkit';
import BaseModal from '../base-modal';
import { useAccount } from 'wagmi';
import { useDisconnect } from 'wagmi';
import Button from '../../Button/button';

export default function AccountModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div>
        <div>{address}</div>
        <Button
          onClick={() => {
            disconnect();
            onClose();
          }}
          className="bg-red-500 text-white"
        >
          Disconnect
        </Button>
      </div>
    </BaseModal>
  );
}
