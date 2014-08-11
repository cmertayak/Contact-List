var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts-dev');

var Contact = mongoose.model('Contact', {name: String, number: String});

/* GET home page. */
router.get('/', function(req, res) {
  var index = require('../helper/index.js');

  var selectedIndex = req.param('index') || index.default,
      model = { };

  // If value is not found, set the default
  if(index.list.indexOf(selectedIndex, index.list) < 0) {
      selectedIndex = index.default;
  }

  model.index = index.list;
  model.selectedIndex = selectedIndex;

    Contact
        .find({"name": {'$regex': '^'+selectedIndex + '.*'}})
        .sort({name: 1})
        .paginate({ page: req.query.page, perPage: req.query.perPage },
          function(err, contacts) {
              model.list = contacts;
              res.render('index', model);
          }
        );
});

router.post('/', function(req, res) {
    var name = req.param('name'),
        number = req.param('number');

    var contact = new Contact({name: name, number: number});
    contact.save(function(err){
        if(err) {
            console.log('failed to save ' + name);
            res.send(401, 'failed to save ' + name);
            return;
        }

        console.log('successfully saved: ' + name);
        res.redirect('/?index=' + name[0]);
    })
});

module.exports = router;
