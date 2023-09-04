import { useState } from 'react';

import greenPencil from '../../../assets/icons/pencilIconGreen.svg';
import { AddressObj, EditedAddressObj } from '../types/profilePageTypes';
import AddressView from '../ui/AddressView';

export default function AddressesListItem(props: {
  address: AddressObj;
  index: number;
  setEditedAddress: React.Dispatch<React.SetStateAction<EditedAddressObj>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMyAddresses: React.Dispatch<React.SetStateAction<AddressObj[]>>;
}) {
  const { address, setEditedAddress, setIsModalOpen, setMyAddresses } = props;
  const { index } = props;
  const [isConfirmShown, setIsConfirmShown] = useState(false);
  function editClickHandler() {
    setEditedAddress({ address, index });
    setIsModalOpen(true);
  }
  function deleteHandler() {
    setMyAddresses((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  }
  return (
    <div className="border-b-2 border-separation-line py-6">
      <div className="relative w-full text-base font-medium">
        <h6>{`Address ${(index + 1).toString().padStart(2, '0')}`}</h6>
        <button
          onClick={() => editClickHandler()}
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
          } transition-all duration-300`}
        >
          Are you sure?
          <div className="mt-2 flex justify-between">
            <button onClick={() => setIsConfirmShown(false)} className="rounded-md px-2 py-1" type="button">
              No
            </button>
            <button
              onClick={() => deleteHandler()}
              className="rounded-md bg-accent-lightest px-2 py-1 text-accent"
              type="button"
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
