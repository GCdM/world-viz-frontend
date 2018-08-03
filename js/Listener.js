class Listener {

  static handleInitialize(e) {
    const countryId = e.target.value
    const initHTML = document.createElement('div')
    initHTML.id = "wrapper"

    initHTML.innerHTML = `
      <hr>
      <div id="header" class="header row">
        <div id="year-container" class="col-4">

        </div>
        <div class="col-4">
          <h1 id="selected-country"></h1>
          <h4 id="selected-year"></h4>
        </div>
        <div class="col-4">
          <label for="country-select">Select Country:</label>
          <select id="country-select" name="country-select"></select>
        </div>
      </div>

      <hr>
      <div id="container" class="container">
        <div class="row" id="stats-container">
          <div class="col", id='total-immigration'>

          </div>
          <div class="col" id='net-migration'>

          </div>
          <div class="col" id='total-emigration'>

          </div>
        </div>
        <div class="row donuts-container">
          <div id="immi-donut" class="col-6">

          </div>
          <div id="emi-donut" class="col-6">

          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8" id="card-net">
          </div>
          <div class="col-2"></div>
        </div>
        <div class="row" id="cards-container">
          <div class="col-4" id="card-emi">

          </div>
          <div class="col-4" id="card-percentage-emi">

          </div>
          <div class="col-4" id="card-percentage-immi">

          </div>
        </div>
        <br>
        <div class="row">
          <div class="col instruction"></div>
        </div>
        <div class="row" id="tree-maps-container" style="height: 400px;">
          <div class="col">
            <div id="i-chart">

            </div>
          </div>
          <div class="col">
            <div id="e-chart">

            </div>

          </div>
        </div>
        <br>
        <div class="row" id="switch-container">

        </div>
        <br>
        <div class="row" id="stream-container">
          <div id="s-chart" class="col">

          </div>
        </div>
      </div>
    `
    document.querySelector('body').innerHTML = ""
    document.querySelector('body').prepend(initHTML)

    Adapter.getCountries()
            .then( countries => DomController.populateSelect(countries, countryId) )


    Adapter.getCountryBy(countryId)
        .then( country => {
          DomController.setPageInfo(country.country_data, 2017)
          ChartController.makeEmigrationChart(country.country_data, 2017)
          ChartController.makeImmigrationChart(country.country_data, 2017)
          ChartController.makeStreamChart(country.country_data, true)
          ChartController.makeDonutChart(country.country_data, 2017)
          DomController.createSwitch()
        })

    DomController.populateYears()
  }

  static handleCountrySelect(e) {
    DomController.populateYears()
    let year = document.querySelector('#year-select').value
    Adapter.getCountryBy(e.target.value)
      .then(res => {
          DomController.setPageInfo(res.country_data, year)
          ChartController.makeEmigrationChart(res.country_data, year)
          ChartController.makeImmigrationChart(res.country_data, year)
          ChartController.makeDonutChart(res.country_data, year)
          ChartController.makeStreamChart(res.country_data, true)
          DomController.createSwitch()
          DomController.emptyCards()
      })
  }

  static handleYearSelect(e) {
    let country_id = document.querySelector('#country-select').value

    Adapter.getCountryBy(country_id)
      .then( res => {
        DomController.setPageInfo(res.country_data, e.target.value)
        ChartController.makeEmigrationChart(res.country_data, e.target.value)
        ChartController.makeImmigrationChart(res.country_data, e.target.value)
        ChartController.makeDonutChart(res.country_data, e.target.value)
        DomController.emptyCards()
      })
  }

  static handleStreamSwitch(e) {
    const country_id = document.querySelector('#country-select').value
    Adapter.getCountryBy(country_id)
      .then( res => {
        console.log("res: ", res)
        console.log("dataset.bool: ", e.target.dataset.bool)
        ChartController.makeStreamChart(res.country_data, !!e.target.dataset.bool)
      })
  }

  static handleChartClick(e) {
    const country_id = document.querySelector('#country-select').value
    const countryNames = e.target.parentNode.querySelectorAll('tspan.highcharts-text-outline')
    let fullname = []
    countryNames.forEach(el => { fullname.push(el.innerHTML) })
    let countryName = fullname.join(' ')

    Adapter.getRelationship(country_id ,countryName)
      .then(res => DomController.createInfoCards(res))
  }
}
