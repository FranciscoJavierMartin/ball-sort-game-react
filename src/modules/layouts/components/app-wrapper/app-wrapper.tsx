import type { PropsWithChildren } from 'react';
import './app-wrapper.css';

export default function AppWrapper({ children }: PropsWithChildren) {
  return (
    <div className='container'>
      <div className='screen'>{children}</div>
    </div>
  );
}
