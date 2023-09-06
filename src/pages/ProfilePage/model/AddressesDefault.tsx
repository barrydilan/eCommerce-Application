import { useState } from 'react';

import { motion } from 'framer-motion';

import icon from '../../../assets/icons/CityIcon.svg';
import { IUser } from '../../../shared/types';
import { inputAnimation, svgAnimation } from '../../../shared/ui';
import InfoModal from '../ui/InfoModal';

export default function AddressesDefault(props: {
  userData: IUser;
  accessToken: string | undefined;
  getUser: (_id: string) => void;
}) {
  const { userData, accessToken, getUser } = props;
  const { addresses, defaultBillingAddressId, defaultShippingAddressId, version, id } = userData;
  const [billAddress, setBillAddress] = useState(defaultBillingAddressId);
  const [shipAddress, setShipAddress] = useState(defaultShippingAddressId);
  const [msgModalShown, setMsgModalShown] = useState(false);
  const [msgModalText, setMsgModalText] = useState('');

  const options = addresses?.map((opt) => {
    const { id: addressId, country, city, streetName, postalCode } = opt;
    const string = `${country}, ${city}, ${streetName}, ${postalCode}`;
    return (
      <option value={addressId} key={addressId}>
        {string}
      </option>
    );
  });

  function saveClickHandler() {
    fetch(`https://api.europe-west1.gcp.commercetools.com/async-await-ecommerce-application/customers/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId: shipAddress,
          },
          {
            action: 'setDefaultBillingAddress',
            addressId: billAddress,
          },
        ],
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok || res.status !== 200) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        setMsgModalText('Your default addresses saved! :)');
        setMsgModalShown(true);
        setTimeout(() => setMsgModalShown(false), 1500);
        if (typeof id === 'string') getUser(id);
      })
      .catch(() => {
        setMsgModalText('Something went wrong! :(');
        setMsgModalShown(true);
        setTimeout(() => setMsgModalShown(false), 1500);
      });
  }

  return (
    <div className="relative h-auto w-full border-b-2 border-separation-line py-6">
      <InfoModal msgModalShown={msgModalShown} msgModalText={msgModalText} />
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
      <button
        className="relative right-0 ml-auto mt-5 block h-10 w-30 rounded-md bg-accent-lightest px-8 text-base font-medium text-accent transition-all duration-300 hover:bg-separation-line"
        type="button"
        onClick={saveClickHandler}
      >
        Save
      </button>
    </div>
  );
}
