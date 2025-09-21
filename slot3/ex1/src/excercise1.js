// Hàm double: trả về giá trị x nhân 2 (cách viết ngắn gọn arrow function)
const double = (x) => x * 2;
console.log(double(5)); // Kết quả: 10

// Hàm double2: trả về giá trị x nhân 2 (cách viết đầy đủ với return)
const double2 = (x) => { return x * 2 };
console.log(double2(4)); // Kết quả: 8

// Hàm isEven: kiểm tra x có phải số chẵn không (cách viết ngắn gọn)
const isEven = (x) => x % 2  === 0 && x % 5 === 0;
console.log(isEven(8)); // Kết quả: true

// Hàm isEven2: kiểm tra x có phải số chẵn không (cách viết đầy đủ với return)
const isEven2 = (x) => { return x % 2 === 0 };
console.log(isEven2(5)); // Kết quả: false