import { useState } from 'react';

import AddressesDefault from './AddressesDefault';
import AddressesEditModal from './AddressesEditModal';
import AddressesList from './AddressesList';
import { IUser } from '../../../shared/types';
import { AddressObj } from '../types/profilePageTypes';

export default function AddressesSettings(props: { userData: IUser }) {
  const { userData } = props;
  const { version, id } = userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState({} as AddressObj);

  return (
    <div className="relative flex flex-col">
      <AddressesDefault userData={userData} />
      <AddressesList userData={userData} setEditedAddress={setEditedAddress} setIsModalOpen={setIsModalOpen} />
      {isModalOpen ? (
        <AddressesEditModal editedAddress={editedAddress} setIsModalOpen={setIsModalOpen} version={version} id={id} />
      ) : null}
    </div>
  );
}
