var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Home = require("../containers/Home");
var Layout = require("../containers/Layout");
var PaymentMethods = require("../containers/PaymentMethods");
var CardPayment = require("../containers/CardPayment");
var NetBanking = require("../containers/NetBanking");
var WalletPayment = require("../containers/WalletPayment");
var HandlePayment = require("../containers/HandlePayment");
var Success = require("../containers/Success");
var Failure = require("../containers/Failure");
var createHashHistory = require('history/lib/createHashHistory')
var history = createHashHistory({queryKey: false})

var routes = (
  <Router history={history}>
    <Route path='/' component={Layout}>
		  <IndexRoute component={Home} />
    	<Route path='/order/create' component={Home} />
    	<Route path='/order/:orderId/paymentmethods' component={PaymentMethods} />
    	<Route path='/order/:orderId/card' component={CardPayment} />
    	<Route path='/order/:orderId/netbanking' component={NetBanking} />
      <Route path='/order/:orderId/wallet' component={WalletPayment} />
    	<Route path='/success' component={Success} />
      <Route path='/failure' component={Failure} />
    </Route>
    <Route path='/handlepayment' component={HandlePayment} />
  </Router>
);

module.exports = routes;