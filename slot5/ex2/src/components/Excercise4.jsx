function App() {

  const ages = [33, 12, 20, 16, 31, 5, 54, 21, 44, 61, 13, 15, 45, 64, 32];

  const [first, , third = 0, ...restAges] = ages;

  const filteredAges = restAges.filter(age => age % 2 === 0);


  return (
    <div>
      <h2>Excercise4:</h2>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(', ')}</p>
      <p>Filtered Ages (Even): {filteredAges.join(', ')}</p>
    </div>
  );
}

export default App;