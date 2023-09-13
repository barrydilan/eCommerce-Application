export default function MainIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      className={`navMenuIcon ${isActive ? 'fill-accent' : 'fill-inactive-icons-grey'}  lg:inline-block`}
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
    >
      <rect width="10.014" height="10.017" x="0.84" y="0.698" rx="2" />
      <rect width="10.014" height="10.017" x="12.826" y="0.698" rx="2" />
      <rect width="10.014" height="10.017" x="0.84" y="12.68" rx="2" />
      <rect width="10.014" height="10.017" x="12.826" y="12.68" rx="2" />
    </svg>
  );
}
