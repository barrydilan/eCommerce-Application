import AddressesListItem from './AddressesListItem';
import { AddressObj, EditedAddressObj } from '../types/profilePageTypes';

export default function AddressesList(props: {
  addresses: AddressObj[];
  setEditedAddress: React.Dispatch<React.SetStateAction<EditedAddressObj>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { addresses, setEditedAddress, setIsModalOpen } = props;
  const addressesItems = addresses.map((address, i) => {
    return (
      <AddressesListItem
        setEditedAddress={setEditedAddress}
        setIsModalOpen={setIsModalOpen}
        address={address}
        index={i}
        key={Object.values(address).join(',')}
      />
    );
  });
  return <div>{addressesItems}</div>;
}
