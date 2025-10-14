import Hero from '../Hero';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function HeroExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <Hero />
    </I18nextProvider>
  );
}
