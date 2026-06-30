import LandPageTemplate from '../components/LandPageTemplate'

const crimeaData = {
  name: 'Крым',
  fullName: 'У-ДАЧНЫЙ КРЫМ',
  location: 'Крым, Сакский р-н',
  image: '/images/crimea-bg.jpg',
  mapUrl: 'https://yandex.ru/maps/?pt=33.5,45.1&z=12&l=sat',
  inDevelopment: false,
  buttons: {
    presentation: 'https://disk.yandex.ru/d/0bGXLgE_kUEiEg',
    tour3d: '',
    chess: 'https://disk.yandex.ru/d/dHRbJLGsJrOxmw',
    renders: 'https://disk.yandex.ru/d/w2E-QWuVR00aVA',
    layouts: 'https://disk.yandex.ru/d/tT84ySmjQYByhQ',
    profitability: '#/installment/crimea',
    documentsClient: 'https://disk.yandex.ru/d/ymbuRYnn8R0EYw',
    documentsAgent: 'https://disk.yandex.ru/d/ymbuRYnn8R0EYw',
    photos: 'https://disk.yandex.ru/d/a5OQRj2EUfZamg'
  }
}

export default function CrimeaPage() {
  return <LandPageTemplate landData={crimeaData} />
}
