import gitHubIcon from '../../assets/icons/github.svg';
import rsSchoolLogo from '../../assets/icons/rs_school_logo.svg';
import firstUserPic from '../../assets/img/teammate_pic_1.jpg';
import secondUserPic from '../../assets/img/teammate_pic_2.jpg';
import thirdUserPic from '../../assets/img/teammate_pic_3.jpg';
import PageBackBtn from '../../features/PageBackBtn/PageBackBtn';

export default function AboutUs() {
  return (
    <div className="bg-[url('./src/assets/img/about_bg_mob.svg')] bg-cover bg-no-repeat">
      <div className="mx-auto my-12 p-5 sm:mt-[5.6rem] xl:px-24">
        <div className="flex flex-wrap items-center justify-between gap-10">
          <PageBackBtn title="About us" />
          <a
            className="ml-auto rounded-md border-2 border-primary p-1 dark:bg-separation-line"
            href="https://rs.school/"
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
              <div className="relative -translate-y-24 rounded-3xl border-1 border-separation-line bg-primary px-4 py-6 text-text-grey dark:bg-dark-bg-primary xl:max-w-[420px] xl:-translate-y-[245px] xl:translate-x-[360px]">
                <a
                  className="absolute right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-separation-line"
                  href="https://github.com/"
                >
                  <img className="h-6 w-6" src={gitHubIcon} alt="" />
                </a>
                <h5 className="font-base text-[20px] leading-8 text-text-dark dark:text-primary">Jordan Walke</h5>
                <p>Frontend Developer</p>
                <h6 className="mt-6 text-text-dark dark:text-primary">Bio</h6>
                <p className="mt-2">My passion is to create web applications</p>
                <h6 className="mt-6  text-text-dark dark:text-primary">Contributions</h6>
                <p className="mt-2">Create all the user interface and play active role in the project architecture.</p>
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
              <div className="relative -translate-y-24 rounded-3xl border-1 border-separation-line bg-primary px-4 py-6 text-text-grey dark:bg-dark-bg-primary xl:max-w-[420px] xl:-translate-x-[200px] xl:-translate-y-[255px]">
                <a
                  className="absolute right-4 flex h-10 w-10 translate-y-2 items-center  justify-center rounded-full bg-separation-line"
                  href="https://github.com/"
                >
                  <img className="h-6 w-6" src={gitHubIcon} alt="" />
                </a>
                <h5 className="font-base text-[20px] leading-8 text-text-dark dark:text-primary">Karoline Clarck</h5>
                <p>UX/UX Designer</p>
                <h6 className="mt-6 text-text-dark dark:text-primary">Bio</h6>
                <p className="mt-2">I enjoy building pleasure design systems</p>
                <h6 className="mt-6  text-text-dark dark:text-primary">Contributions</h6>
                <p className="mt-2">
                  Designed all the UI and UX.
                  <br />
                  <br />
                  Contact and communication support with the customer.
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
              <div className="relative -translate-y-24 rounded-3xl border-2 border-separation-line bg-primary px-4 py-6 text-text-grey dark:bg-dark-bg-primary xl:max-w-[420px] xl:-translate-y-[250px] xl:translate-x-[360px]">
                <a
                  className="absolute right-4 flex h-10 w-10 translate-y-2 items-center  justify-center rounded-full bg-separation-line"
                  href="https://github.com/"
                >
                  <img className="h-6 w-6" src={gitHubIcon} alt="" />
                </a>
                <h5 className="font-base text-[20px] leading-8 text-text-dark dark:text-primary">Markus Blacke</h5>
                <p>Backend Developer</p>
                <h6 className="mt-6 text-text-dark dark:text-primary">Bio</h6>
                <p className="mt-2">I love algorythms and data bases!</p>
                <h6 className="mt-6  text-text-dark dark:text-primary">Contributions</h6>
                <p className="mt-2">
                  Played a big role in the project architecture.
                  <br />
                  <br />
                  Created all the api needed to build the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
