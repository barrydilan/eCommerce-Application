import { useCallback, useState } from 'react';

import useMultistepForm from './model/Multiform';
import RegFinal from './model/RegFinal';
import RegStepFour from './model/RegStepFour';
import RegStepOne from './model/RegStepOne';
import RegStepThree from './model/RegStepThree';
import RegStepTwo from './model/RegStepTwo';
import CirclesWrapper from './ui/CirclesWrapper';
import NavBlock from './ui/NavBlock';
import { useLoginUser, useSignUpMutation } from '../../entities/user';
import { ISignUpAddress, ISignUpParams } from '../../shared/types';

type FormDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  sameBillShip: boolean;
  billCountry: string;
  billCity: string;
  billStreet: string;
  billPostalCode: string;
  billSetDefault: boolean;
  shipCountry: string;
  shipCity: string;
  shipPostalCode: string;
  shipStreet: string;
  shipSetDefault: boolean;
};

export type UserFormProps = Partial<FormDataType> & {
  updateData: (fields: Partial<FormDataType>) => void;
  enableNext: (arg: boolean) => void;
};

const initVals = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  sameBillShip: true,
  billCountry: 'usa',
  billCity: '',
  billPostalCode: '',
  billStreet: '',
  billSetDefault: true,
  shipCountry: 'usa',
  shipCity: '',
  shipPostalCode: '',
  shipStreet: '',
  shipSetDefault: true,
};

export default function RegPage() {
  const [formData, setFormData] = useState(initVals);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [signUpUser, { isSuccess }] = useSignUpMutation();
  const [loginUser] = useLoginUser();

  const enableNext = useCallback(
    (arg: boolean) => {
      setIsNextEnabled(arg);
    },
    [setIsNextEnabled],
  );

  const updateData = useCallback(
    (fields: Partial<UserFormProps>) => {
      setFormData((prev) => {
        return { ...prev, ...fields };
      });
    },
    [setFormData],
  );

  const {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    sameBillShip,
    billCountry,
    billCity,
    billPostalCode,
    billStreet,
    billSetDefault,
    shipCountry,
    shipCity,
    shipPostalCode,
    shipStreet,
    shipSetDefault,
  } = formData;

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
        billCountry={billCountry}
        billCity={billCity}
        shipCountry={shipCountry}
        shipCity={shipCity}
        sameBillShip={sameBillShip}
        updateData={updateData}
        enableNext={enableNext}
        key={3}
      />,
      <RegStepFour
        billCountry={billCountry}
        shipCountry={shipCountry}
        sameBillShip={sameBillShip}
        billPostalCode={billPostalCode}
        billStreet={billStreet}
        shipPostalCode={shipPostalCode}
        shipStreet={shipStreet}
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

    if (isLastStep && isNextEnabled) {
      const isSameAddress = formData.sameBillShip;
      let defaultBillingAddress = formData.billSetDefault ? 0 : undefined;
      let defaultShippingAddress = formData.shipSetDefault ? 0 : undefined;

      let billingAddresses: [number] = [0];
      let shippingAddresses: [number] = [0];

      if (!isSameAddress) {
        billingAddresses = [0];
        shippingAddresses = [1];

        defaultBillingAddress = formData.billSetDefault ? 0 : undefined;
        defaultShippingAddress = formData.shipSetDefault ? 1 : undefined;
      }

      const billingAddress: ISignUpAddress = {
        city: formData.billCity,
        country: formData.billCountry,
        postalCode: formData.billPostalCode,
        streetName: formData.billStreet,
      };

      const shippingAddress: ISignUpAddress = {
        city: formData.shipCity,
        country: formData.shipCountry,
        postalCode: formData.shipPostalCode,
        streetName: formData.shipStreet,
      };

      const signUpData: ISignUpParams = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        addresses: isSameAddress ? [billingAddress] : [billingAddress, shippingAddress],
        billingAddresses,
        shippingAddresses,
        defaultBillingAddress,
        defaultShippingAddress,
      };

      console.log(signUpData);

      try {
        const {
          customer: { id },
        } = await signUpUser(signUpData).unwrap();

        await loginUser(email, password, id);
      } catch (e) {
        console.log(e);
      } finally {
        setIsFormSubmitted(true);
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {isFormSubmitted ? (
        <RegFinal isSuccess={isSuccess} reStartForm={reStartForm} setIsFormSubmitted={setIsFormSubmitted} />
      ) : (
        <div className="ml-3 mr-3 flex h-auto flex-col items-center justify-center rounded-3xl border-2 border-separation-line sm:pl-10 sm:pr-10">
          <CirclesWrapper currStep={currentStepIndex} quantity={formLength} />
          <div className="flex w-full justify-center transition ease-in-out ">{currForm}</div>
          <NavBlock backFunc={back} isFirstStep={isFirstStep} isNextEnabled={isNextEnabled} nextFunc={nextFunc} />
        </div>
      )}
    </div>
  );
}
