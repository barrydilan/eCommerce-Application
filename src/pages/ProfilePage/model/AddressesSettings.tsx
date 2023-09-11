import { useState } from 'react';

import { AnimatePresence, motion, useCycle } from 'framer-motion';

import AddressesDefault from './AddressesDefault';
import AddressesEditModal from './AddressesEditModal';
import AddressesList from './AddressesList';
import { IUser } from '../../../shared/types';
import { Blackout } from '../../../shared/ui';
import { AddressObj } from '../types/profilePageTypes';

export default function AddressesSettings(props: { userData: IUser }) {
  const { userData } = props;
  const { version, id } = userData;
  const [isModalOpen, setIsModalOpen] = useCycle(false, true);
  const [editedAddress, setEditedAddress] = useState({} as AddressObj);

  return (
    <div className="flex flex-col">
      <Blackout isBlackout={isModalOpen} unlock={setIsModalOpen} />
      <AddressesDefault userData={userData} />
      <AddressesList userData={userData} setEditedAddress={setEditedAddress} setIsModalOpen={setIsModalOpen} />
      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            key="modal"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ y: '50%', scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 560,
              damping: 28,
            }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="absolute inset-0 z-50 m-auto h-full w-5/6 origin-center md:w-1/2"
          >
            <AddressesEditModal
              editedAddress={editedAddress}
              setIsModalOpen={setIsModalOpen}
              version={version}
              id={id}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
