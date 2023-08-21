import { useCallback, useState } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import prepareDataForUpload from './lib/helpers';
import useMultistepForm from './lib/hooks';
import { RegFinal, RegStepFour, RegStepOne, RegStepThree, RegStepTwo } from './model';
import { IFormData, UpdateDataParams } from './types';
import CirclesWrapper from './ui/CirclesWrapper.tsx';
import NavBlock from './ui/NavBlock.tsx';
import { useLoginUser, useSignUpMutation } from '../../entities/user';
import { useAppSelector } from '../../shared/lib/hooks';
import { ISignUpAddress } from '../../shared/types';

const initVals: IFormData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthDate: '',
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
  const [loginUser, { isLoading }] = useLoginUser();
  const [signUpUser, { isSuccess, error }] = useSignUpMutation();
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((state) => state.userReducer);

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

  const { email, password, firstName, lastName, birthDate, sameBillShip, addresses, billSetDefault, shipSetDefault } =
    formData;

  const { isFirstStep, isLastStep, formLength, reStartForm, currentStepIndex, currForm, back, next } = useMultistepForm(
    [
      <RegStepOne email={email} password={password} updateData={updateData} key={0} enableNext={enableNext} />,
      <RegStepTwo
        firstName={firstName}
        lastName={lastName}
        birthDate={birthDate}
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

  async function nextFunc() {
    isNextEnabled && next();

    if (!isLastStep || !isNextEnabled) return;

    if (isLogged) {
      navigate('/');
      return;
    }

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
    <div className="flex h-full w-full flex-col items-center justify-center">
      {isFormSubmitted ? (
        <RegFinal
          isSuccess={isSuccess}
          reStartForm={reStartForm}
          setIsFormSubmitted={setIsFormSubmitted}
          error={error}
        />
      ) : (
        <div className="mx-3 my-10 flex h-fit w-fit flex-col items-center justify-center rounded-3xl border-2 border-separation-line px-4 sm:px-10 md:h-fit">
          <CirclesWrapper currStep={currentStepIndex} quantity={formLength} />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: sameBillShip || currentStepIndex < 2 ? 150 : 300 }}
            transition={{
              type: 'spring',
              stiffness: 660,
              damping: 25,
            }}
            className="relative mb-6 mt-8 flex w-full justify-center"
          >
            {currForm}
          </motion.div>
          <NavBlock
            backFunc={back}
            isFirstStep={isFirstStep}
            isNextEnabled={isNextEnabled}
            nextFunc={nextFunc}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
