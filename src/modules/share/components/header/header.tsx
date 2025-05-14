import Icon from '@/modules/common/components/icon/icon';
import './header.css';

interface ModalShareHeaderProps {
  label?: string;
  onCloseModal: () => void;
}

export default function ModalShareHeader({
  label = 'Share...',
  onCloseModal,
}: ModalShareHeaderProps) {
  return (
    <div className='modal-share-header'>
      <h4>{label}</h4>
      <button onClick={onCloseModal}>
        <Icon type='close' fill='black' />
      </button>
    </div>
  );
}
