import { motion } from 'framer-motion';

import cityIcon from '../../../assets/icons/CityIcon.svg';
import countryIcon from '../../../assets/icons/CountryIcon.svg';
import postalCodeIcon from '../../../assets/icons/postalCodeIcon.svg';
import streetIcon from '../../../assets/icons/StreetIcon.svg';
import { svgAnimation } from '../../../shared/ui';
import { AddressObj } from '../types/profilePageTypes';

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

export default function AddressView(props: { address: AddressObj }) {
  const { address } = props;
  const { country, city, streetName, postalCode } = address;
  return (
    <div className="mt-6 flex-wrap justify-between gap-6 md:flex">
      <div className="addressProfileWrapper">
        <motion.img
          initial={svgAnimation.initial}
          animate={svgAnimation.animate}
          transition={svgAnimation.transition}
          className="mr-4 inline w-5"
          src={countryIcon}
          alt=""
        />
        {getCountry(country)}
      </div>
      <div className="addressProfileWrapper">
        <motion.img
          initial={svgAnimation.initial}
          animate={svgAnimation.animate}
          transition={svgAnimation.transition}
          className="mr-4 inline w-5"
          src={cityIcon}
          alt=""
        />
        {city}
      </div>
      <div className="addressProfileWrapper">
        <motion.img
          initial={svgAnimation.initial}
          animate={svgAnimation.animate}
          transition={svgAnimation.transition}
          className="mr-4 inline w-5"
          src={streetIcon}
          alt=""
        />
        {streetName}
      </div>
      <div className="addressProfileWrapper">
        <motion.img
          initial={svgAnimation.initial}
          animate={svgAnimation.animate}
          transition={svgAnimation.transition}
          className="mr-4 inline w-5"
          src={postalCodeIcon}
          alt=""
        />
        {postalCode}
      </div>
    </div>
  );
}
