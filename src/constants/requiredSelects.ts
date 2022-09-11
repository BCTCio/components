import { error } from 'src/components/Notification';

/**
 * Checks all select/search inputs that are required and if they are, returns and shows an error
 * @param e The form submit event
 */
export const checkRequiredSelects = (e: any, throwIfUnsuccessful = false) => {
  const requiredButEmptyLabels = Array.from(e.target.elements as HTMLElement[])
    .filter(
      element =>
        element.hasAttribute('data-custom-input-required') &&
        !element.hasAttribute('data-custom-input-has-data')
    )
    .map(input => input.getAttribute('data-custom-input-label'));
  if (requiredButEmptyLabels.length) {
    let message = '';
    const withLabels = requiredButEmptyLabels.filter(Boolean);
    if (withLabels.length) {
      message = `You still have to fill out the field${
        withLabels.length === 1 ? '' : 's'
      } ${
        withLabels.length < 3
          ? withLabels.join(' and ')
          : withLabels.slice(0, withLabels.length - 2).join(', ') +
            ', and ' +
            withLabels[withLabels.length - 1]
      }!`;
      if (requiredButEmptyLabels.length !== withLabels.length) {
        message += ` (And ${requiredButEmptyLabels.length -
          withLabels.length} others)`;
      }
    } else {
      message = `You still have to fill in ${requiredButEmptyLabels.length} required fields!`;
    }
    if (throwIfUnsuccessful) throw new Error(message);
    error(message, { title: 'Error' });
    return true;
  }
  return false;
};
