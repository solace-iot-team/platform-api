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
  .get('/:developer/apps/:name', controller.appByName)
  .get('/:developer/apps/:name/webHooks', controller.allAppWebHooks)
  .post('/:developer/apps/:name/webHooks', controller.createWebHook)
  .get('/:developer/apps/:app/webHooks/:name', controller.webHookByName)
  .patch('/:developer/apps/:app/webHooks/:name', controller.updateWebHook)
  .delete('/:developer/apps/:app/webHooks/:name', controller.deleteWebHook)
  .get('/:developer/apps/:app/attributes/:attributeName', controller.attributeByName)
  .put('/:developer/apps/:app/attributes/:attributeName', controller.createAttribute)
  .patch('/:developer/apps/:app/attributes/:attributeName', controller.updateAttribute)
  .delete('/:developer/apps/:app/attributes/:attributeName', controller.deleteAttribute)
  ;

