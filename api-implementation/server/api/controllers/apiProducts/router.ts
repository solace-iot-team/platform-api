import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.all)
  .get('/:name', controller.byName)
  .post('/', controller.create)
  .patch('/:name', controller.update)
  .delete('/:name', controller.delete)
  .get('/:name/apps', controller.appsByName)
  .get('/:name/apis', controller.allApis)
  .get('/:name/apis/:api', controller.apiByName)
  ;

