function App() {

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// total, min, max, buckets: teen (13-19), adult (20+)
const result = ages.reduce(
  (acc, age) => {
    acc.total += age;
    acc.min = Math.min(acc.min, age);
    acc.max = Math.max(acc.max, age);
    if (age >= 13 && age <= 19) acc.buckets.teen++;
    else if (age >= 20) acc.buckets.adult++;
    return acc;
  },
  { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
);

const avg = result.total / ages.length;


  return (
    <div>
      <h2>Excercise8:</h2>
      <p>Avg: {avg.toFixed(2)}</p>
      <p>Total: {result.total}, Min: {result.min}, Max: {result.max}</p>
      <p>Buckets: Teen({result.buckets.teen}), Adult({result.buckets.adult})</p>
    </div>
  );
}

export default App;