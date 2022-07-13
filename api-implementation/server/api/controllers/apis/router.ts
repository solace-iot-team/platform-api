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
  .delete('/:name', controller.delete)
  .patch('/:name/info', controller.updateInfo)
  .get('/:name/revisions', controller.allRevisions)
  .get('/:name/revisions/:version', controller.revisionByVersion)
  .get('/:name/revisions/:version/info', controller.infoByVersion)
  .patch('/:name/revisions/:version/info', controller.updateInfoByVersion)
  .get('/:name/revisions/:version/apiProducts', controller.apiProductsByVersion)
  .get('/:name/attributes/:attributeName', controller.attributeByName)
  .put('/:name/attributes/:attributeName', controller.createAttribute)
  .patch('/:name/attributes/:attributeName', controller.updateAttribute)
  .delete('/:name/attributes/:attributeName', controller.deleteAttribute)
  ;
