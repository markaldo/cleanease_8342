export const microservices = [
  { id: 'microwave', name: 'microwave', price: 20.00 },
  { id: 'oven', name: 'oven', price: 41.00 },
  { id: 'washingDishes', name: 'washingDishes', price: 25.00 },
  { id: 'kitchenCabinets', name: 'kitchenCabinets', price: 52.00 },
  { id: 'refrigerator', name: 'refrigerator', price: 40.00 },
  { id: 'closet', name: 'closet', price: 25.00 },
  { id: 'wardrobe', name: 'wardrobe', price: 30.00 },
  { id: 'drawers', name: 'drawers', price: 17.00 },
  { id: 'windows', name: 'windows', price: 35.00 },
  { id: 'toiletCabinets', name: 'toiletCabinets', price: 20.00 },
  { id: 'additionalHours', name: 'additionalHours', price: 48.00 },
  { id: 'wateringPlants', name: 'wateringPlants', price: 12.00 }
];

export const additionalServices = [
  { id: 'organicProducts', name: 'organicProducts', price: 79.00 },
  { id: 'orderVacuum', name: 'orderVacuum', price: 38.00 },
  { id: 'orderCleaningKit', name: 'orderCleaningKit', price: 27.00 },
  { id: 'preferMyOwnKit', name: 'preferMyOwnKit', price: 0.00 }
];

export const clientTypes = [
  { id: 'individual', name: 'individual' },
  { id: 'legalEntity', name: 'legalEntity' }
];

export const serviceTypes = [
  { id: 'regularCleaning', name: 'regularCleaning' },
  { id: 'deepCleaning', name: 'deepCleaning' },
  { id: 'custom', name: 'custom' },
  { id: 'postRenovationCleaning', name: 'postRenovationCleaning' }
];

export const housingTypes = [
  { id: 'privateHouse', name: 'privateHouse' },
  { id: 'studioApt', name: 'studioApt' },
  { id: 'privateApt', name: 'privateApt' },
  { id: 'commercialApt', name: 'commercialApt' }
];

export const extraRooms = [
  { id: 'kitchen', name: 'kitchen', hasSize: false },
  { id: 'corridors', name: 'corridors', hasSize: false },
  { id: 'balcony', name: 'balcony', hasSize: true },
  { id: 'garage', name: 'garage', hasSize: true },
  { id: 'basement', name: 'basement', hasSize: true }
];

export const accessMethods = [
  { id: 'canProvideAccessCodes', name: 'canProvideAccessCodes' },
  { id: 'meetAtTheDoor', name: 'meetAtTheDoor' }
];

export const frequencyOptions = [
  { id: 'perWeek', name: 'perWeek' },
  { id: 'perMonth', name: 'perMonth' }
];

export const formatPrice = (price) => {
  return `PLN ${price.toFixed(2)}`;
};