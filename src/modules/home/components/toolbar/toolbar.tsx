import { Link } from 'react-router';
import Icon from '@/modules/common/components/icon/icon';
import { ROUTES } from '@/modules/common/constants/routes';
import Share from '@/modules/share/components/share/share';
import './toolbar.css';

const dataShare = {
  title: 'Ball Sort Puzzle',
  text: 'Come and play Ball Sort Puzzle now!',
  url: window.location.origin,
};

export default function Toolbar() {
  return (
    <div className='toolbar'>
      <Link to={ROUTES.ABOUT} className='button blue' title='About'>
        <Icon type='info' />
      </Link>
      <Share data={dataShare}>
        <button className='button blue'>
          <Icon type='share' />
        </button>
      </Share>
    </div>
  );
}
