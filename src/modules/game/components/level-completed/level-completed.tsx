import './level-completed.css';

interface LevelCompletedProps {
  handleNextLevel: (isNextLevel: boolean) => void;
}

export default function LevelCompleted({
  handleNextLevel,
}: LevelCompletedProps) {
  return (
    // TODO: Add focus trap
    <div className='level-completed'>
      <div className='level-completed-container'>
        <div className='level-completed-title'>Awesome</div>
        <button className='button yellow' onClick={() => handleNextLevel(true)}>
          Next
        </button>
      </div>
    </div>
  );
}
