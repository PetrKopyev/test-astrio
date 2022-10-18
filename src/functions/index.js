const calculateObject = reducerFn => obj =>
  Object.values(obj).reduce(reducerFn, 0);


const calculateAmount = calculateObject((acc, { qt, regular_price }) => acc + qt * regular_price.value);

const calculateTotal = calculateObject((acc, { qt }) => acc + qt);


const currency = (cur) => {
  let value = ''
  switch (cur) {
    case 'USD':
      value = '$';
      break;
    case 'EUR':
      value = '€';
      break;
    case 'RUB':
      value = '₽';
      break;
    default:
      value = '$'
  }
  return value
}

export { calculateAmount, calculateTotal, currency };
