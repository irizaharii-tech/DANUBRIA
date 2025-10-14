import EuropeMap from '../EuropeMap';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function EuropeMapExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <EuropeMap />
    </I18nextProvider>
  );
}
