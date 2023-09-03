import { AddressObj } from './AddressesSettings';
import cityIcon from '../../../assets/icons/CityIcon.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import greenPencil from '../../../assets/icons/pencilIconGreen.svg';
import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';

function getCountry(country: string) {
  switch (country) {
    case 'US':
      return 'USA';
    case 'DE':
      return 'Germany';
    default:
      return 'Ukraine';
  }
}

export default function AddressesListItem(props: { address: AddressObj; index: number }) {
  const { address } = props;
  const { country, city, street, postalCode } = address;
  const { index } = props;
  return (
    <div className="border-b-2 border-separation-line py-6">
      <div className="relative w-full text-base font-medium">
        <h6>{`Address ${index < 9 ? `0${index + 1}` : index + 1}`}</h6>
        <button className="absolute right-8 top-0 h-5 w-5" type="button">
          <img className="w-full" src={greenPencil} alt="" />
        </button>
        <button className="absolute right-0 top-0 h-6 w-6 text-3xl leading-6 text-accent" type="button">
          ×
        </button>
      </div>
      <div className="mt-6">
        <div className="addressProfileWrapper">
          <img className="mr-4 inline" src={countryIcon} alt="" />
          {getCountry(country)}
        </div>
        <div className="addressProfileWrapper">
          <img className="mr-4 inline" src={cityIcon} alt="" />
          {city}
        </div>
        <div className="addressProfileWrapper">
          <img className="mr-4 inline w-5" src={streetIcon} alt="" />
          {street}
        </div>
        <div className="addressProfileWrapper">
          <img className="mr-4 inline w-5" src={postalCodeIcon} alt="" />
          {postalCode}
        </div>
      </div>
    </div>
  );
}
