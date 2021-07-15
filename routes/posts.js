var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.delete('/:id', PostsController.Delete);
router.get('/new', PostsController.New);
router.post('/update/:id', PostsController.Update);
router.get('/update/:id', PostsController.UpdatePage);

// router.get('/searchbar/:id', checkAuth, (req, res) => {
//   let userId = req.params.id
//   Invoice.find({'user': userId})
//     .then(invoice => {
//         res.status(200).json({
//           userDetails: invoice.userDetails,
//           invoiceCost: invoice.Cost
//         })
//     });
// });


module.exports = router;
