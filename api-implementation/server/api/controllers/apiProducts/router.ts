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
  .get('/:name/meta/attributes/:attributeName', controller.metaAttributeByName)
  .put('/:name/meta/attributes/:attributeName', controller.createMetaAttribute)
  .patch('/:name/meta/attributes/:attributeName', controller.updateMetaAttribute)
  .delete('/:name/meta/attributes/:attributeName', controller.deleteMetaAttribute)
  ;

