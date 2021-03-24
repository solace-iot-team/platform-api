import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.get.bind(controller))
  .put('/', controller.create.bind(controller));
