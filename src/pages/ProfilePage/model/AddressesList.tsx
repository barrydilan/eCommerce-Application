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
  return <div>{addressesItems}</div>;
}
