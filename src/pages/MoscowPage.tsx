import LandPageTemplate from '../components/LandPageTemplate'

const moscowData = {
  name: 'Московская область',
  fullName: 'СЕРЕБРЯНЫЕ ПРУДЫ',
  location: 'Московская область, Серебряные Пруды',
  image: '/images/moscow-bg.jpg',
  mapUrl: 'https://yandex.ru/maps/?pt=38.83,54.44&z=12&l=sat',
  inDevelopment: false,
  buttons: {
    presentation: 'https://disk.yandex.ru/d/wj0Sn3Si-c6f6g',
    tour3d: 'https://partners.gektar.expert/tour/silverlake/',
    chess: 'https://disk.yandex.ru/d/9qcBLKJh5BjZQA',
    renders: 'https://disk.yandex.ru/d/bLLEDs7oXq8OdA',
    layouts: 'https://disk.yandex.ru/d/LH6TWvl_Se22Gw',
    profitability: '#/installment/moscow',
    documentsClient: 'https://disk.yandex.ru/d/wj0Sn3Si-c6f6g',
    documentsAgent: 'https://disk.yandex.ru/d/wj0Sn3Si-c6f6g',
    photos: 'https://disk.yandex.ru/d/ha8A5e2vpn_DzQ'
  }
}

export default function MoscowPage() {
  return <LandPageTemplate landData={moscowData} />
}
