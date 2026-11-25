#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3c40770dc17edff8c8504e74c499c157d1cdacda8250a8941dd958eda2ecf9a4/contract';
import endContract from '../../snapshots/3c40770dc17edff8c8504e74c499c157d1cdacda8250a8941dd958eda2ecf9a4/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f7677f92644c349b7c8638ec4ca9b6108c4aeebd28d7715c2e1e2289a6a24279/contract';
import startContract from '../../snapshots/f7677f92644c349b7c8638ec4ca9b6108c4aeebd28d7715c2e1e2289a6a24279/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'SharedHabbit',
        columns: [
          col('create_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('habbit_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('user_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SharedHabbit',
        index: 'SharedHabbit_habbit_id_idx_05f1169b',
        columns: ['habbit_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SharedHabbit',
        index: 'SharedHabbit_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SharedHabbit',
        foreignKey: {
          name: 'SharedHabbit_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SharedHabbit',
        foreignKey: {
          name: 'SharedHabbit_habbit_id_fkey',
          columns: ['habbit_id'],
          references: { schema: 'public', table: 'Habbit', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
