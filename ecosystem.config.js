module.exports = {
  apps: [
    {
      name: 'object-press',
      script: 'node dist/main',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
