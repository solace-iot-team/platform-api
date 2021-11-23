import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.all)
  .post('/', controller.import)
  .get('/:name', controller.byName)
  .get('/:name/info', controller.infoByName)
  .get('/:name/apiProducts', controller.apiProductsByName)
  .put('/:name', controller.create)
  .patch('/:name', controller.update)
  .delete('/:name', controller.delete);
