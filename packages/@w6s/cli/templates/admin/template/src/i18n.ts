import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const context = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i,
  );
  const messages: LocaleMessages = {};
  context.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = context(key);
    }
  });
  return { context, messages };
}

const { context, messages } = loadLocaleMessages();

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages,
});

if (module.hot) {
  module.hot.accept(context.id, () => {
    /* eslint no-shadow:0 */
    const { messages } = loadLocaleMessages();
    Object.keys(messages).forEach((locale) =>
      i18n.setLocaleMessage(locale, messages[locale]));
  });
}

export default i18n;
