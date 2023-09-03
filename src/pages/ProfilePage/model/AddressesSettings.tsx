import AddressesDefault from './AddressesDefault';
import AddressesList from './AddressesList';
import AddressesNavBlock from './AddressesNavBlock';

const addresses = [
  { country: 'US', city: 'New York', street: 'Manhatten', postalCode: '11111' },
  { country: 'DE', city: 'Berlin', street: 'Rischtenstrasse', postalCode: '22222' },
  { country: 'UA', city: 'Kyiv', street: 'Khreschatyk', postalCode: '33333' },
];

export default function AddressesSettings() {
  return (
    <div className="flex flex-col">
      <AddressesDefault addresses={addresses} />
      <AddressesList addresses={addresses} />
      <AddressesNavBlock />
    </div>
  );
}
