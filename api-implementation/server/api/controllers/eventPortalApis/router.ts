import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.all)
  .get('/:name', controller.byName)
  .get('/:name/spec', controller.specByName);
