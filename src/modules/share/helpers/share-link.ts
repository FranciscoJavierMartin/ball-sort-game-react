import successMessage from './success-message';

export default function shareLink(data: ShareData): void {
  navigator
    .share(data)
    .then(() => successMessage())
    .catch(console.log);
}
