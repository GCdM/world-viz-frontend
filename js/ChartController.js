class ChartController {

  static makeImmigrationChart(country, year = 2017) {
    Highcharts.chart('i-chart', {
      colorAxis: {
        minColor: '#D9FCD6',
        maxColor: '#0FA602'
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: ChartController.parseFlows(country.immigrations, year)
      }],
      title: {
        text: country.name + ": Immigrations in " + year
      },
      backgroundColor: '#000000'
    })
  }

  static makeEmigrationChart(country, year = 2017) {
    Highcharts.chart('e-chart', {
      colorAxis: {
        minColor: '#FCD6CD',
        maxColor: '#D52C04'
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: ChartController.parseFlows(country.emigrations, year)
      }],
      title: {
        text: country.name + ": Emigrations in " + year
      }
    })
  }

  static parseFlows(collection, year) {
    let colorCounter = 0
    let results = []

    for (let flow of collection) {
      results.push({
        name: flow.country_name,
        value: flow.data[year],
        colorValue: ++colorCounter
      })
    }

    return results
  }

}
