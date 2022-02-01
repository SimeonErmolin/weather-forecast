export let favoriteCities
!localStorage.favoriteCities ? favoriteCities = new Set() : favoriteCities = new Set(JSON.parse(localStorage.getItem('favoriteCities')));

export function updateLocal() {
  localStorage.setItem('favoriteCities', JSON.stringify([...favoriteCities]))
}
export function saveCurrentCity(city) {
  localStorage.setItem('currentCity', city)
}
