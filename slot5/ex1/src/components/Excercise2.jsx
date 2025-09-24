function App() {
  const numbers = [3, -1, 4, -2, 5, -3, 6, -4, 7, -4];
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const avg = sum / numbers.length;

  //khai báo mảng chuỗi names, in ra danh sách các tên, theo thứ tự tăng dần Alphalbet
  const names = ["Công", "Phúc", "Cường", "Vy", "Thắng", "Nhi", "An", "Danh", "Phương", "Anh"];
  const sortedNames = [...names].sort();

  //khai báo 1 mảng people chứa 10 đối tượng students id, name, age, grade 
  const people = [
    { id: 1, name: "An", age: 18, grade: 8.5 },
    { id: 2, name: "Bình", age: 22, grade: 9.0 },
    { id: 3, name: "Cường", age: 25, grade: 7.5 },
    { id: 4, name: "Dũng", age: 19, grade: 8.0 },
    { id: 5, name: "Huy", age: 21, grade: 6.5 },
    { id: 6, name: "Lan", age: 20, grade: 4.3 },
    { id: 7, name: "Mai", age: 23, grade: 7.0 },
    { id: 8, name: "Nga", age: 24, grade: 8.3 },
    { id: 9, name: "Phương", age: 26, grade: 9.5 },
    { id: 10, name: "Quỳnh", age: 27, grade: 8.7 }
  ];

  //in ra danh sách student có grade >= 7.5 và sắp xếp tăng dần
  const goodStudents = people.filter(person => person.grade >= 7.5).sort((a, b) => a.grade - b.grade);
  
// in ra danh sách student dưới dạng table và thêm dòng cuối cùng trong bảng là trung bình điểm
  const totalGrade = people.reduce((acc, person) => acc + person.grade, 0);
  const avgGrade = totalGrade / people.length;

  return (
    <div>
      <h2>Excercise2</h2>
      <p>In mảng số nguyên.</p>
      <ul>
        {numbers.map((num, i) => (
          <li key={i}>Phần tử thứ {i}: {num}</li>
        ))}
      </ul>

      <p>Tổng các phần tử trong mảng: {sum}</p>
      <p>Giá trị trung bình các phần tử trong mảng: {avg.toFixed(2)}</p>

      <p>Danh sách tên theo thứ tự tăng dần Alphabet:</p>
      <ul>
        {sortedNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <p>Danh sách sinh viên có grade lớn hơn hoặc bằng 7.5, sắp xếp theo tên tăng dần:</p>
      <ul>
        {goodStudents.map((student) => (
          <li key={student.id}>{student.name} - {student.grade}</li>
        ))}
      </ul>

      <p>Danh sách sinh viên dưới dạng bảng và dòng cuối cùng của bảng là trung bình điểm</p>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {people.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
            
          ))}
          <tr>
            <td colSpan="3">Trung bình điểm:</td>
            <td>{avgGrade.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;