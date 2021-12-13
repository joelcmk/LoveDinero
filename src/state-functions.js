export function sum(a, b) {
  return a + b;
}




export let data = [{ expense: 13, category: 'home' },
{ expense: 56, category: 'home' },
{ expense: 87, category: 'shopping' },
{ expense: 50, category: 'transportation' },
{ expense: 50, category: 'transportation' },
];

// Transportation Total

export function total() {

  let transportationFilter = data.filter(item => item.category === 'transportation');

  const transportation = transportationFilter.map(item => (
    item.expense
  ));

  let transportationTotal = 0;

  for (let i = 0; i < transportation.length; i++) {
    transportationTotal += transportation[i];
  };

  return transportationTotal;
}

export function filter(category) {

  let filteredCategory = data.filter(item => item.category === category);
  const result = filteredCategory.map(item => (
    item.expense
  ));

  return result
}

export function categoryTotal(category) {
  let total = 0;

  for (let i = 0; i < filter(category).length; i++) {
    total += filter(category)[i];
  };

  return total;
}