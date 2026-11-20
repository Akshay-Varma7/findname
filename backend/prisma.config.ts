import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';//datasource->postgress

export default definePrismaConfig({
  orm: ormConfig({
    //client
    contract: "./prisma/schema.prisma",//about contract.d.ts and .json
    db: {
      connection: process.env['DATABASE_URL']!,//string
    },
  }),
});
//migration defaults to project root or prisma.config.ts