const express = require('express');
const apis = require('../services/apis');

const router = new express.Router();


/**
 * Returns a list of APIs, maps to underlying event portal api 
 * /api/v1/eventPortal/applications
 */
router.get('/', async (req, res, next) => {
  const options = {
    pageSize: req.query['pageSize'],
    pageNumber: req.query['pageNumber'],
    apiDomainName: req.query['apiDomainName']
  };

  try {
    const result = await apis.getApis(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * 
 */
router.get('/:api_name', async (req, res, next) => {
  const options = {
    api_name: req.params['api_name']
  };

  try {
    const result = await apis.getApisByApiName(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * 
 */
router.get('/:api_name/spec', async (req, res, next) => {
  const options = {
    api_name: req.params['api_name'],
    async_api_version: req.query['async_api_version']
  };

  try {
    const result = await apis.getApisByApiNameSpec(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
