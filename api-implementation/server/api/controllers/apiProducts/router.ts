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
  .get('/:name/derived', controller.derivedByName)
  .post('/:name/derived', controller.createDerived)
  .get('/:name/apis', controller.allApis)
  .get('/:name/apis/:api', controller.apiByName)
  .get('/:name/revisions', controller.allRevisions)
  .get('/:name/revisions/:semver', controller.revisionByVersion)
  .get('/:name/attributes/:attributeName', controller.attributeByName)
  .put('/:name/attributes/:attributeName', controller.createAttribute)
  .patch('/:name/attributes/:attributeName', controller.updateAttribute)
  .delete('/:name/attributes/:attributeName', controller.deleteAttribute)
  ;

