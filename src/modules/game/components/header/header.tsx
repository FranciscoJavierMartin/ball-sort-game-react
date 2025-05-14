import type { HeaderActions } from '@/modules/common/constants/header';
import './header.css';

interface HeaderProps {
  level: number;
  isSpecialLevel: boolean;
  totalUndo: number;
  tubeHelpEnabled: boolean;
  handleActions: (type: HeaderActions) => void;
}

export default function Header({
  level,
  isSpecialLevel,
  totalUndo,
  tubeHelpEnabled,
  handleActions,
}: HeaderProps) {
  return <div className='header'></div>;
}
