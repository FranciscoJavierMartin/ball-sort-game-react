import './loading.css';

export default function Loading() {
  return (
    <div className='loading-ring'>
      {new Array(4).fill(null).map((_, index: number) => (
        <div key={index} />
      ))}
    </div>
  );
}
