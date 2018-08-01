class DomController {
  static populateSelect(countries) {
    const countrySelector = document.querySelector('#country-select')

    countries.forEach( country => {
      let newOption = document.createElement('option')
      newOption.value = country.id
      newOption.innerText = country.name

      countrySelector.append(newOption)
    })
  }

  static populateYears() {
    let years = [2017, 2015, 2010, 2005, 2000, 1995, 1990]
    const yearSelector = document.querySelector('#year-select')

    years.forEach( year => {
      let newOption = document.createElement('option')
      newOption.value = year
      newOption.innerText = year

      yearSelector.append(newOption)
    })
  }
}
