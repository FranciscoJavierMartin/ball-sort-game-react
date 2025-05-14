import { useEffect } from 'react';
import onWindowResize from '@/modules/layouts/helpers/resize-screen';

export default function useWindowResize() {
  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    document.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault();
      },
      false,
    );

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  });
}
