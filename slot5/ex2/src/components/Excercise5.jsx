function App() {

  const people = [
    { id: 1, name: "An", age: 18 },
    { id: 2, name: "Bình", age: 22 },
    { id: 3, name: "Cường", age: 25 },
    { id: 4, name: "Dũng", age: 19 }
  ]

  // Lọc những người tuổi từ 13-19, map sang chuỗi "Tên (tuổi)"
  const filteredPeople = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} có ${person.age} tuổi`);

  return (
    <div>
      <h2>Excercise5:</h2>
      <p>Kết quả: {filteredPeople.join(', ')}</p>
    </div>
  );
}

export default App;