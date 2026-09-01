import pluginHubPreview from '../assets/dsh-plugin-hub-preview.png';
import paxPreview from '../assets/paxtech-preview.png';
import roundtablePreview from '../assets/roundtable-preview.png';

export const FEATURED_PROJECTS = [
  {
    name: 'Pax Tech',
    url: 'https://paxtech.net',
    image: paxPreview,
    descKey: 'projects.pax.desc',
  },
  {
    name: 'DSH Plugin Hub',
    url: 'https://dshpluginhub.ai',
    image: pluginHubPreview,
    descKey: 'projects.pluginHub.desc',
  },
  {
    name: 'Roundtable',
    url: 'https://roundtable.toddzheng.com',
    image: roundtablePreview,
    descKey: 'projects.roundtable.desc',
  },
] as const;
