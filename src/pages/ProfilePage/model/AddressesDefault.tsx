import { useState } from 'react';

import { motion, useCycle } from 'framer-motion';

import icon from '../../../assets/icons/CityIcon.svg';
import { useLazyGetUserQuery, useUpdateUserAddressMutation } from '../../../entities/user';
import UserUpdateActions from '../../../entities/user/types/enums.ts';
import { IUser } from '../../../shared/types';
import { inputAnimation, svgAnimation } from '../../../shared/ui';
import MODAL_TIMEOUT from '../constants/constants.ts';
import InfoModal from '../ui/InfoModal';

export default function AddressesDefault(props: { userData: IUser }) {
  const { userData } = props;
  const { addresses, defaultBillingAddressId, defaultShippingAddressId, version, id } = userData;

  const [billAddress, setBillAddress] = useState(defaultBillingAddressId);
  const [shipAddress, setShipAddress] = useState(defaultShippingAddressId);
  const [msgModalShown, setMsgModalShown] = useCycle(false, true);
  const [msgModalText, setMsgModalText] = useState('');
  const [updateAddress] = useUpdateUserAddressMutation();
  const [getUser] = useLazyGetUserQuery();

  async function saveClickHandler() {
    try {
      await updateAddress({
        body: {
          version,
          actions: [
            {
              action: UserUpdateActions.SET_DEFAULT_SHIPPING_ADDRESS,
              addressId: shipAddress,
            },
            {
              action: UserUpdateActions.SET_DEFAULT_BILLING_ADDRESS,
              addressId: billAddress,
            },
          ],
        },
        id,
      });
      setMsgModalText('Your addresses has been saved! :)');
      setMsgModalShown();
      setTimeout(() => setMsgModalShown(), MODAL_TIMEOUT);
      getUser(id);
    } catch (e) {
      setMsgModalText('Something went wrong! :(');
      setMsgModalShown();
      setTimeout(() => setMsgModalShown(), MODAL_TIMEOUT);
    }
  }

  const options = addresses?.map((opt) => {
    const { id: addressId, country, city, streetName, postalCode } = opt;
    const string = `${country}, ${city}, ${streetName}, ${postalCode}`;
    return (
      <option value={addressId} key={addressId}>
        {string}
      </option>
    );
  });

  return (
    <div className="h-auto w-full border-b-2 border-separation-line py-6">
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
            transition={{ ...inputAnimation.transition, delay: 0.1 }}
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
            transition={{ ...svgAnimation.transition, delay: 0.2 }}
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
