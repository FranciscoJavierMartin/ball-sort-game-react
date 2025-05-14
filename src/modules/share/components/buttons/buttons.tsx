import type { TypeIcon } from '@/modules/common/components/icon/icon';
import Icon from '@/modules/common/components/icon/icon';
import copyToClipboard from '@/modules/common/helpers/copy-to-clipboard';
import type { ShareData } from '@/modules/share/interfaces/share-data';
import './buttons.css';

type TButtons = {
  icon: TypeIcon;
  label: string;
  action: string;
  url?: string;
};

const BUTTONS: TButtons[] = [
  {
    icon: 'copy',
    label: 'Copy',
    action: 'copy',
  },
  {
    icon: 'twitter',
    label: 'Twitter',
    action: 'twitter',
    url: 'https://twitter.com/intent/tweet?text=DATA_TEXT&url=DATA_URL',
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    action: 'facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=DATA_URL&quote=DATA_TEXT',
  },
  {
    icon: 'linkedin',
    label: 'Linkedin',
    action: 'linkedin',
    url: 'https://www.linkedin.com/shareArticle?mini=true&url=DATA_URL&title=DATA_TITLE&summary=DATA_TEXT&source=LinkedIn',
  },
];

interface ModalShareButtonsProps {
  data: ShareData;
  onCloseModal: (isShare?: boolean) => void;
}

export default function ModalShareButtons({
  data,
  onCloseModal,
}: ModalShareButtonsProps) {
  function handleClick(button: TButtons): void {
    if (button.action === 'copy') {
      copyToClipboard(`${data.text} ${data.url}`);
    } else {
      let url = button.url;

      Object.keys(data).forEach(
        (v) =>
          (url = url?.replace(
            `DATA_${v.toUpperCase()}`,
            encodeURIComponent(data[v as keyof ShareData]),
          )),
      );

      window.open(url, '_blank');
    }

    if (onCloseModal) {
      onCloseModal(true);
    }
  }

  return (
    <div className='modal-share-buttons'>
      {BUTTONS.map((button) => (
        <div className='modal-share-button'>
          <button onClick={() => handleClick(button)}>
            <Icon type={button.icon} fill='black' />
          </button>
          <span>{button.label}</span>
        </div>
      ))}
    </div>
  );
}
