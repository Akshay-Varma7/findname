#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/ee47903476d7cedd27a5e9f1a663947e185196498bfa8d9fdb9d574e9f969203/contract';
import startContract from '../../snapshots/ee47903476d7cedd27a5e9f1a663947e185196498bfa8d9fdb9d574e9f969203/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f7677f92644c349b7c8638ec4ca9b6108c4aeebd28d7715c2e1e2289a6a24279/contract';
import endContract from '../../snapshots/f7677f92644c349b7c8638ec4ca9b6108c4aeebd28d7715c2e1e2289a6a24279/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Habbit',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
