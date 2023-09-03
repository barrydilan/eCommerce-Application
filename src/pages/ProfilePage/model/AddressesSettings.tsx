import { useState } from 'react';

import AddressesDefault from './AddressesDefault';
import AddressesEditModal from './AddressesEditModal';
import AddressesList from './AddressesList';
import AddressesNavBlock from './AddressesNavBlock';
import { EditedAddressObj } from '../types/profilePageTypes';

const addresses = [
  { country: 'US', city: 'New York', street: 'Manhatten', postalCode: '11111' },
  { country: 'DE', city: 'Berlin', street: 'Rischtenstrasse', postalCode: '22222' },
  { country: 'UA', city: 'Kyiv', street: 'Khreschatyk', postalCode: '33333' },
];

export default function AddressesSettings() {
  const [myAddresses, setMyAddresses] = useState(addresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    address: { country: 'US', city: 'New York', street: 'Manhatten', postalCode: '11111' },
    index: undefined,
  } as EditedAddressObj);
  return (
    <div className="relative flex flex-col">
      <AddressesDefault addresses={myAddresses} />
      <AddressesList addresses={myAddresses} setEditedAddress={setEditedAddress} setIsModalOpen={setIsModalOpen} />
      <AddressesNavBlock setIsModalOpen={setIsModalOpen} setEditedAddress={setEditedAddress} />
      {isModalOpen ? (
        <AddressesEditModal
          editedAddress={editedAddress}
          setMyAddresses={setMyAddresses}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </div>
  );
}
