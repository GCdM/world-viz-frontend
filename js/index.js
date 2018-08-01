document.addEventListener('DOMContentLoaded', () => {
  //POPULATE COUNTRY SELECT
  Adapter.getCountries()
      .then( countries => DomController.populateSelect(countries) )

  DomController.populateYears()

  document.querySelector('#country-select').addEventListener('input', Listener.handleCountrySelect)
  document.querySelector('#year-select').addEventListener('input', Listener.handleYearSelect)
})
