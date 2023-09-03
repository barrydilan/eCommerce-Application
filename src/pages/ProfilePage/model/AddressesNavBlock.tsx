import { EditedAddressObj } from '../types/profilePageTypes';

export default function AddressesNavBlock(props: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedAddress: React.Dispatch<React.SetStateAction<EditedAddressObj>>;
}) {
  const { setIsModalOpen, setEditedAddress } = props;
  function handleAddNewAddress() {
    setEditedAddress({
      address: {
        country: 'US',
        city: '',
        street: '',
        postalCode: '',
      },
      index: undefined,
    });
    setIsModalOpen(true);
  }
  return (
    <div className="my-6 flex h-10 justify-between text-base font-medium text-accent ">
      <button
        className="flex h-full items-center rounded-md px-2 transition-all duration-300 hover:bg-separation-line"
        type="button"
        onClick={() => handleAddNewAddress()}
      >
        <span className="mr-2 text-2xl">+</span> Add more
      </button>
      <button
        className="h-full rounded-md bg-accent-lightest px-8 transition-all duration-300 hover:bg-separation-line"
        type="button"
      >
        Save
      </button>
    </div>
  );
}
