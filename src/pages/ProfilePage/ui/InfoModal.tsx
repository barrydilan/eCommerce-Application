export default function InfoModal(props: { msgModalShown: boolean; msgModalText: string }) {
  const { msgModalShown, msgModalText } = props;
  return (
    <div
      className={`
          absolute 
          left-[50%] 
          top-[50%] 
          z-20
          h-20
          w-60 
          -translate-x-1/2 
          rounded-md
          border-2
          border-separation-line
          bg-primary
          text-center
          font-medium
          leading-[75px]
          transition-all
          duration-500
          ${msgModalShown ? '-translate-y-1/2 opacity-100' : 'translate-y-0 opacity-0'}
        `}
    >
      {msgModalText}
    </div>
  );
}
