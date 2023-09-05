import AddressListItem from './AddressListItem';
import { AddressObj, UserData } from '../types/profilePageTypes';

export default function AddressesList(props: {
  userData: UserData;
  setEditedAddress: React.Dispatch<React.SetStateAction<AddressObj>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { userData, setEditedAddress, setIsModalOpen } = props;
  const { addresses } = userData;
  const addressesItems = addresses?.map((address, index) => {
    const { id: addressID } = address;
    return (
      <AddressListItem
        setEditedAddress={setEditedAddress}
        setIsModalOpen={setIsModalOpen}
        address={address}
        index={index}
        key={addressID}
      />
    );
  });

  function addAddressHandler() {
    setEditedAddress({ country: 'US', city: '', streetName: '', postalCode: '' });
    setIsModalOpen(true);
  }

  return (
    <div>
      {addressesItems}
      <button
        className="mt-8 flex h-10 items-center rounded-md px-2 text-base font-medium text-accent transition-all duration-300 hover:bg-separation-line"
        type="button"
        onClick={addAddressHandler}
      >
        <span className="mr-2 text-2xl">+</span> Add more
      </button>
    </div>
  );
}
