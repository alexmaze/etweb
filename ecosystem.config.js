module.exports = {
  apps: [
    {
      name: "etweb-main",
      script: "dist/main.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 4,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "root",
      host: "47.99.63.21",
      key: "~/.ssh/id_rsa",
      ref: "origin/master",
      repo: "git@github.com:yanhao1991/etweb.git",
      path: "/var/www/etweb",
      "pre-setup": "git reset --hard HEAD",
      "post-deploy":
        "yarn && ln -sf /root/configs/etweb.json ./config/production.json && npm run prestart:prod && pm2 reload ecosystem.config.js --env production"
    }
  }
}
