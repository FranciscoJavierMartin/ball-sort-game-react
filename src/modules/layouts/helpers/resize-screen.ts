import { BASE_HEIGHT, BASE_WIDTH } from '@/modules/common/constants/size';
import { debounce } from '@/modules/common/helpers/debounce';
import isMobile from '@/modules/common/helpers/is-mobile';
import { $ } from '@/modules/common/helpers/selector';

/**
 * Function that maintains the aspect ratio of the game container
 */
const resizeScreen = debounce(() => {
  const bodyElement = $('body') as HTMLBodyElement;
  let scale = Math.min(
    window.innerWidth / BASE_WIDTH,
    window.innerHeight / BASE_HEIGHT,
  );

  const mobile = isMobile();

  if (scale >= 1 || mobile) {
    scale = !mobile ? scale : 1;
  }

  const applyZoom =
    window.innerWidth < BASE_WIDTH
      ? Math.round((window.innerWidth / BASE_WIDTH) * 100)
      : 100;

  bodyElement.setAttribute(
    'style',
    `zoom: ${applyZoom}%; transform: scale(${scale});`,
  );
}, 100);

export default resizeScreen;
