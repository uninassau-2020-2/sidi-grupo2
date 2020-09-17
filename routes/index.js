const express = require('express');
const axios = require('axios').default;
const router = express.Router();

router.get('/:cep', function(req, res, next) {

  const cep = req.params.cep;
  let re = /[0-9]{8}/g;
  
  if(!re.test(cep) || cep.length !== 8)
    res.status(400).json({'error': 'cep inválido' });

  axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  .then(function (response) {
    if(response.data.erro)
      res.status(400).json({'message': 'cep não encontrado'});
    else
      res.status(200).json(response.data);
  })
  .catch(function (error) {
    res.status(400).json({'message': 'cep não encontrado'});
  });
});

module.exports = router;
