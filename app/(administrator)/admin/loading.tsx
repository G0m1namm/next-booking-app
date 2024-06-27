import { ReloadIcon } from '@radix-ui/react-icons';

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="w-full h-full grid place-content-center">
      <ReloadIcon className="w-5 h-5 animate-spin" />
    </div>
  );
}
