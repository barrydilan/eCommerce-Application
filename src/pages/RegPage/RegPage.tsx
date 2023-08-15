import { useState } from 'react';

import useMultistepForm from './model/Multiform';
import RegFinal from './model/RegFinal';
import RegStepFour from './model/RegStepFour';
import RegStepOne from './model/RegStepOne';
import RegStepThree from './model/RegStepThree';
import RegStepTwo from './model/RegStepTwo';
import CirclesWrapper from './ui/CirclesWrapper';

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

  function updateData(fields: Partial<FormDataType>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, currForm, back, next } = useMultistepForm([
    <RegStepOne email={formData.email} password={formData.password} updateData={updateData} next={nextStep} key={0} />,
    <RegStepTwo
      firstName={formData.firstName}
      lastName={formData.lastName}
      birthDate={formData.birthDate}
      updateData={updateData}
      back={prevStep}
      next={nextStep}
      key={1}
    />,
    <RegStepThree
      billCountry={formData.billCountry}
      billCity={formData.billCity}
      shipCountry={formData.shipCountry}
      shipCity={formData.shipCity}
      sameBillShip={formData.sameBillShip}
      updateData={updateData}
      back={prevStep}
      next={nextStep}
      key={3}
    />,
    <RegStepFour
      billCountry={formData.billCountry}
      shipCountry={formData.shipCountry}
      billPostalCode={formData.billPostalCode}
      billStreet={formData.billStreet}
      shipPostalCode={formData.shipPostalCode}
      shipStreet={formData.shipStreet}
      billSetDefault={formData.billSetDefault}
      shipSetDefault={formData.shipSetDefault}
      updateData={updateData}
      back={prevStep}
      next={nextStep}
      key={4}
    />,
    <RegFinal isSuccess key={5} />,
  ]);

  function nextStep() {
    next();
  }

  function prevStep() {
    back();
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <CirclesWrapper currStep={currentStepIndex} />
      <div className="flex w-full justify-center">{currForm}</div>
    </div>
  );
}
