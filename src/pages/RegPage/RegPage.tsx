import { useCallback, useState } from 'react';

import { motion } from 'framer-motion';

import prepareDataForUpload from './lib/helpers';
import useMultistepForm from './lib/hooks';
import { RegStepFour, RegStepOne, RegStepThree, RegStepTwo } from './model';
import { IFormData, UpdateDataParams } from './types';
import CirclesWrapper from './ui/CirclesWrapper.tsx';
import NavBlock from './ui/NavBlock.tsx';
import { ErrorModal, SuccessModal } from '../../entities/form/ui';
import { useLoginUser, useSignUpMutation } from '../../entities/user';
import { getErrorMessage } from '../../shared/lib/helpers';
import { ISignUpAddress } from '../../shared/types';
import { pageVariants } from '../../shared/ui';

const initVals: IFormData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  sameBillShip: true,
  billSetDefault: true,
  shipSetDefault: true,
  addresses: [{} as ISignUpAddress, {} as ISignUpAddress],
  billingAddresses: [0],
  shippingAddresses: [0],
};

export default function RegPage() {
  const [formData, setFormData] = useState(initVals);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loginUser] = useLoginUser();
  const [signUpUser, { isSuccess, error, isLoading }] = useSignUpMutation();

  const errorMessage = getErrorMessage(error);

  const enableNext = useCallback(
    (arg: boolean) => {
      setIsNextEnabled(arg);
    },
    [setIsNextEnabled],
  );

  const updateData = useCallback(
    (fieldsOrCallback: UpdateDataParams) => {
      setFormData((prevState) => {
        if (typeof fieldsOrCallback === 'function') {
          return fieldsOrCallback(prevState);
        }

        return { ...prevState, ...fieldsOrCallback };
      });
    },
    [setFormData],
  );

  const { email, password, firstName, lastName, dateOfBirth, sameBillShip, addresses, billSetDefault, shipSetDefault } =
    formData;

  const { isFirstStep, isLastStep, formLength, reStartForm, currentStepIndex, currForm, back, next } = useMultistepForm(
    [
      <RegStepOne email={email} password={password} updateData={updateData} key={0} enableNext={enableNext} />,
      <RegStepTwo
        firstName={firstName}
        lastName={lastName}
        dateOfBirth={dateOfBirth}
        updateData={updateData}
        enableNext={enableNext}
        key={1}
      />,
      <RegStepThree
        addresses={addresses}
        sameBillShip={sameBillShip}
        updateData={updateData}
        enableNext={enableNext}
        key={3}
      />,
      <RegStepFour
        addresses={addresses}
        sameBillShip={sameBillShip}
        billSetDefault={billSetDefault}
        shipSetDefault={shipSetDefault}
        updateData={updateData}
        enableNext={enableNext}
        key={4}
      />,
    ],
  );

  function handleResetForm() {
    reStartForm();
    setIsFormSubmitted(false);
  }

  async function nextFunc() {
    isNextEnabled && next();

    if (!isLastStep || !isNextEnabled) return;

    const signUpData = prepareDataForUpload(formData);

    try {
      const {
        customer: { id },
      } = await signUpUser(signUpData).unwrap();

      await loginUser(email, password, id);
    } catch (e) {
      // console.error();
    } finally {
      setIsFormSubmitted(true);
    }
  }

  return (
    <motion.div
      key="modal1"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {isFormSubmitted ? (
        isSuccess ? (
          <SuccessModal />
        ) : (
          <ErrorModal reStartForm={handleResetForm} errorMessage={errorMessage} navigateTo="/registration" />
        )
      ) : (
        <div
          className={`relative mx-3 my-24 flex w-fit flex-col items-center justify-center rounded-3xl px-4 sm:px-10 ${
            sameBillShip || currentStepIndex < 2 ? 'h-[379.2px]' : 'h-[529.72px]'
          }`}
        >
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: sameBillShip || currentStepIndex < 2 ? 1 : 1.05 }}
            transition={{
              type: 'spring',
              stiffness: 660,
              damping: 15,
            }}
            className="absolute inset-0 m-auto h-full w-full rounded-3xl border-2 border-separation-line"
          />
          <CirclesWrapper
            sameBillShip={sameBillShip}
            currentStepIndex={currentStepIndex}
            currStep={currentStepIndex}
            quantity={formLength}
          />
          <div className="relative mb-6 mt-8 flex h-fit min-h-[150px] w-full justify-center">{currForm}</div>
          <NavBlock
            backFunc={back}
            isFirstStep={isFirstStep}
            isNextEnabled={isNextEnabled}
            nextFunc={nextFunc}
            isLoading={isLoading}
            sameBillShip={sameBillShip}
            currentStepIndex={currentStepIndex}
          />
        </div>
      )}
    </motion.div>
  );
}
