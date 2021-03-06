import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      record: Model,
    },

    seeds(server) {
      server.create('record', {
        id: '1',
        isComing: '',
        people: ['Johnny', 'Jane'],
        canBringPlusOne: false,
        askChildren: true,
        multipleChildren: false,
        plusOne: false,
        requiresAccommodation: '',
        hasSpecialDietaryNeeds: '',
        specialDietaryNeedsDesc: '',
        children: '',
        message: '',
      });
      server.create('record', { id: '2', name: 'Alice' });
    },

    routes() {
      this.urlPrefix = process.env.REACT_APP_BACKEND_URL;

      this.get('/record/:recordId', (schema, request) => {
        const record = schema.findBy('record', { id: request.params.recordId });

        if (!record) {
          console.log('[mirage] no record found', record);
          return new Response(404, {}, { error: 'NOT_FOUND' });
        }

        console.log('[mirage] found record', record);

        return record.attrs;
      });

      this.patch('/record/:recordId', (schema, request) => {
        const record = schema.findBy('record', { id: request.params.recordId });

        if (!record) {
          console.log('[mirage] no record found', record);
          return new Response(404, {}, { error: 'NOT_FOUND' });
        }

        const body = JSON.parse(request.requestBody);

        console.log('[mirage] sent body', body);

        return {
          ...record.attrs,
          ...body,
        };
      });
    },
  });

  return server;
}
