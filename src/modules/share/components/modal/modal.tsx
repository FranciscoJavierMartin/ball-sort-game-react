import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { $ } from '@/modules/common/helpers/selector';
import type { ShareData } from '@/modules/share/interfaces/share-data';
import ModalShareHeader from '@/modules/share/components/header/header';
import ModalShareButtons from '@/modules/share/components/buttons/buttons';
import './modal.css';

const NAME_ELEMENT = 'overlay-share';

interface ModalShareProps {
  data: ShareData;
  onCloseModal: (isShare?: boolean) => void;
}

export default function Modal(props: ModalShareProps) {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) {
      if (!$(`#${NAME_ELEMENT}`)) {
        const newElement = document.createElement('div');
        newElement.id = NAME_ELEMENT;
        $('.screen')?.appendChild(newElement);
        setElement(newElement);
      } else {
        setElement($(`#${NAME_ELEMENT}`));
      }
    }

    return () => {
      if (element && $('.screen')) {
        $('.screen')?.removeChild(element);
      }
    };
  }, [element]);

  return element
    ? createPortal(
        <div className='modal-share-wrapper'>
          <ModalShareHeader onCloseModal={props.onCloseModal} />
          <ModalShareButtons {...props} />
        </div>,
        element,
      )
    : null;
}
