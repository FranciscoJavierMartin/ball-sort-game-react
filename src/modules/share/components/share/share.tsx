import {
  cloneElement,
  useState,
  type JSX,
  type PropsWithChildren,
} from 'react';
import type { ShareData } from '@/modules/share/interfaces/share-data';
import shareLink from '@/modules/share/helpers/share-link';
import successMessage from '@/modules/share/helpers/success-message';
import ModalShare from '@/modules/share/components/modal/modal';

const SHARE_AVAILABLE: boolean = 'share' in navigator;

interface ShareProps {
  data: ShareData;
  useNativeOption?: boolean;
}

export default function Share({
  children,
  data,
  useNativeOption = true,
}: PropsWithChildren<ShareProps>) {
  const [isVisible, setIsVisible] = useState(false);

  function onClick() {
    if (SHARE_AVAILABLE && useNativeOption) {
      shareLink(data);
    } else {
      setIsVisible(true);
    }
  }

  function onCloseModal(isShare = false): void {
    if (isShare) {
      successMessage();
    }

    setIsVisible(false);
  }

  return (
    <>
      {cloneElement(children as JSX.Element, { onClick })}
      {isVisible && <ModalShare data={data} onCloseModal={onCloseModal} />}
    </>
  );
}
