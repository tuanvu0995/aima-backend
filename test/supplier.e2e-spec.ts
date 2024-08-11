import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createTestServer } from './setup-test';

describe('Supplier Module', () => {
  let app: INestApplication;
  let token: string;
  let supplierId: number;

  beforeAll(async () => {
    app = await createTestServer([AppModule]);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: 'password',
      })
      .expect(201);

    token = response.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/suppliers (CREATE)', () => {
    const supplier = {
      name: 'Supplier 1',
      code: 'SUP1',
      address: 'Address 1',
    };
    return request(app.getHttpServer())
      .post('/suppliers')
      .send(supplier)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .then((response) => {
        supplierId = response.body.id;
        expect(response.body.name).toBe(supplier.name);
        expect(response.body.code).toBe(supplier.code);
        expect(response.body.address).toBe(supplier.address);
      });
  });

  it('/suppliers (CREATE) - Validation Error', () => {
    const supplier = {
      name: 'Supplier 1',
    };
    return request(app.getHttpServer())
      .post('/suppliers')
      .send(supplier)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual([
          'code must be a string',
          'address must be a string',
        ]);
      });
  });

  it('/suppliers (GET)', () => {
    return request(app.getHttpServer())
      .get('/suppliers')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/suppliers/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/suppliers/' + supplierId)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/suppliers/:id (GET) - Not Found', () => {
    return request(app.getHttpServer())
      .get('/suppliers/123244')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });

  it('/suppliers/:id (UPDATE)', () => {
    const supplier = {
      name: 'Supplier 1 Updated',
      code: 'SUP1',
      address: 'Address 1',
    };
    return request(app.getHttpServer())
      .patch('/suppliers/' + supplierId)
      .set('Authorization', `Bearer ${token}`)
      .send(supplier)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe(supplier.name);
        expect(response.body.code).toBe(supplier.code);
        expect(response.body.address).toBe(supplier.address);
      });
  });

  it('/suppliers/:id (UPDATE) - Not found', () => {
    const supplier = {
      name: 'Supplier 1 Updated',
      code: 'SUP1',
      address: 'Address 1',
    };
    return request(app.getHttpServer())
      .patch('/suppliers/999999')
      .set('Authorization', `Bearer ${token}`)
      .send(supplier)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual('Supplier not found');
      });
  });

  it('/suppliers/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/suppliers/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.deleted).toBe(true);
      });
  });

  it('/suppliers/:id/restore (POST)', () => {
    return request(app.getHttpServer())
      .post('/suppliers/1/restore')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .then((response) => {
        expect(response.body.restored).toBe(true);
      });
  });
});
