const ages = [33, 12, 20, 16];

// Destructuring: lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0), restAges là phần còn lại
const [first, , third = 0, ...restAges] = ages;

console.log(first);     // 33
console.log(third); // 20
console.log(restAges); // [16]