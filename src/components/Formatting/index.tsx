export const formatPhoneNumber = (
  phoneNumberString?: string | null
): string => {
  if (!phoneNumberString) return '';
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumberString;
};

export const formatNumber = (num?: number | null): string => {
  return num ? num.toLocaleString('en-US') : '0';
};

export const capitalize = (str: string): string =>
  str[0]?.toUpperCase() + str.slice(1).toLowerCase();

export const unCamelCase = (str: string): string =>
  str.replace(/([A-Z]|\d)/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });

export const unScreamingSnakeCase = (str: string): string =>
  str.split('_').map(capitalize).join(' ');

export const colorFromHueRange = (
  {
    from,
    to,
    saturation = 100,
    lightness = 40,
  }: {
    from: number;
    to: number;
    saturation?: number;
    lightness?: number;
  },
  value: number
): string => {
  let hue: number;
  if (from < to) {
    hue = from + value * (to - from);
  } else {
    hue = from - value * (from - to);
  }
  const distanceFromGreen = Math.abs(180 - ((hue + 60) % 360)); // For correcting eye sensitivity to green
  return `hsl(${hue}, ${saturation}%, ${lightness + distanceFromGreen / 18}%)`;
};
