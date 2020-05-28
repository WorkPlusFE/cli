// https://github.com/getsentry/sentry-javascript/tree/master/packages/browser
import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: '__DSN__',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
});
