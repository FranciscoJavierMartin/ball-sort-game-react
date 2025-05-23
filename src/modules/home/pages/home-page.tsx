import { Link } from 'react-router';
import Share from '@/modules/share/components/share/share';
import Logo from '@/modules/home/components/logo/logo';
import LevelNumber from '@/modules/home/components/level-number/level-number';
import { ROUTES } from '@/modules/common/constants/routes';
import Icon from '@/modules/common/components/icon/icon';
import './home-page.css';

export default function HomePage() {
  return (
    <div className='home-page'>
      <Logo />
      <LevelNumber />
      <Link to={ROUTES.GAME} className='play-button' title='Play'>
        <Icon type='play' />
      </Link>
    </div>
  );
}
