class Adapter {

  static getCountries() {
    return fetch('http://localhost:3000/api/v1/countries')
        .then( res => res.json() )
  }

  static getCountryBy(id) {
    return fetch(`http://localhost:3000/api/v1/countries/${id}`)
        .then( res => res.json() )
  }

  static getRelationship(main, extra){
    return fetch(`http://localhost:3000/api/v1/countries/${main}/${extra}`)
        .then( res => res.json() )
  }
}
