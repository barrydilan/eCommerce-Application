// import { useEffect, useState } from 'react';

// import { useFormik } from 'formik';
// import { motion } from 'framer-motion';
// import * as Yup from 'yup';

// import lockIcon from '../../../assets/icons/LockIcon.svg';
// import lockIconRed from '../../../assets/icons/LockIconRed.svg';
// import { validPassword } from '../../../shared/const/validationSchemas';
// import { ErrorMessage, inputAnimation, svgAnimation } from '../../../shared/ui';
// import { UserData } from '../types/profilePageTypes';

// const validationSchema = Yup.object({
//   currPass: validPassword().password,
//   newPass: validPassword().password,
// });

// export default function ChangePassword(props: {
//   userData: UserData;
//   accessToken: string | undefined;
//   getUser: (_id: string) => void;
// }) {
//   const { userData, accessToken, getUser } = props;
//   const { id } = userData;
//   const [isNewPassBlocked, setIsNewPassBlocked] = useState(true);
//   const [isSaveBlocked, setIsSaveBlocked] = useState(true);

//   const formik = useFormik({
//     initialValues: {
//       currPass: '',
//       newPass: '',
//     },
//     validationSchema,
//     onSubmit: () => {},
//   });

//   const { handleChange, handleBlur, errors, touched, values } = formik;
//   const touchedAndErrorCurrPassword = touched.currPass && errors.currPass;
//   const touchedAndErrorNewPassword = touched.newPass && errors.newPass;

//   useEffect(() => {
//     // if (values.currPass === currPassword) setIsNewPassBlocked(false);
//     // if (errors.newPass || touched.newPass === undefined) {
//     //   setIsSaveBlocked(true);
//     //   return;
//     // }
//     // setIsSaveBlocked(false);
//   }, [values, errors, touched, setIsNewPassBlocked, setIsSaveBlocked]);

//   return (
//     <div>
//       <h4 className="mx-auto mt-12 w-full text-center text-base font-medium">Password</h4>
//       <div className="profileInputWrapper">
//         <div className="text-base font-medium">Current password</div>
//         <label htmlFor="currPass" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
//           <motion.input
//             initial={inputAnimation.initial}
//             animate={inputAnimation.animate}
//             transition={{ ...inputAnimation.transition, delay: 0.05 }}
//             id="currPass"
//             type="text"
//             name="currPass"
//             placeholder="Password"
//             className={`loginRegInput ${touchedAndErrorCurrPassword ? 'border-shop-cart-red' : ''}`}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             disabled={!isNewPassBlocked}
//             value={values.currPass}
//           />
//           <motion.img
//             initial={svgAnimation.initial}
//             animate={svgAnimation.animate}
//             transition={{ ...svgAnimation.transition, delay: 0.25 }}
//             className="invalidInputIcon"
//             src={touchedAndErrorCurrPassword ? lockIconRed : lockIcon}
//             alt=""
//           />
//           {touchedAndErrorCurrPassword && <ErrorMessage>{errors.currPass}</ErrorMessage>}
//         </label>
//       </div>
//       <div className="profileInputWrapper">
//         <div className={`text-base font-medium ${isNewPassBlocked ? 'text-text-grey' : 'text-text-dark'}`}>
//           New password
//         </div>
//         <label htmlFor="newPass" className="loginRegLabel mt-5 sm:mt-0 sm:w-[470px]">
//           <motion.input
//             initial={inputAnimation.initial}
//             animate={inputAnimation.animate}
//             transition={{ ...inputAnimation.transition, delay: 0.05 }}
//             id="newPass"
//             type="text"
//             name="newPass"
//             placeholder="Password"
//             className={`loginRegInput ${touchedAndErrorNewPassword ? 'border-shop-cart-red' : ''}`}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             disabled={isNewPassBlocked}
//             value={values.newPass}
//           />
//           <motion.img
//             initial={svgAnimation.initial}
//             animate={svgAnimation.animate}
//             transition={{ ...svgAnimation.transition, delay: 0.25 }}
//             className="invalidInputIcon"
//             src={touchedAndErrorNewPassword ? lockIconRed : lockIcon}
//             alt=""
//           />
//           {touchedAndErrorNewPassword && <ErrorMessage>{errors.newPass}</ErrorMessage>}
//         </label>
//       </div>
//       <button
//         className="mt-5 h-10 w-full rounded-md bg-accent-lightest text-center text-accent transition-all duration-300 disabled:bg-separation-line disabled:text-text-grey"
//         type="button"
//         disabled={isSaveBlocked}
//       >
//         Save
//       </button>
//     </div>
//   );
// }
