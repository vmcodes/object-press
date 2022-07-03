module.exports = {
  apps: [
    {
      name: 'object-press',
      script: 'node dist/main',
      instances: 1,
      out_file: '/dev/null',
      error_file: '/dev/null',
      cron_restart: '0 0 * * *',
    },
  ],
};
