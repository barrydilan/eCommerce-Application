import { Cycle } from 'framer-motion';

import AddressListItem from './AddressListItem';
import { IUser } from '../../../shared/types';
import { AddressObj } from '../types/profilePageTypes';

export default function AddressesList(props: {
  userData: IUser;
  setEditedAddress: React.Dispatch<React.SetStateAction<AddressObj>>;
  setIsModalOpen: Cycle;
}) {
  const { userData, setEditedAddress, setIsModalOpen } = props;
  const { addresses } = userData;

  function addAddressHandler() {
    setEditedAddress({ country: 'US', city: '', streetName: '', postalCode: '' });
    setIsModalOpen();
  }

  return (
    <>
      {addresses?.map((address, index) => {
        const { id: addressID } = address;
        return (
          <AddressListItem
            setEditedAddress={setEditedAddress}
            setIsModalOpen={setIsModalOpen}
            address={address}
            userData={userData}
            index={index}
            key={addressID}
          />
        );
      })}
      <button
        className="mt-8 flex h-10 w-32 items-center rounded-md px-2 text-base font-medium text-accent transition-all duration-300 hover:bg-separation-line dark:border-2 dark:border-text-grey dark:text-primary dark:hover:bg-dark-separation-line"
        type="button"
        onClick={addAddressHandler}
      >
        <span className="mr-2 text-2xl">+</span> Add more
      </button>
    </>
  );
}
