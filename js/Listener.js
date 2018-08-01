class Listener {
  static handleCountrySelect(e) {
    let year = document.querySelector('#year-select').value

    Adapter.getCountryBy(e.target.value)
      .then(res => {
          ChartController.makeEmigrationChart(res.country_data, year)
          ChartController.makeImmigrationChart(res.country_data, year)
      })
  }

  static handleYearSelect(e) {
    let country_id = document.querySelector('#country-select').value

    Adapter.getCountryBy(country_id)
      .then( res => {
        ChartController.makeEmigrationChart(res.country_data, e.target.value)
        ChartController.makeImmigrationChart(res.country_data, e.target.value)
      })
  }
}
