export interface HeaderLinkProps {
  kind: 'internal' | 'external';
  href: string;
  text: string;
}

export const headerLinks: HeaderLinkProps[] = [
  {
    kind: 'internal',
    href: '/',
    text: 'пары',
  },
  {
    kind: 'internal',
    href: '/bells',
    text: 'звонки',
  },
  {
    kind: 'external',
    href: 'https://xn--j1al4b.xn--p1ai/',
    text: 'колледж',
  },
  {
    kind: 'external',
    href: 'https://vk.com/rcenext',
    text: 'vk',
  },
  {
    kind: 'external',
    href: 'https://github.com/iswebdevru/rce-schedule-client',
    text: 'GitHub',
  },
];

export const groupSearch = 'rce/group';
export const isBetaBannerHidden = 'beta-banner';
