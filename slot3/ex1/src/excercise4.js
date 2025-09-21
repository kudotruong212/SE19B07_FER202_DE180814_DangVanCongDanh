const ages = [33, 12, 20, 16, 31, 5, 54, 21, 44, 61, 13, 15, 45, 64, 32];

// Destructuring: lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0), restAges là phần còn lại
const [first, , third = 0, ...restAges] = ages;

const filteredAges = restAges.filter(age => age % 2 === 0);

console.log(first);     // 33
console.log(third); // 20
console.log(restAges); // [16, 31, 5, 54, 21, 44, 61, 13, 15, 45, 64, 32]
console.log(filteredAges); // [16, 54, 44, 64]