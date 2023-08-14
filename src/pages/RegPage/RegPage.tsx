// import { useState } from 'react';

// import CustomForm from '../../entities/form/ui/CustomForm';
import FormWrapper from '../../entities/form/ui/FormWrapper';

// const initVals = {
//   email: '',
//   password: '',
//   firstName: '',
//   lastName: '',
//   shipStreet: '',
//   shipCity: '',
//   shipPostalCode: '',
//   shipCountry: '',
//   billStreet: '',
//   billCity: '',
//   billPostalCode: '',
//   billCountry: '',
// };

function RegPage() {
  // const [formData, setFormData] = useState(initVals);

  // function updateData(fields: Partial<typeof initVals>) {
  //   setFormData((prev) => {
  //     return { ...prev, ...fields };
  //   });
  // }
  return (
    <FormWrapper>
      <input type="date" />
    </FormWrapper>
  );
}

export default RegPage;
