document.addEventListener('DOMContentLoaded', () => {
  //POPULATE COUNTRY SELECT
  Adapter.getCountries()
      .then( countries => DomController.populateInit(countries) )
})
