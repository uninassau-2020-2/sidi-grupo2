const express = require('express');
const axios = require('axios').default;
const { ZipQueries } = require('../model');
const router = express.Router();

const statusHeader = {
  BAD_REQUEST: 400,
  OK: 200,
  SERVER_ERROR: 500,
}

const isValidZipCode = (zipCode) => {
  const reg = /[0-9]{8}/g;
  return reg.test(zipCode) && zipCode.length === 8
}

router.get('/:cep', async (req, res, next) => {

  const zipCode = req.params.cep;

  if (isValidZipCode(zipCode)) {

    await ZipQueries.create({ zipcode: zipCode })

    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      .then(async (response) => {
        if (response.data) {
          if (response.data.erro)
            res.status(statusHeader.BAD_REQUEST).json({ 'message': 'cep não encontrado' });
          else {
            res.status(statusHeader.OK).json(response.data);
          }
        } else
          res.status(statusHeader.SERVER_ERROR).json({ 'erro': 'ops! houve um problema' });
      })
      .catch(function (error) {
        console.log(error);
        res.status(statusHeader.BAD_REQUEST).json({ 'message': 'cep não encontrado' });
      });
  } else
    res.status(statusHeader.BAD_REQUEST).json({ 'message': 'cep inválido' });
});

module.exports = router;