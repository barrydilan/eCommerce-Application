import AddressesListItem from './AddressesListItem';
import { AddressObj } from '../types/profilePageTypes';

export default function AddressesList(props: { addresses: AddressObj[] }) {
  const { addresses } = props;
  const addressesItems = addresses.map((address, i) => {
    return <AddressesListItem address={address} index={i} key={Object.values(address).join(',')} />;
  });
  return <div>{addressesItems}</div>;
}
