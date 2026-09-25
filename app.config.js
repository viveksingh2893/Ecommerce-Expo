// Dynamic Expo config — extends the static app.json with env-aware values.
// This file takes priority over app.json.
// Run: cp .env.example .env  then fill in values.

/** @type {import('expo/config').ExpoConfig} */
module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiUrl: process.env.API_URL ?? 'https://api.example.com',
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? '',
    },
  },
});
