import gitHubIcon from '../../assets/icons/github.svg';
import rsSchoolLogo from '../../assets/icons/rs_school_logo.svg';
import firstUserPic from '../../assets/img/Bogdan.jpg';
import secondUserPic from '../../assets/img/Harry.jpg';
import thirdUserPic from '../../assets/img/Oleksii.jpg';
import PageBackBtn from '../../features/PageBackBtn/PageBackBtn';

export default function AboutUs() {
  return (
    <div className="bg-aboutMob bg-cover bg-no-repeat">
      <div className="mx-auto mt-12 p-5 sm:mt-[5.6rem] xl:px-24">
        <div className="flex flex-wrap items-center justify-between gap-10">
          <PageBackBtn title="About us" />
          <a
            target="_blank"
            className="ml-auto rounded-md border-2 border-primary p-2 dark:bg-separation-line"
            href="https://rs.school/"
            rel="noreferrer"
          >
            <img src={rsSchoolLogo} alt="" />
          </a>
        </div>
        <div>
          <div className="mt-6">
            <h5 className="text-[20px] font-medium text-text-dark dark:text-primary">Collaboration</h5>
            <p className="mt-5 max-w-[830px] font-medium text-text-grey">
              Our team&apos;s success was the result of effective collaboration. <br />
              <br /> We held bi-daily &ldquo;meat-ups&rdquo; on messenger to discuss the project, plan collectively, and
              assign tasks to each member. This regular communication and clear task division kept us aligned,
              motivated, and ensured a successful project outcome!
            </p>
            <h5 className="mt-6 text-[20px] font-medium text-text-dark dark:text-primary">Team members</h5>
          </div>
          <div className="flex flex-col items-center xl:block">
            <div className="relative mt-6 max-w-[570px]">
              <div>
                <img
                  className="rounded-3xl border-2 border-separation-line shadow-[3px_5px_10px_1px_rgba(0,0,0,0.3)]"
                  src={firstUserPic}
                  alt=""
                />
              </div>
              <div className="relative -translate-y-24 rounded-3xl border-1 border-separation-line bg-primary px-4 py-6 text-text-grey shadow-[3px_5px_10px_1px_rgba(0,0,0,0.3)] dark:bg-dark-bg-primary xl:max-w-[420px] xl:-translate-y-[245px] xl:translate-x-[360px]">
                <a
                  target="_blank"
                  className="absolute right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-separation-line"
                  href="https://github.com/Quiddlee"
                  rel="noreferrer"
                >
                  <img className="h-6 w-6" src={gitHubIcon} alt="" />
                </a>
                <h5 className="font-base mr-12 text-[20px] leading-8 text-text-dark dark:text-primary">
                  Bohdan Shcherbyna
                </h5>
                <p className="mr-12">Frontend Developer | Team lead</p>
                <h6 className="mt-6 text-text-dark dark:text-primary">Bio</h6>
                <p className="mt-2">
                  I enjoy implementing aesthetically pleasing interfaces, and to pay extra attention to details such as
                  animations or UX.
                </p>
                <h6 className="mt-6  text-text-dark dark:text-primary">Contributions</h6>
                <p className="mt-2">
                  Managing the global state of the app, Working with API, UI/UX design, Maintaining the project&apos;s
                  vision.
                </p>
              </div>
            </div>
            <div className="relative -mt-[60px] max-w-[570px] xl:ml-auto">
              <div>
                <img
                  className="rounded-3xl border-1 border-separation-line shadow-[3px_5px_10px_1px_rgba(0,0,0,0.3)]"
                  src={secondUserPic}
                  alt=""
                />
              </div>
              <div className="relative -translate-y-24 rounded-3xl border-1 border-separation-line bg-primary px-4 py-6 text-text-grey shadow-[3px_5px_10px_1px_rgba(0,0,0,0.3)] dark:bg-dark-bg-primary xl:max-w-[420px] xl:-translate-x-[200px] xl:-translate-y-[255px]">
                <a
                  target="_blank"
                  className="absolute right-4 flex h-10 w-10 translate-y-2 items-center  justify-center rounded-full bg-separation-line"
                  href="https://github.com/barrydilan"
                  rel="noreferrer"
                >
                  <img className="h-6 w-6" src={gitHubIcon} alt="" />
                </a>
                <h5 className="font-base text-[20px] leading-8 text-text-dark dark:text-primary">Harry Holubiev</h5>
                <p>Frontend Developer</p>
                <h6 className="mt-6 text-text-dark dark:text-primary">Bio</h6>
                <p className="mt-2">
                  Designing and implementing contemporary and user-friendly web-applications is my passion.
                </p>
                <h6 className="mt-6  text-text-dark dark:text-primary">Contributions</h6>
                <p className="mt-2">
                  Designed Product Card, Product Page, Logo and animations, implemented some features in Cart component.
                </p>
              </div>
            </div>
            <div className="relative -mt-[60px] max-w-[570px]">
              <div>
                <img
                  className="rounded-3xl border-1 border-separation-line shadow-[3px_5px_10px_1px_rgba(0,0,0,0.3)]"
                  src={thirdUserPic}
                  alt=""
                />
              </div>
              <div className="relative -translate-y-24 rounded-3xl border-2 border-separation-line bg-primary px-4 py-6 text-text-grey shadow-[3px_5px_10px_1px_rgba(0,0,0,0.3)] dark:bg-dark-bg-primary xl:max-w-[420px] xl:-translate-y-[250px] xl:translate-x-[360px]">
                <a
                  target="_blank"
                  className="absolute right-4 flex h-10 w-10 translate-y-2 items-center  justify-center rounded-full bg-separation-line"
                  href="https://github.com/Tedzury"
                  rel="noreferrer"
                >
                  <img className="h-6 w-6" src={gitHubIcon} alt="" />
                </a>
                <h5 className="font-base text-[20px] leading-8 text-text-dark dark:text-primary">Oleksii Drohachov</h5>
                <p>Frontend Developer</p>
                <h6 className="mt-6 text-text-dark dark:text-primary">Bio</h6>
                <p className="mt-2">Switcher from medical field. The old man. :)</p>
                <h6 className="mt-6  text-text-dark dark:text-primary">Contributions</h6>
                <p className="mt-2">
                  Team multitool. Set up initial repository. Implemented most of layout and front end logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
