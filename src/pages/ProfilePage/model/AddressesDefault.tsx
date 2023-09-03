import { useState } from 'react';

import { motion } from 'framer-motion';

import icon from '../../../assets/icons/CityIcon.svg';
import { inputAnimation, svgAnimation } from '../../../shared/ui';
import { AddressObj } from '../types/profilePageTypes';

export default function AddressesDefault(props: { addresses: AddressObj[] }) {
  const { addresses } = props;
  const [billAddress, setBillAddress] = useState('none');
  const [shipAddress, setShipAddress] = useState('none');

  const options = addresses.map((opt, i) => {
    const string = Object.values(opt).join(', ');
    return (
      <option value={i} key={string}>
        {string}
      </option>
    );
  });
  return (
    <div className="border-b-2 border-separation-line py-6">
      <div className="profileInputWrapper">
        <div className="text-sm font-medium text-text-grey">Select default shipping address:</div>
        <label htmlFor="billAddress" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
          <motion.select
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={inputAnimation.transition}
            id="billAddress"
            name="billAddress"
            className="loginRegInput"
            value={billAddress}
            onChange={(e) => setBillAddress(e.target.value)}
          >
            <option value="none">None</option>
            {options}
          </motion.select>
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={svgAnimation.transition}
            className="invalidInputIcon"
            src={icon}
            alt=""
          />
        </label>
      </div>
      <div className="profileInputWrapper">
        <div className="text-sm font-medium text-text-grey">Select default billing address:</div>
        <label htmlFor="shipAddress" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
          <motion.select
            initial={inputAnimation.initial}
            animate={inputAnimation.animate}
            transition={inputAnimation.transition}
            id="shipAddress"
            name="shipAddress"
            className="loginRegInput"
            value={shipAddress}
            onChange={(e) => setShipAddress(e.target.value)}
          >
            <option value="none">None</option>
            {options}
          </motion.select>
          <motion.img
            initial={svgAnimation.initial}
            animate={svgAnimation.animate}
            transition={svgAnimation.transition}
            className="invalidInputIcon"
            src={icon}
            alt=""
          />
        </label>
      </div>
    </div>
  );
}
