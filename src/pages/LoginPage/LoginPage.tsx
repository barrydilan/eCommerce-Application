import { Link } from 'react-router-dom';

function validate(target: EventTarget, inputType: string) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
  const regex = inputType === 'email' ? emailRegex : passwordRegex;
  const { value } = target as HTMLInputElement;
  (target as HTMLInputElement).value = value.trim();
  if (value.length === 0) {
    (target as HTMLObjectElement).setCustomValidity(`Field ${inputType === 'email' ? 'email' : 'password'} required.`);
    return;
  }

  if (regex.test(value)) {
    (target as HTMLObjectElement).setCustomValidity('');
  } else {
    (target as HTMLObjectElement).setCustomValidity(
      `Invalid ${inputType === 'email' ? 'email address' : 'password'} format`,
    );
  }
}

function togglePassVisibility() {
  const passInput = document.querySelector('#passLogInput');
  if (passInput && (passInput as HTMLInputElement).type === 'password') {
    (passInput as HTMLInputElement).type = 'text';
  } else {
    (passInput as HTMLInputElement).type = 'password';
  }
}

function LoginPage() {
  return (
    <div
      className="
    flex 
    h-full 
    w-full 
    items-center 
    justify-center 
    font-poppins 
  "
    >
      <form
        action=""
        className="
      min-w-78 
      ml-3 
      mr-3 
      box-border 
      w-128 
      rounded-3xl 
      border-2 
      border-separation-line 
      pb-2 
      pl-4 
      pr-4 
      pt-2
    "
      >
        <h5
          className="
        text-2xl 
        text-text-dark
        "
        >
          Log in
        </h5>
        <h6
          className="
        text-base 
        text-text-grey
        "
        >
          Welcome back!
        </h6>
        <label htmlFor="emailLogInput" className="loginRegLabel">
          <input
            id="emailLogInput"
            type="email"
            placeholder="Email"
            onFocus={(e) => validate(e.target, 'email')}
            onInput={(e) => validate(e.target, 'email')}
            className="loginRegInput peer"
          />
          <div
            className="
          invalidInputIcon
          bg-emailIcon
          peer-invalid:bg-emailIconRed 
        "
          />
          <p className="invalidInputMsg">Enter valid email</p>
        </label>
        <label htmlFor="passLogInput" className="loginRegLabel">
          <input
            id="passLogInput"
            type="password"
            placeholder="Password"
            onFocus={(e) => validate(e.target, 'pass')}
            onInput={(e) => validate(e.target, 'pass')}
            className="loginRegInput peer"
          />
          <div
            className="
          invalidInputIcon
          bg-lockIcon
          peer-invalid:bg-lockIconRed 
        "
          />
          <p className="invalidInputMsg">Enter valid password</p>
        </label>
        <div
          className="
        mt-2
        flex
        h-8
        w-full
        items-center
        justify-center
      "
        >
          <input
            id="passToggler"
            type="checkbox"
            onClick={() => togglePassVisibility()}
            className="
            peer/passToggler
            mr-2
            h-5
            w-5
            appearance-none
            rounded-md
            bg-accent
          "
          />
          <label
            htmlFor="passToggler"
            className="
            relative
            text-xs
            before:absolute
            before:-left-6
            before:top-0.5
            before:hidden
            before:h-2
            before:w-3
            before:-rotate-45
            before:rounded-sm
            before:border-b-4
            before:border-l-4
            before:border-b-primary
            before:border-l-primary
            peer-checked/passToggler:before:block
          "
          >
            Show password
          </label>
        </div>
        <button
          type="submit"
          className="
        mt-3 
        h-8 
        w-full 
        rounded-md 
        bg-accent 
        text-base 
        text-primary
        "
        >
          Log in
        </button>
        <p
          className="
        mb-6 
        mt-6 
        w-full 
        text-center 
        text-xs
        "
        >
          Don&apos;t have an account yet?{' '}
          <Link
            className="
          font-bold
           text-accent"
            to="/registration"
          >
            Sing up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
