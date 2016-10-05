const showBackUrls = ["paymentmethods", "card", "netbanking", "wallet"];
var backUrlMap = {
	'/paymentmethods': '/order/create',
	'/card': '/order/:orderId/paymentmethods',
	'/netbanking': '/order/:orderId/paymentmethods',
	'/wallet': '/order/:orderId/paymentmethods',
}

function checkBackButton() {
  var url = window.location.href;
  var show = false;

  for (var i = 0; i< showBackUrls.length; i++) {
    if (url.indexOf(showBackUrls[i]) > -1) {
      show = showBackUrls[i];
      break;
    }
  }

  return show;
}

export default (obj) => {
	var path = 	checkBackButton(obj.props.location.pathname);
	var amount = obj.props.location.query.amount
	var customerId = obj.props.location.query.customerId
	var orderId = obj.props.location.pathname.match(/\/order\/.*\//);
	orderId = orderId[0].substring(7)
	if (!path)
	return;

	var head = document.querySelectorAll('head')[0];

	if (document.querySelectorAll('#backPressCss')[0])
	return;

	var style = document.createElement('style');

	style.id = "backPressCss";
	style.innerHTML = '.example-enter {margin-left: -50%; } .example-enter-active {margin-left: 0%; } .example-leave {margin-left: 0%; } .example-leave-active {margin-left: 50%; }';
	head.appendChild(style);

	var backUrl = ''
	
	if(path=="paymentmethods"){
		backUrl = backUrlMap['/'+path]
	}
	else{
		backUrl = backUrlMap['/' + path].replace(':orderId/', orderId) + '?customerId='+customerId + '&amount='+amount
	}
	obj.props.history.pushState(null, backUrl);  

	setTimeout(function() {
	   style.remove(); 	
	}, 600);
}