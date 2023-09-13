import { Link } from 'react-router-dom';

import keanu from '../../assets/img/Sad_Keanu.png';

function ErrorPage() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center font-poppins">
      <div className="w-40 object-contain sm:w-64">
        <img src={keanu} alt="sad Keanu Reeves sitting on a bench" />
      </div>
      <h5 className="mt-3 text-2xl font-bold text-text-grey">404 error</h5>
      <p className="mt-3 text-center text-text-grey">
        Sorry, there is no such page for now, or it has never existed... <br />
        Maybe, you want to check out our main page?
      </p>
      <Link to="/" className="mt-2 text-xl font-bold text-accent">
        Main page
      </Link>
    </div>
  );
}

export default ErrorPage;
