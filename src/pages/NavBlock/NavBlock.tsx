import { Link } from 'react-router-dom';
import userPic from '../../assets/img/UserImg.jpg';
import NavMenu from '../../widgets/NavMenu/NavMenu';

function NavBlock() {
  return (
    <div
      className="
        relative 
        h-14
        bg-separation-line
        md:col-start-1
        md:col-end-2
        md:row-start-2
        md:row-end-3
        md:h-full
        md:w-full
        md:border-r-4
        md:border-separation-line
        md:bg-opacity-0
      "
    >
      <Link
        to="/profile"
        className="
          hidden 
          w-full 
          justify-center 
          gap-3 
          text-text-grey 
          md:mt-6 
          md:flex 
          md:flex-col 
          md:items-center 
          lg:mt-12 
          lg:flex-row"
      >
        <img
          src={userPic}
          alt="user avatar"
          className="
            w-12 
            rounded-xl"
        />
        <div>
          <h5
            className="
            w-40 
            overflow-hidden 
            text-ellipsis 
            text-xl 
            font-light 
            md:text-center 
            lg:w-full 
            lg:text-start"
          >
            Vasisualii Lokhankin
          </h5>
          <h6
            className="
            text-lg 
            font-light 
            md:text-center 
            lg:text-start"
          >
            Good morning !
          </h6>
        </div>
      </Link>
      <NavMenu />
    </div>
  );
}

export default NavBlock;
