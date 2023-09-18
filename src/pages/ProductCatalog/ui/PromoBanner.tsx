export default function PromoBanner() {
  return (
    <div className="mx-auto mt-5 flex flex-wrap items-center gap-3 rounded-md border-2 border-separation-line p-2 text-lg font-medium dark:text-primary xs:p-5">
      <div className="mr-6 select-none">
        <h5>Today is the opening day!</h5>
        <p>Get promo for a 15% discount:</p>
      </div>
      <p className="mx-auto w-[max-content] rounded-md border-2 border-accent px-3 py-2 text-center font-bold text-accent">
        myLovelyPromoCode
      </p>
    </div>
  );
}
