export default function getGreeting(_hours: number) {
	if (_hours >= 6 && _hours < 12) return 'Good morning!';
	if (_hours >= 12 && _hours < 18) return 'Good day!';
	if (_hours >= 18 && _hours < 23) return 'Good evening!';
	return 'Good night!';
}
