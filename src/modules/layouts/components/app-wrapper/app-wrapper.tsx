import type { PropsWithChildren } from 'react';
import useWindowResize from '@/modules/layouts/hooks/useWindowResize';
import './app-wrapper.css';

export default function AppWrapper({ children }: PropsWithChildren) {
  useWindowResize()
  return (
    <div className='container'>
      <div className='screen'>{children}</div>
    </div>
  );
}
