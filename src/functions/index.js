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

const pickedItem = (id1, id2, value, product) => {
  let valueItems = []
  product.variants.forEach(item => {
    if (value.value_index === item.attributes[id1].value_index) {
      valueItems.push(item.attributes[id2].value_index)
    }
  })

  return valueItems.map(item => {
    for (let i = 0; i < product.configurable_options[id2].values.length; i++) {
      if (item === product.configurable_options[id2].values[i].value_index) {
        return item = product.configurable_options[id2].values[i]
      }
    }
  })
}


export { calculateAmount, calculateTotal, currency, pickedItem };
