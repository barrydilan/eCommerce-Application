import ChangePassword from './ChangePassword';
import ChangePersonalData from './ChangePersonalData';

export default function AccountSettings() {
  return (
    <div className="flex flex-col">
      <ChangePersonalData
        firstName="Ololontiy"
        lastName="Ololoevich"
        birthDate="01/01/1999"
        email="trololo@kakah.net"
      />
      <ChangePassword currPassword="2023Pa$$word" />
    </div>
  );
}
