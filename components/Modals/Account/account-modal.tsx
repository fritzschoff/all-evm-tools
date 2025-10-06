import BaseModal from '../base-modal';
import { useAccount, useSwitchChain } from 'wagmi';
import { useDisconnect } from 'wagmi';
import Button from '../../Button/button';
import { chains } from '@/constants/chains';
import { defaultRpcs } from '@/constants/rpcs';
import Divider from '../../Divider/divider';
import Input from '../../Input/input';
import { useRpc } from '@/providers/rpcs';
import Dropdown from '@/components/Dropdown/dropdown';

export default function AccountModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const { customRpc, setCustomRpc, error, clearCustomRpc } = useRpc();
  const networkIsSupported =
    chain && chains.some((chain) => chain.id === chain?.id);

  const activeRPC =
    customRpc || defaultRpcs.find((rpc) => rpc.chainId === chain?.id)?.rpcUrl;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 min-w-[340px] max-w-[400px] flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-700">Address:</span>
            <span className="truncate text-gray-900 bg-gray-100 px-2 py-1 rounded font-mono text-sm">
              {address}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-700">Network:</span>
            <span
              className={`px-2 py-1 rounded text-sm ${
                networkIsSupported
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {networkIsSupported
                ? `${chain?.name} (${chain?.id})`
                : 'Unsupported'}
            </span>
          </div>
        </div>
        <Dropdown
          options={chains.map((chain) => chain.name)}
          onChange={(selected, index) => {
            switchChain({ chainId: chains[index].id });
          }}
        >
          {chain?.name}
        </Dropdown>
        <Divider />
        <div className="mt-4 mb-2 font-semibold text-gray-700">Active RPC:</div>
        <div className="mb-2 px-2 py-1 bg-gray-50 rounded text-sm font-mono text-gray-800 break-all">
          {activeRPC}
        </div>
        {error && (
          <div className="mb-2 px-2 py-1 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}
        <div className="mt-4 mb-1 font-semibold text-gray-700">
          Add custom RPC:
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={customRpc || ''}
            onChange={(value) => {
              if (value) {
                setCustomRpc(value);
              }
            }}
            className="flex-1"
          />
        </div>
        <Divider />
        {!networkIsSupported && (
          <div className="mt-4">
            <div className="font-semibold text-gray-700 mb-2">
              Supported networks:
            </div>
            <div className="overflow-y-auto max-h-[200px] flex flex-col gap-2 pl-2">
              {chains.map((chain) => (
                <Button
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold rounded shadow"
                  key={chain.id}
                  onClick={() => {
                    switchChain({ chainId: chain.id });
                  }}
                >
                  {chain.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end mt-6">
          <Button
            onClick={() => {
              disconnect();
              onClose();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow px-4 py-2"
          >
            Disconnect
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
