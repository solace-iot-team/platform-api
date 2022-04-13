import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.all)
  .get('/:name', controller.byName)
  .post('/', controller.create)
  .patch('/:name', controller.update)
  .delete('/:name', controller.delete)
  .get('/:team/apps', controller.allApps)
  .post('/:team/apps', controller.createApp)
  .patch('/:team/apps/:name', controller.updateApp)
  .delete('/:team/apps/:name', controller.deleteApp)
  .get('/:team/apps/:name', controller.appByName)
  .get('/:team/apps/:name/webHooks', controller.allAppWebHooks)
  .post('/:team/apps/:name/webHooks', controller.createWebHook)
  .get('/:team/apps/:app/webHooks/:name', controller.webHookByName)
  .delete('/:team/apps/:app/webHooks/:name', controller.deleteWebHook)
  .patch('/:team/apps/:app/webHooks/:name', controller.updateWebHook);

