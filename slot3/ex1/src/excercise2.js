// Hàm sum: tính tổng các số hợp lệ (bỏ NaN, String không phải số)
const sum = (...nums) => nums.filter(x => typeof x === 'number' && !isNaN(x)).reduce((a, b) => a + b, 0);

console.log(sum(1,2,3)); // 6
console.log(sum(1,'x',4)); // 5

// Hàm avg: tính trung bình các số hợp lệ, làm tròn 2 chữ số thập phân, rỗng trả 0
const avg = (...nums) => {
  const validNums = nums.filter(x => typeof x === "number" && !isNaN(x));
  if (validNums.length === 0) return 0;
  const total = validNums.reduce((sum, x) => sum + x, 0);
  return +(total / validNums.length).toFixed(2);
};

console.log(avg(1, 2, 3, 4));                       // Kết quả: 2.5
console.log(avg());                                 // Kết quả: 0
