import Button from '../../shared/Button';
import Input from '../../shared/Input';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function SignIn() {
  function handleClick() {
    console.log('btn clicked');
  }

  return (
    <section className="fixed inset-0 bg-modal-overlay bg-opacity-20">
      <form
        className="
      absolute inset-0 mx-auto my-auto flex max-h-3/4 max-w-sm flex-col items-center justify-center gap-4 rounded-md bg-modal-bg p-4 shadow-md sm:max-w-md md:max-w-md
      lg:max-w-lg xl:max-w-xl"
      >
        <div className="p-10">
          <p className="text-3xl font-bold">Join Us!</p>
        </div>
        <Input id="name" label="Name" disabled={false} type="text" />
        <Input id="surname" label="Surname" disabled={false} type="text" />
        <Input id="email" label="Email" disabled={false} type="text" />
        <Input id="password" label="Password" disabled={false} type="password" />
        <div className="mt-10 w-full">
          <Button label="Sign Up" outline disabled={false} onClick={() => handleClick()} />
        </div>
      </form>
    </section>
  );
}
