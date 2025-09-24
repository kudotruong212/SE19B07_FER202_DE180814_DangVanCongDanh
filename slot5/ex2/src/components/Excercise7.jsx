function App() {

  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];
  // Từ companies[0], tạo company0New với start += 1 mà không làm đổi companies[0].
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  const concatAll = (...arrays) => [].concat(...arrays);
  return (
    <div>
      <h2>Excercise7:</h2>
      <p>Company 0 New: {company0New.name} - {company0New.start} - {company0New.end}</p>
      <p>Company 0 Old: {companies[0].name} - {companies[0].start} - {companies[0].end}</p>
      <p>Concat All: {concatAll([1,2],[3],[4,5]).join(', ')}</p>
    </div>
  );
}

export default App;