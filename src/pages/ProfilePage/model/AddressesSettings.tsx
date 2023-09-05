// import { useState } from 'react';

// import AddressesDefault from './AddressesDefault';
// import AddressesEditModal from './AddressesEditModal';
// import AddressesList from './AddressesList';
// import AddressesNavBlock from './AddressesNavBlock';
// import { EditedAddressObj } from '../types/profilePageTypes';
// import { UserData } from '../types/profilePageTypes';

// export default function AddressesSettings(props: {
//   userData: UserData;
//   accessToken: string | undefined;
//   getUser: (_id: string) => void;
// }) {
//   const { userData, accessToken, getUser } = props;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editedAddress, setEditedAddress] = useState({
//     address: { country: 'US', city: 'New York', street: 'Manhatten', postalCode: '11111' },
//     index: undefined,
//   } as EditedAddressObj);
//   return (
//     <div className="relative flex flex-col">
//       <AddressesDefault userData={userData} accessToken={accessToken} getUser={getUser} />
//       {/* <AddressesList
//         addresses={addresses}
//         setEditedAddress={setEditedAddress}
//         setIsModalOpen={setIsModalOpen}
//       />
//       <AddressesNavBlock setIsModalOpen={setIsModalOpen} setEditedAddress={setEditedAddress} />
//       {isModalOpen ? (
//         <AddressesEditModal
//           editedAddress={editedAddress}
//           setIsModalOpen={setIsModalOpen}
//         />
//       ) : null} */}
//     </div>
//   );
// }
