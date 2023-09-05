export default function InfoModal(props: { msgModalShown: boolean; msgModalText: string }) {
  const { msgModalShown, msgModalText } = props;
  return (
    <div
      className={`
          absolute 
          left-[50%] 
          top-[50%] 
          z-50
          flex
          h-20 
          w-60 
          -translate-x-1/2
          items-center
          justify-center
          rounded-md
          border-2
          border-separation-line
          bg-primary
          px-2
          text-center
          font-medium
          transition-all
          duration-500
          ${msgModalShown ? '-translate-y-1/2 opacity-100' : 'translate-y-0 opacity-0'}
        `}
    >
      {msgModalText}
    </div>
  );
}
