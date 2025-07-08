import React, { useState, useEffect } from 'react';
export const translations = {
  en: {
    // Common
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    
    // App
    appName: 'Swify',
    companyName: 'SwiftScrub Co',
    
    // Navigation
    dashboard: 'Dashboard',
    bookService: 'Book Service',
    myOrders: 'My Orders',
    paymentBilling: 'Payment & Billing',
    profileSettings: 'Profile & Settings',
    customPackageBuilder: 'Custom Package Builder',
    
    // Custom Package Builder
    createCustomPackage: 'Create Custom Package',
    packageBuilder: 'Package Builder',
    clientType: 'Client Type',
    individual: 'Individual',
    legalEntity: 'Legal Entity',
    serviceType: 'Service Type',
    regularCleaning: 'Regular Cleaning',
    deepCleaning: 'Deep Cleaning',
    custom: 'Custom',
    postRenovationCleaning: 'Post-renovation Cleaning',
    housingType: 'Housing Type',
    privateHouse: 'Private House',
    studioApt: 'Studio Apartment',
    privateApt: 'Private Apartment',
    commercialApt: 'Commercial Apartment',
    category: 'Category',
    rooms: 'Rooms',
    bathrooms: 'Bathrooms',
    extraRooms: 'Extra Rooms',
    kitchen: 'Kitchen',
    corridors: 'Corridors',
    balcony: 'Balcony',
    garage: 'Garage',
    basement: 'Basement',
    sizeInSqM: 'Size (m²)',
    microservices: 'Microservices',
    microwave: 'Microwave',
    oven: 'Oven',
    washingDishes: 'Washing Dishes',
    kitchenCabinets: 'Kitchen Cabinets',
    refrigerator: 'Refrigerator',
    closet: 'Closet',
    wardrobe: 'Wardrobe',
    drawers: 'Drawers',
    windows: 'Windows',
    toiletCabinets: 'Toilet Cabinets',
    additionalHours: 'Additional Hours',
    wateringPlants: 'Watering Plants',
    additionalServices: 'Additional Services',
    organicProducts: 'Organic Products',
    orderVacuum: 'Order Vacuum',
    orderCleaningKit: 'Order Cleaning Kit',
    preferMyOwnKit: 'Prefer My Own Kit',
    frequency: 'Frequency',
    numberOfVisits: 'Number of Visits',
    perWeek: 'Per Week',
    perMonth: 'Per Month',
    dateAndTime: 'Date and Time',
    address: 'Address',
    cityName: 'City Name',
    streetName: 'Street Name',
    building: 'Building',
    apartment: 'Apartment',
    postalCode: 'Postal Code',
    howCanWeEnterHome: 'How can we enter your home?',
    canProvideAccessCodes: 'Can provide access codes',
    meetAtTheDoor: 'Meet at the door',
    gateCode: 'Gate Code',
    entranceCode: 'Entrance Code',
    apartmentCode: 'Apartment Code',
    contactDetails: 'Contact Details',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    email: 'Email',
    additionalInformation: 'Additional Information',
    orderSummary: 'Order Summary',
    totalPrice: 'Total Price',
    discount: 'Discount',
    priceToPay: 'Price to Pay',
    agreeToPublicOffer: 'I agree to the public offer and privacy policy',
    consentToDataProcessing: 'I consent to the processing of personal data',
    makeOrder: 'Make Order',
    
    // Validation Messages
    fieldRequired: 'This field is required',
    invalidEmail: 'Invalid email address',
    invalidPhone: 'Invalid phone number',
    
    // Currency
    currency: 'PLN',
    
    // Form placeholders
    enterCityName: 'Enter city name',
    enterStreetName: 'Enter street name',
    enterBuilding: 'Enter building number',
    enterApartment: 'Enter apartment number',
    enterPostalCode: 'Enter postal code',
    enterFullName: 'Enter your full name',
    enterPhoneNumber: 'Enter phone number',
    enterEmail: 'Enter email address',
    enterAdditionalInfo: 'Enter additional information',
    enterSize: 'Enter size in m²',
    enterAccessCode: 'Enter access code'
  },
  
  pl: {
    // Common
    submit: 'Zatwierdź',
    cancel: 'Anuluj',
    save: 'Zapisz',
    edit: 'Edytuj',
    delete: 'Usuń',
    confirm: 'Potwierdź',
    back: 'Wstecz',
    next: 'Dalej',
    previous: 'Poprzedni',
    loading: 'Ładowanie...',
    error: 'Błąd',
    success: 'Sukces',
    warning: 'Ostrzeżenie',
    info: 'Informacja',
    
    // App
    appName: 'Swify',
    companyName: 'SwiftScrub Co',
    
    // Navigation
    dashboard: 'Pulpit',
    bookService: 'Zarezerwuj Usługę',
    myOrders: 'Moje Zamówienia',
    paymentBilling: 'Płatności i Faktury',
    profileSettings: 'Profil i Ustawienia',
    customPackageBuilder: 'Kreator Pakietów',
    
    // Custom Package Builder
    createCustomPackage: 'Utwórz Niestandardowy Pakiet',
    packageBuilder: 'Kreator Pakietów',
    clientType: 'Typ Klienta',
    individual: 'Osoba Fizyczna',
    legalEntity: 'Osoba Prawna',
    serviceType: 'Typ Usługi',
    regularCleaning: 'Sprzątanie Regularne',
    deepCleaning: 'Sprzątanie Głębokie',
    custom: 'Niestandardowe',
    postRenovationCleaning: 'Sprzątanie Po Remoncie',
    housingType: 'Typ Mieszkania',
    privateHouse: 'Dom Prywatny',
    studioApt: 'Studio',
    privateApt: 'Mieszkanie Prywatne',
    commercialApt: 'Mieszkanie Komercyjne',
    category: 'Kategoria',
    rooms: 'Pokoje',
    bathrooms: 'Łazienki',
    extraRooms: 'Dodatkowe Pomieszczenia',
    kitchen: 'Kuchnia',
    corridors: 'Korytarze',
    balcony: 'Balkon',
    garage: 'Garaż',
    basement: 'Piwnica',
    sizeInSqM: 'Powierzchnia (m²)',
    microservices: 'Mikrousługi',
    microwave: 'Mikrofalówka',
    oven: 'Piekarnik',
    washingDishes: 'Mycie Naczyń',
    kitchenCabinets: 'Szafki Kuchenne',
    refrigerator: 'Lodówka',
    closet: 'Szafa',
    wardrobe: 'Garderoba',
    drawers: 'Szuflady',
    windows: 'Okna',
    toiletCabinets: 'Szafki Toaletowe',
    additionalHours: 'Dodatkowe Godziny',
    wateringPlants: 'Podlewanie Roślin',
    additionalServices: 'Dodatkowe Usługi',
    organicProducts: 'Produkty Ekologiczne',
    orderVacuum: 'Zamów Odkurzacz',
    orderCleaningKit: 'Zamów Zestaw Sprzątający',
    preferMyOwnKit: 'Wolę Własny Zestaw',
    frequency: 'Częstotliwość',
    numberOfVisits: 'Liczba Wizyt',
    perWeek: 'Tygodniowo',
    perMonth: 'Miesięcznie',
    dateAndTime: 'Data i Czas',
    address: 'Adres',
    cityName: 'Nazwa Miasta',
    streetName: 'Nazwa Ulicy',
    building: 'Budynek',
    apartment: 'Mieszkanie',
    postalCode: 'Kod Pocztowy',
    howCanWeEnterHome: 'Jak możemy wejść do Twojego domu?',
    canProvideAccessCodes: 'Mogę podać kody dostępu',
    meetAtTheDoor: 'Spotkanie przy drzwiach',
    gateCode: 'Kod Bramy',
    entranceCode: 'Kod Wejścia',
    apartmentCode: 'Kod Mieszkania',
    contactDetails: 'Dane Kontaktowe',
    fullName: 'Imię i Nazwisko',
    phoneNumber: 'Numer Telefonu',
    email: 'Email',
    additionalInformation: 'Dodatkowe Informacje',
    orderSummary: 'Podsumowanie Zamówienia',
    totalPrice: 'Cena Całkowita',
    discount: 'Zniżka',
    priceToPay: 'Do Zapłaty',
    agreeToPublicOffer: 'Zgadzam się na ofertę publiczną i politykę prywatności',
    consentToDataProcessing: 'Wyrażam zgodę na przetwarzanie danych osobowych',
    makeOrder: 'Złóż Zamówienie',
    
    // Validation Messages
    fieldRequired: 'To pole jest wymagane',
    invalidEmail: 'Nieprawidłowy adres email',
    invalidPhone: 'Nieprawidłowy numer telefonu',
    
    // Currency
    currency: 'PLN',
    
    // Form placeholders
    enterCityName: 'Wpisz nazwę miasta',
    enterStreetName: 'Wpisz nazwę ulicy',
    enterBuilding: 'Wpisz numer budynku',
    enterApartment: 'Wpisz numer mieszkania',
    enterPostalCode: 'Wpisz kod pocztowy',
    enterFullName: 'Wpisz swoje imię i nazwisko',
    enterPhoneNumber: 'Wpisz numer telefonu',
    enterEmail: 'Wpisz adres email',
    enterAdditionalInfo: 'Wpisz dodatkowe informacje',
    enterSize: 'Wpisz powierzchnię w m²',
    enterAccessCode: 'Wpisz kod dostępu'
  }
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState('en');
  
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);
  
  const t = (key) => {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    return translation || key;
  };
  
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  return { t, currentLanguage, changeLanguage };
};