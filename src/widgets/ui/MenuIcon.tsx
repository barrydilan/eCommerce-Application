export default function MainIcon({ isActive }: { isActive: boolean }) {
  const fill = isActive ? '#36B843' : '#9DACB3';
  return (
    <svg
      className="navMenuIcon md:inline-block"
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      fill={fill}
      viewBox="0 0 23 23"
    >
      <rect width="10.014" height="10.017" x="0.84" y="0.698" fill={fill} rx="2" />
      <rect width="10.014" height="10.017" x="12.826" y="0.698" fill={fill} rx="2" />
      <rect width="10.014" height="10.017" x="0.84" y="12.68" fill={fill} rx="2" />
      <rect width="10.014" height="10.017" x="12.826" y="12.68" fill={fill} rx="2" />
    </svg>
  );
}
