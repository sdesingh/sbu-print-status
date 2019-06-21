function parseChartData(data){

  // Creating the stock_data object to be returned.
  var stock_data = {
    labels: [],
    datasets: [
      {
        label: '',
        backgroundColor: '#ffd3d3',
        borderColor: '#f87979',
        data: []
      }
    ]
  }

  // Set the key for the points on the graph.
  stock_data.datasets[0].label = 'Price'

  data.forEach(item => {
    stock_data.labels.push(item.label)
    stock_data.datasets[0].data.push(item.close)
  });

  return stock_data

}