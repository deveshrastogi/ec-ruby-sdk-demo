require 'sinatra'
require 'json'
require 'expresscheckout'

set :root, 'lib/app'
$version= {:JuspayAPILibrary=>'Ruby v1.0'}

$api_key = '3E69335A241F49DFAE9C023BAB73D312'
$merchant_id = 'ec_demo'

$environment = 'staging'
$server = ''
$orderId = ''
$amount = ''

def convertToHash(obj)
	objHash = Hash.new
	obj.instance_variables.map do |var|
		key = var.to_s.sub("@", "")
  		objHash[key] = obj.instance_variable_get(var)
	end
	return objHash
end

get '/' do
  render :html, :index
end

get '/order_status' do
	order_status = Orders.status(order_id: params[:order_id])
	amount = order_status.amount
	customer_id = order_status.customer_id
	{"amount" => amount, "customerId" => customer_id}.to_json.to_s
end

get '/order_create' do
	$orderId = Time.now.to_i.to_s
	$amount = params[:amount].to_f
	order = Orders.create(
		order_id: $orderId, 
		amount: $amount,
		customer_id: params[:customer_id],
		customer_phone: params[:customer_phone],
		customer_email: params[:customer_email],
		return_url: "http://localhost:4567/handle_payment" 
		)
	orderHash = convertToHash(order)
	{"order" => orderHash.to_json.to_s}.to_json.to_s
end

get '/delete_card' do
	card = Cards.delete(card_token: params[:card_token])
	cardHash = convertToHash(card)
	{"card" => cardHash}.to_json.to_s
end

get '/list_cards' do
	cards = Cards.list(customer_id: params[:customer_id])
	cardsHash = Array.new(cards.length)
	cards.each_with_index { |card,index| 
		cardsHash[index] = convertToHash(card).to_json.to_s
	}
	{"cards"=> cardsHash}.to_json.to_s
end

get '/list_wallets' do
	wallets = Wallets.list(customer_id: params[:customer_id])
	walletsHash = Array.new(wallets.length)
	wallets.each_with_index { |wallet,index| 
		walletsHash[index] = convertToHash(wallet).to_json.to_s
	}
	{"wallets"=> walletsHash}.to_json.to_s
end

get '/refresh_wallets' do
	wallets = Wallets.refresh_balance(customer_id: params[:customer_id])
	walletsHash = Array.new(wallets.length)
	wallets.each_with_index { |wallet,index| 
		walletsHash[index] = convertToHash(wallet).to_json.to_s
	}
	{"wallets"=> walletsHash}.to_json.to_s
end

get '/create_txn' do
	params[:redirect_after_payment] = (params[:redirect_after_payment] == "true")
	payment_method_type = params[:payment_method_type]	
	
	if payment_method_type == "CARD"
		if params.has_key?'card_token'
			response = Payments.create_card_payment(
				order_id: params[:order_id],
		        merchant_id: $card_merchant_id,
		        card_token: params[:card_token],
				card_security_code: params[:card_security_code],
				payment_method_type: payment_method_type,
		        redirect_after_payment: params[:redirect_after_payment]
			)
		else
			params[:save_to_locker] = (params[:save_to_locker] == "true")
			response = Payments.create_card_payment(
				order_id: params[:order_id],
		        merchant_id: $card_merchant_id,
		        card_number: params[:card_number],
		        name_on_card: params[:name_on_card],
		        card_exp_month: params[:card_exp_month],
		        card_exp_year: params[:card_exp_year],
				card_security_code: params[:card_security_code],
				save_to_locker: params[:save_to_locker],
				payment_method_type: payment_method_type,
		        redirect_after_payment: params[:redirect_after_payment]
			)
		end
	elsif payment_method_type == "NB"
		response = Payments.create_net_banking_payment(
			order_id: params[:order_id],
	        merchant_id: $merchant_id,
	        payment_method: params[:payment_method],
	        payment_method_type: payment_method_type,
	        redirect_after_payment: params[:redirect_after_payment]
		)
	elsif payment_method_type == "WALLET"
		response = Payments.create_wallet_payment(
			order_id: params[:order_id],
	        merchant_id: $merchant_id,
	        payment_method: params[:payment_method], 
	        payment_method_type: payment_method_type,       
	        redirect_after_payment: params[:redirect_after_payment]
		)
	end
	
	responseHash = convertToHash(response.payment.authentication)	
	return responseHash.to_json.to_s
end

get '/handle_payment' do
	order_id = params[:order_id]
	status = params[:status]
	url = '#/handlepayment?orderId=' + order_id + '&status=' + status
	redirect url
end