const env = process.env.NODE_ENV ?? 'local';
const config = require(`./config/${env}.ts`);

export default config;