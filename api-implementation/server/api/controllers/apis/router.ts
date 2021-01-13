import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.all)
  .get('/:name', controller.byName)
  .put('/:name', controller.create)
  .patch('/:name', controller.update)
  .delete('/:name', controller.delete);
