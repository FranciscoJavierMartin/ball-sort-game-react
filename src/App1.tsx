import AppWrapper from '@/modules/layouts/components/app-wrapper/app-wrapper';
import GamePage from '@/modules/game/pages/game-page';
import Loading from '@/modules/common/components/loading/loading';

function App() {
  return (
    <AppWrapper>
      {/* <GamePage /> */}
      <Loading />
    </AppWrapper>
  );
}

export default App;
