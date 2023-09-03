import greenPencil from '../../../assets/icons/pencilIconGreen.svg';
import { AddressObj } from '../types/profilePageTypes';
import AddressView from '../ui/AddressView';

export default function AddressesListItem(props: { address: AddressObj; index: number }) {
  const { address } = props;
  const { index } = props;
  return (
    <div className="border-b-2 border-separation-line py-6">
      <div className="relative w-full text-base font-medium">
        <h6>{`Address ${index < 9 ? `0${index + 1}` : index + 1}`}</h6>
        <button className="absolute right-8 top-0 h-5 w-5 rounded-md hover:bg-separation-line" type="button">
          <img className="w-full" src={greenPencil} alt="" />
        </button>
        <button
          className="absolute right-0 top-0 h-6 w-6 rounded-md text-3xl leading-6 text-accent hover:bg-separation-line"
          type="button"
        >
          ×
        </button>
      </div>
      <AddressView address={address} />
    </div>
  );
}
