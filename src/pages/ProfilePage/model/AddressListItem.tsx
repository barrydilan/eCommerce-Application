import React, { useState } from 'react';

import { Cycle } from 'framer-motion';

import greenPencil from '../../../assets/icons/pencilIconGreen.svg';
import { useDeleteUserDataMutation, useLazyGetUserQuery } from '../../../entities/user';
import UserUpdateActions from '../../../entities/user/types/enums.ts';
import { IUser } from '../../../shared/types';
import MODAL_TIMEOUT from '../constants/constants.ts';
import { AddressObj } from '../types/profilePageTypes';
import AddressView from '../ui/AddressView';
import InfoModal from '../ui/InfoModal';

export default function AddressListItem(props: {
  index: number;
  address: AddressObj;
  userData: IUser;
  setEditedAddress: React.Dispatch<React.SetStateAction<AddressObj>>;
  setIsModalOpen: Cycle;
}) {
  const { index, setEditedAddress, setIsModalOpen, userData, address } = props;
  const { version, id } = userData;
  const addressId = address.id;
  const [isConfirmShown, setIsConfirmShown] = useState(false);
  const [msgModalShown, setMsgModalShown] = useState(false);
  const [msgModalText, setMsgModalText] = useState('');
  const [deleteUserData] = useDeleteUserDataMutation();
  const [getUser] = useLazyGetUserQuery();

  function editClickHandler() {
    setEditedAddress(address);
    setIsModalOpen();
  }

  async function deleteClickHandler() {
    try {
      await deleteUserData({
        version,
        actions: [
          {
            action: UserUpdateActions.REMOVE_ADDRESS,
            addressId: addressId as string,
          },
        ],
      });

      setMsgModalText('Your addresses was deleted! :)');
      setMsgModalShown(true);

      setTimeout(() => {
        setMsgModalShown(false);
        getUser(id);
      }, MODAL_TIMEOUT);
    } catch (e) {
      setMsgModalText('Something went wrong! :(');
      setMsgModalShown(true);
      setTimeout(() => setMsgModalShown(false), MODAL_TIMEOUT);
    }
  }

  return (
    <div className="border-b-2 border-separation-line py-6">
      <div className="relative w-full text-base font-medium dark:text-primary">
        <h6>{`Address ${(index + 1).toString().padStart(2, '0')}`}</h6>
        <InfoModal msgModalShown={msgModalShown} msgModalText={msgModalText} />
        <button
          onClick={editClickHandler}
          className="absolute right-8 top-0 h-5 w-5 rounded-md hover:bg-separation-line"
          type="button"
        >
          <img className="w-full" src={greenPencil} alt="" />
        </button>
        <button
          onClick={() => setIsConfirmShown(true)}
          className="absolute right-0 top-0 h-6 w-6 rounded-md text-3xl leading-6 text-accent hover:bg-separation-line"
          type="button"
        >
          ×
        </button>
        <div
          className={`absolute right-0 top-8 rounded-md border-2 border-separation-line bg-primary p-2 ${
            isConfirmShown ? 'opacity-100' : 'opacity-0'
          } transition-all duration-300 ease-bounce dark:border-text-grey dark:bg-dark-bg-primary`}
        >
          Are you sure?
          <div className="mt-2 flex justify-between text-text-grey">
            <button onClick={() => setIsConfirmShown(false)} className="rounded-md px-2 py-1" type="button">
              No
            </button>
            <button
              className="rounded-md bg-accent-lightest px-2 py-1 text-accent"
              type="button"
              onClick={deleteClickHandler}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <AddressView address={address} />
    </div>
  );
}
