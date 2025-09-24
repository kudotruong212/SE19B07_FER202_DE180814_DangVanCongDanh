function App() {

  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12"
    }
  };

  const {
    address: {
      street,
      city = 'Unknown City'
    }
  } = person;

  return (
    <div>
      <h2>Excercise3:</h2>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </div>
  );
}

export default App;