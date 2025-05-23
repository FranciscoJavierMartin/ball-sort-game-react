import { Link } from 'react-router';
import { ROUTES } from '@/modules/common/constants/routes';
import Icon, { type TypeIcon } from '@/modules/common/components/icon/icon';
import './about-page.css';
import Logo from '@/modules/home/components/logo/logo';

export interface ISocialNetworks {
  title: string;
  icon: TypeIcon;
  link: string;
}

const SOCIAL_NETWORKS: ISocialNetworks[] = [
  {
    title: 'Github',
    icon: 'github',
    link: 'https://github.com/FranciscoJavierMartin',
  },
  {
    title: 'Dev.to',
    icon: 'devto',
    link: 'https://dev.to/franciscojaviermartin',
  },
];

export default function AboutPage() {
  return (
    <div className='about-page'>
      <Link
        to={ROUTES.HOME}
        className='button blue back-button'
        title='Back to Home'
      >
        <Icon type='back' fill='white' />
      </Link>
      <Logo />
      <div>
        <p>
          Game developed by{' '}
          <a
            title='Jorge Rubiano'
            href='https://github.com/FranciscoJavierMartin'
            target='_blank'
            rel='noopener noreferrer'
          >
            Francisco Martin
          </a>{' '}
          in{' '}
          <a
            title='ReactJS'
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            ReactJS
          </a>{' '}
          , the purpose of the project was to strengthen the knowledge of this
          library.
        </p>
        <h2>How to play?</h2>
        <p>
          Tap any tube to move the ball lying on top of the tube to another
          tube.
        </p>
        <p>
          The rule is that you can only move a ball on top of another ball if
          both of them have the same color and the tube you want to move into
          has enough space.
        </p>
      </div>
      <div className='social-links'>
        {SOCIAL_NETWORKS.map(({ title, icon, link }, key) => (
          <a
            key={key}
            className='button blue social-link'
            title={`${title}`}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon type={icon} fill='white' />
          </a>
        ))}
      </div>
    </div>
  );
}
