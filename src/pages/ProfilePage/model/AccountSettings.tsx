import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';

const userData = {
  firstName: 'Ololontiy',
  lastName: 'Ololoevich',
  birthDate: '01/01/1999',
  email: 'trololo@kakah.net',
  currPassword: '2023Pa$$word',
};

const { firstName, lastName, birthDate, email, currPassword } = userData;

export default function AccountSettings() {
  return (
    <div className="flex flex-col">
      <ChangePersonalData firstName={firstName} lastName={lastName} birthDate={birthDate} email={email} />
      <ChangePassword currPassword={currPassword} />
    </div>
  );
}
