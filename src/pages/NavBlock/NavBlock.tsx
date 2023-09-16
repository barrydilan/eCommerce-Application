import UserProfileLink from '../../features/UserProfileLink/UserProfileLink';
import NavMenu from '../../widgets/NavMenu/NavMenu';

function NavBlock() {
  return (
    <div
      className="
        fixed
        bottom-0 
        z-20
        h-fit
        w-full
        dark:bg-dark-separation-line
        lg:col-start-1
        lg:col-end-2
        lg:row-start-2
        lg:row-end-3
        lg:h-full
        lg:w-44
        lg:border-r-2
        lg:border-separation-line
        lg:bg-primary
        lg:dark:border-dark-separation-line
        lg:dark:bg-dark-bg-primary
        xl:w-[22rem]
      "
    >
      <UserProfileLink isHeader={false} />
      <NavMenu />
    </div>
  );
}

export default NavBlock;
