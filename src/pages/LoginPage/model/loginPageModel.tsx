import * as Yup from 'yup';

const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&~()_+\-=':"}{/?<>;,.\]\\[*]).{8,}$/;

export const validationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegEx, { message: 'Email must be email@example.com', excludeEmptyString: true })
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols required')
    .matches(passwordRegex, { message: 'Password must have A, a, 1 and special symbols', excludeEmptyString: true })
    .required('Password is required'),
});

export function togglePassVisibility(target: HTMLInputElement | null) {
  if (target) {
    if (target.type === 'password') {
      (target as HTMLInputElement).type = 'text';
    } else {
      (target as HTMLInputElement).type = 'password';
    }
  }
}
