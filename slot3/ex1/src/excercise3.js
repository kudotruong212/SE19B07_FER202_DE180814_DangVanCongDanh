// Bài tập 3: Destructuring với giá trị mặc định và nested object   
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

console.log(street);
console.log(city);