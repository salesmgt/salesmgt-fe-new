import Geocode from 'react-geocode'

// config for Geocode
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY)
Geocode.setLanguage('vi')
Geocode.setRegion('VN')
Geocode.setLocationType('ROOFTOP')
Geocode.enableDebug() // Enable or disable logs


export default Geocode

// export const GeoCodes = () => {
// }


//===================================================

// ApiKey đang sử dụng là key mới. Key cũ là: 
// (1) AIzaSyB7XeEVsjODCO5_P6eybUglutjZ3O_jAGY
// (2) AIzaSyD4IxmfBNYwxn3JI2qYWevYnX5WvGhsicw      (current - Salesmgt)
// (3) AIzaSyBzlCOMk1ZCAw6zh1YWICU4zLdrsF2rbzk      (newest - HaPTN)
