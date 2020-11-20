export = {
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT || 5432,
    synchronize: true,
    entities: [
        '../**/src/**/entities/**.ts',
    ],
    migrations: [
        '../**/migrations/**.ts',
    ],
    cli: {
        migrationsDir: 'migrations',
    },
    migrationsRun: false,
    logging: true,
}
