export default function togglePassVisibility(target: HTMLInputElement | null) {
  if (target) {
    if (target.type === 'password') {
      (target as HTMLInputElement).type = 'text';
    } else {
      (target as HTMLInputElement).type = 'password';
    }
  }
}
