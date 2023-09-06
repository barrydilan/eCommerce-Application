import { useState } from 'react';

import AddressesDefault from './AddressesDefault';
import AddressesEditModal from './AddressesEditModal';
import AddressesList from './AddressesList';
import { useAppSelector } from '../../../shared/lib/hooks';
import { IUser } from '../../../shared/types';
import { AddressObj } from '../types/profilePageTypes';

export default function AddressesSettings(props: { userData: IUser; getUser: (_id: string) => void }) {
  const { accessToken } = useAppSelector((state) => state.userReducer);

  const { userData, getUser } = props;
  const { version, id } = userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState({} as AddressObj);

  return (
    <div className="relative flex flex-col">
      <AddressesDefault userData={userData} accessToken={accessToken} getUser={getUser} />
      <AddressesList
        userData={userData}
        setEditedAddress={setEditedAddress}
        setIsModalOpen={setIsModalOpen}
        getUser={getUser}
      />
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
