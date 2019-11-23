module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || 'packlist',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  synchronize: true,
  logging: ['error'],
  entities: ['dist/entities/*.js'],
};
