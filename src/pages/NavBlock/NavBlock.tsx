import UserProfileLink from '../../features/UserProfileLink/UserProfileLink';
import NavMenu from '../../widgets/NavMenu/NavMenu';

function NavBlock() {
  return (
    <div
      className="
        fixed
        bottom-0 
        h-14
        w-full
        bg-separation-line
        md:col-start-1
        md:col-end-2
        md:row-start-2
        md:row-end-3
        md:h-full
        md:w-44
        md:border-r-2
        md:border-separation-line
        md:bg-opacity-0
        lg:w-[22rem]
      "
    >
      <UserProfileLink isHeader={false} />
      <NavMenu />
    </div>
  );
}

export default NavBlock;
