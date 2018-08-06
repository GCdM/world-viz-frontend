const BASE_URL = 'https://world-viz-back.herokuapp.com'

class Adapter {

  static getCountries() {
    return fetch(BASE_URL + '/api/v1/countries')
        .then( res => res.json() )
  }

  static getCountryBy(id) {
    return fetch(BASE_URL + `/api/v1/countries/${id}`)
        .then( res => res.json() )
  }

  static getRelationship(main, extra){
    return fetch(BASE_URL + `/api/v1/countries/${main}/${extra}`)
        .then( res => res.json() )
  }
}
