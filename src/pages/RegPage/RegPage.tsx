import { useState } from 'react';

import useMultistepForm from './model/Multiform';
import RegStepOne from './model/RegStepOne';
import CheckCircle from './ui/CheckCircle';

type FormDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  shipStreet: string;
  shipCity: string;
  shipPostalCode: string;
  shipCountry: string;
  billStreet: string;
  billCity: string;
  billPostalCode: string;
  billCountry: string;
};

const initVals = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  shipStreet: '',
  shipCity: '',
  shipPostalCode: '',
  shipCountry: '',
  billStreet: '',
  billCity: '',
  billPostalCode: '',
  billCountry: '',
};

export default function RegPage() {
  const [formData, setFormData] = useState(initVals);

  function updateData(fields: Partial<FormDataType>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  // steps, currentStepIndex, currForm, isFirstStep, isLastStep, back, next

  const { currForm } = useMultistepForm([
    <RegStepOne email={formData.email} password={formData.password} updateData={updateData} key={1} />,
  ]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-4 flex w-78 justify-between pl-4 pr-4">
        <CheckCircle numb={1} isChecked={false} />
        <CheckCircle numb={2} isChecked={false} />
        <CheckCircle numb={3} isChecked={false} />
        <CheckCircle numb={4} isChecked={false} />
      </div>
      <div className="flex w-full justify-center">{currForm}</div>
    </div>
  );
}
