function App() {

  const fucDouble = (x) => x * 2;
  const funcIsEven = (x) => x % 2 === 0 && x % 5 === 0;

  return (
    <div>
      <h2>Excercise1:</h2>
      <p>Kết quả fucDouble(5): {fucDouble(5)}</p>
      <p>Kết quả funcIsEven(10): {funcIsEven(10) ? "True" : "False"}</p>
    </div>
  );
}

export default App;