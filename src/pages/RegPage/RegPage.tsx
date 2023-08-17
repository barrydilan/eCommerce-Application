import { useState } from 'react';

import useMultistepForm from './model/Multiform';
import RegFinal from './model/RegFinal';
import RegStepFour from './model/RegStepFour';
import RegStepOne from './model/RegStepOne';
import RegStepThree from './model/RegStepThree';
import RegStepTwo from './model/RegStepTwo';
import CirclesWrapper from './ui/CirclesWrapper';
import NavBlock from './ui/NavBlock';

type FormDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
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
  const [isformSubmitted, setIsFormSubmitted] = useState(false);

  function updateData(fields: Partial<FormDataType>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

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
      <RegStepOne
        email={email}
        password={password}
        updateData={updateData}
        key={0}
        setIsNextEnabled={setIsNextEnabled}
      />,
      <RegStepTwo
        firstName={firstName}
        lastName={lastName}
        birthDate={birthDate}
        updateData={updateData}
        setIsNextEnabled={setIsNextEnabled}
        key={1}
      />,
      <RegStepThree
        billCountry={billCountry}
        billCity={billCity}
        shipCountry={shipCountry}
        shipCity={shipCity}
        sameBillShip={sameBillShip}
        updateData={updateData}
        setIsNextEnabled={setIsNextEnabled}
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
        setIsNextEnabled={setIsNextEnabled}
        key={4}
      />,
    ],
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {isformSubmitted ? (
        <RegFinal isSuccess reStartForm={reStartForm} setIsFormSubmitted={setIsFormSubmitted} />
      ) : (
        <div className="m-2 flex h-auto flex-col items-center justify-center rounded-2xl border-2 border-separation-line">
          <CirclesWrapper currStep={currentStepIndex} quantity={formLength} />
          <div className="flex w-full justify-center">{currForm}</div>
          <NavBlock
            backFunc={back}
            isFirstStep={isFirstStep}
            isNextEnabled={isNextEnabled}
            nextFunc={() => {
              if (isNextEnabled) {
                next();
                if (isLastStep) {
                  setIsFormSubmitted(true);
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
