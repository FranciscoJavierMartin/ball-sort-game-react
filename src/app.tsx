import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import AppWrapper from '@/modules/layouts/components/app-wrapper/app-wrapper';
import Loading from '@/modules/common/components/loading/loading';
import { ROUTES } from '@/modules/common/constants/routes';

const AboutPage = lazy(() => import('@/modules/about/pages/about-page'));
const HomePage = lazy(() => import('@/modules/home/pages/home-page'));
const GamePage = lazy(() => import('@/modules/game/pages/game-page'));

function App() {
  return (
    <AppWrapper>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.GAME} element={<GamePage />} />
            <Route path='*' element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AppWrapper>
  );
}

export default App;
