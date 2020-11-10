import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.all)
  .get('/:name', controller.byName)
  .post('/', controller.create)
  .patch('/:name', controller.update)
  .delete('/:name', controller.delete)
  .get('/:developer/apps', controller.allApps)
  .post('/:developer/apps', controller.createApp)
  .patch('/:developer/apps/:name', controller.updateApp)
  .delete('/:developer/apps/:name', controller.deleteApp)
  .get('/:developer/apps/:name', controller.appByName);

