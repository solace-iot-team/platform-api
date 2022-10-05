import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.all)
  .post('/', controller.import)
  .get('/:name', controller.byName)
  .patch('/:name', controller.update)
  .delete('/:name', controller.delete)
  .get('/:name/revisions', controller.allRevisions)
  ;
