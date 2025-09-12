// Tạo mảng số nguyên
const arr = [1, 2, 3, 4, 5];
let output = [];

// In các phần tử trên cùng một dòng, cách nhau bởi dấu cách
arr.forEach(num => output.push(num));
console.log(output.join(" ")); // Sử dụng join để nối các phần tử với dấu cách
console.log(); // Xuống dòng sau khi in xong

const arrOutput = arr.map(num => num);
console.log(arrOutput);

// Duyệt mảng theo 5 cách khác nhau
// 1. Duyệt bằng for truyền thống
let sum = 0;
let sumSquare = 0;
let sum2X = 0;
let sumTriple = 0;
let sumQuadruple = 0;

for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
}
console.log("Tổng các phần tử trong mảng:", sum);

// 2. Duyệt bằng for...of
for (const num of arr) {
    sumSquare += num * num;
}
console.log("Tổng bình phương các phần tử trong mảng:", sumSquare);

// 3. Duyệt bằng forEach
arr.forEach(function (num) {
    sum2X += num * 2;
});
console.log("Tổng các phần tử nhân đôi trong mảng:", sum2X);

// 4. Duyệt bằng while
let i = 0;
while (i < arr.length) {
    sumTriple += arr[i] * 3;
    i++;
}
console.log("Tổng các phần tử nhân ba trong mảng:", sumTriple);

// 5. Duyệt bằng map (không nên dùng chỉ để duyệt, nhưng có thể)
arr.map(num => {
    sumQuadruple += num * 4;
});
console.log("Tổng các phần tử nhân bốn trong mảng:", sumQuadruple);

// Lọc các phần tử chẵn bằng filter
const evenNumbers = arr.filter(num => num % 2 === 0);
console.log("Các phần tử chẵn:", evenNumbers);

// Tạo mảng people
const people = [
    { id: 1, name: "An", age: 18 },
    { id: 2, name: "Bình", age: 22 },
    { id: 3, name: "Cường", age: 25 },
    { id: 4, name: "Dũng", age: 19 }
];

// Duyệt qua mảng in ra danh sách các id, name, age
console.log("Danh sách people:");
people.forEach(person => {
    console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});

// Lọc qua danh sách in ra danh sách điều kiện age > 20
const peopleOver20 = people.filter(person => person.age > 20);
console.log("Danh sách người có tuổi > 20:");
peopleOver20.forEach(person => {
    console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});

// Tính tổng tuổi của tất cả người trong danh sách
const totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log("Tổng tuổi của tất cả người:", totalAge);
