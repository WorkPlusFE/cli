// https://github.com/getsentry/sentry-javascript/tree/master/packages/browser
import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'http://3208967b85d74cc4b70651e9a62705d5@121.40.128.155:8080/15',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
});
