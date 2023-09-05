import { useState } from 'react';

import AddressesDefault from './AddressesDefault';
import AddressesEditModal from './AddressesEditModal';
import AddressesList from './AddressesList';
import AddressesNavBlock from './AddressesNavBlock';
import { AddressObj, UserData } from '../types/profilePageTypes';

export default function AddressesSettings(props: {
  userData: UserData;
  accessToken: string | undefined;
  getUser: (_id: string) => void;
}) {
  const { userData, accessToken, getUser } = props;
  const { version, id } = userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState({} as AddressObj);
  return (
    <div className="relative flex flex-col">
      <AddressesDefault userData={userData} accessToken={accessToken} getUser={getUser} />
      <AddressesList userData={userData} setEditedAddress={setEditedAddress} setIsModalOpen={setIsModalOpen} />
      <AddressesNavBlock setIsModalOpen={setIsModalOpen} setEditedAddress={setEditedAddress} />
      {isModalOpen ? (
        <AddressesEditModal
          editedAddress={editedAddress}
          setIsModalOpen={setIsModalOpen}
          version={version}
          accessToken={accessToken}
          getUser={getUser}
          id={id}
        />
      ) : null}
    </div>
  );
}
