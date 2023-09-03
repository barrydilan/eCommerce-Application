import AddressesListItem from './AddressesListItem';
import { AddressObj, EditedAddressObj } from '../types/profilePageTypes';

export default function AddressesList(props: {
  addresses: AddressObj[];
  setEditedAddress: React.Dispatch<React.SetStateAction<EditedAddressObj>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMyAddresses: React.Dispatch<React.SetStateAction<AddressObj[]>>;
}) {
  const { addresses, setEditedAddress, setIsModalOpen, setMyAddresses } = props;
  const addressesItems = addresses.map((address, i) => {
    return (
      <AddressesListItem
        setEditedAddress={setEditedAddress}
        setIsModalOpen={setIsModalOpen}
        setMyAddresses={setMyAddresses}
        address={address}
        index={i}
        key={Object.values(address).join(',')}
      />
    );
  });
  return <div>{addressesItems}</div>;
}
