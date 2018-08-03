class DomController {

  static populateInit(countries) {
    const initSelector = document.querySelector('#init-select')
    initSelector.addEventListener('input', Listener.handleInitialize)

    countries.forEach( country => {
      let newOption = document.createElement('option')
      newOption.value = country.id
      newOption.innerText = country.name

      initSelector.append(newOption)
    })
  }

  static populateSelect(countries, id = 0) {
    const countrySelector = document.querySelector('#country-select')
    countrySelector.addEventListener('input', Listener.handleCountrySelect)

    countries.forEach( country => {
      let newOption = document.createElement('option')
      newOption.value = country.id
      newOption.innerText = country.name

      if (country.id == id) {
        newOption.selected = "selected"
      }

      countrySelector.append(newOption)
    })
  }

  static populateYears() {
    let years = [2017, 2015, 2010, 2005, 2000, 1995, 1990]
    const yearContainer = document.querySelector('#year-container')
    yearContainer.innerHTML = `
      <label for="year-select">Select Year:</label>
      <select id="year-select" name="year-select"></select>
    `
    const yearSelector = document.querySelector('#year-select')
    years.forEach( year => {
      let newOption = document.createElement('option')
      newOption.value = year
      newOption.innerText = year

      yearSelector.append(newOption)
    })
    yearSelector.addEventListener('input', Listener.handleYearSelect)
  }

  static setPageInfo(data, year) {
    document.querySelector('#selected-country').innerText = data.name
    document.querySelector('#selected-year').innerText = year
    document.querySelector('#total-immigration').innerHTML = "<div class='tab'><b>Total Immigration:</b><br><br><p>" + data.total_immigration[year].toLocaleString() + "</p></div>"
    document.querySelector('#net-migration').innerHTML = "<div class='tab'><b>Net Migration:</b><br><br><p>" + data.net_migration[year].toLocaleString() + "</p></div>"
    document.querySelector('#total-emigration').innerHTML = "<div class='tab'><b>Total Emigration:</b><br><br><p>" + data.total_emigration[year].toLocaleString() + "</p></div>"
    document.querySelector('.instruction').innerText = "Click on a country's name below for further information"
  }

  static createSwitch() {
    const switchEl = document.querySelector('#switch-container')
    switchEl.innerHTML = `
      <form id="switch">
        <label for="immi-switch">Immigration</label>
        <input type="radio" name='button'id="immi-switch" data-bool=true checked>
        <input type="radio" name='button'id="emi-switch" data-bool="">
        <label for="emi-switch">Emigration</label>
      </form>
    `
    switchEl.querySelectorAll('input').forEach( inp => {
      inp.addEventListener('click', Listener.handleStreamSwitch)
    })
  }

  static createInfoCards(data) {
    const cardNet = document.querySelector('#card-net')
    const cardEmi = document.querySelector('#card-emi')
    const cardPercEmi = document.querySelector('#card-percentage-emi')
    const cardPercImmi = document.querySelector('#card-percentage-immi')
    const year = document.querySelector('#selected-year').innerText
    const countries = Object.keys(data)
    const main = countries[0]
    const extra = countries[1]

    if (Object.keys(data[main].info).length > 0 && Object.keys(data[extra].info).length > 0) {

      cardNet.innerHTML =`
        <div class="card-net"><b>${main}'s Net Migration to ${extra}:</b><br><span>${
        (data[extra].info[year] - data[main].info[year]).toLocaleString()}</span></div>
      `
      cardEmi.innerHTML = `
        <div class="card-info"><b>${extra}'s Emigration to ${main}:</b><br><span>${data[extra].info[year].toLocaleString()}</span></div>
      `
      cardPercEmi.innerHTML = `
        <div class="card-info"><b>Percent of ${extra}'s emigration:</b><br><span>${
          (data[extra].info[year]/data[extra].total_emigration[year]*100).toLocaleString()
        }%</span></div>
      `
      cardPercImmi.innerHTML = `
        <div class="card-info"><b>Percent of ${main}'s total immigration:</b><br><span>${
          (data[extra].info[year]/data[main].total_immigration[year]*100).toLocaleString()
        }%</span></div>
      `
    } else {
      cardEmi.innerHTML = ""
      cardPercEmi.innerHTML = ""
      cardPercImmi.innerHTML = ""
      cardNet.innerHTML = `<p style='color:red;'>Sorry, there is not enough data for this relationship</p>`
    }
  }

  static emptyCards() {
    const cardNet = document.querySelector('#card-net')
    const cardEmi = document.querySelector('#card-emi')
    const cardPercEmi = document.querySelector('#card-percentage-emi')
    const cardPercImmi = document.querySelector('#card-percentage-immi')

    cardEmi.innerHTML = ""
    cardPercEmi.innerHTML = ""
    cardPercImmi.innerHTML = ""
    cardNet.innerHTML = ""
  }
}
