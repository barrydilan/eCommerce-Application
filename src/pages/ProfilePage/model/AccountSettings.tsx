import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';

const userData = {
  firstName: 'Ololontiy',
  lastName: 'Ololoevich',
  dateOfBirth: '01/01/1999',
  email: 'trololo@kakah.net',
  currPassword: '2023Pa$$word',
};

const { firstName, lastName, dateOfBirth, email, currPassword } = userData;

export default function AccountSettings() {
  return (
    <div className="flex flex-col">
      <ChangePersonalData firstName={firstName} lastName={lastName} dateOfBirth={dateOfBirth} email={email} />
      <ChangePassword currPassword={currPassword} />
    </div>
  );
}
