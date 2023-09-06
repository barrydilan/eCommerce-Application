import AddressListItem from './AddressListItem';
import { IUser } from '../../../shared/types';
import { AddressObj } from '../types/profilePageTypes';

export default function AddressesList(props: {
  userData: IUser;
  setEditedAddress: React.Dispatch<React.SetStateAction<AddressObj>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getUser: (_id: string) => void;
}) {
  const { userData, setEditedAddress, setIsModalOpen, getUser } = props;
  const { addresses } = userData;

  function addAddressHandler() {
    setEditedAddress({ country: 'US', city: '', streetName: '', postalCode: '' });
    setIsModalOpen(true);
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
            getUser={getUser}
          />
        );
      })}
      <button
        className="mt-8 flex h-10 items-center rounded-md px-2 text-base font-medium text-accent transition-all duration-300 hover:bg-separation-line"
        type="button"
        onClick={addAddressHandler}
      >
        <span className="mr-2 text-2xl">+</span> Add more
      </button>
    </>
  );
}
