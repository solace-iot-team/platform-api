const express = require('express');
const apiDomains = require('../services/apiDomains');

const router = new express.Router();


/**
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
    pageSize: req.query['pageSize'],
    pageNumber: req.query['pageNumber']
  };

  try {
    const result = await apiDomains.getApiDomains(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * 
 */
router.get('/:api_domain_name', async (req, res, next) => {
  const options = {
    api_domain_name: req.params['api_domain_name']
  };

  try {
    const result = await apiDomains.getApiDomainsByApiDomainName(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
