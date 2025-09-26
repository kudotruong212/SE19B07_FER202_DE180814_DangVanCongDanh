function App() {

  const people = [
    { id: 1, name: "An", age: 18 },
    { id: 2, name: "Bình", age: 22 },
    { id: 3, name: "Cường", age: 25 },
    { id: 4, name: "Dũng", age: 19 }
  ]

  const PeopleMaxAge = Math.max(...people.map(p => p.age));
  const peopleMaxAge = people.find(p => p.age === PeopleMaxAge);

  // Lọc những người tuổi từ 13-19, map sang chuỗi "Tên (tuổi)"
  const filteredPeople = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .sort((a, b) => b.age - a.age)
    .map(person => `${person.name} có ${person.age} tuổi`);

  const filteredPeopleForName = people.sort((a, b) => b.name.localeCompare(a.name))

  const nguoiSo2 = people[1];

  const isTeen = person => person.age >= 13 && person.age <= 19;


  return (
    <div>
      <h2>Excercise5:</h2>
      <h3> Total: {filteredPeople.length}</h3>
      <p>Kết quả: {filteredPeople.join(', ')}</p>
      <ul>
        {filteredPeople.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
      <h3>Theo tên:</h3>
      <ul>
        {filteredPeopleForName.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
      <h3>Nguoi so 2:</h3>
      <p>{nguoiSo2.name}, {nguoiSo2.age} </p>
      <h3>Check Teen:</h3>
      <p>{isTeen(nguoiSo2) ? 'Là Teen' : 'Không phải Teen'}</p>
      <h3>Max Age:</h3>
      <p> {JSON.stringify(peopleMaxAge)}</p>
    </div>
  );
}

export default App;