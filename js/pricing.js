var selectedStorage = 3;
var selectedCams = 3;
var valStorage = 9;
var valCamera = 59;
var valShipping=0;
var customerCep = "";
var name = "";
var mail = "";
var city = "";
var street = "";
var number ="";
var month ="";
var year ="";
var cardNumber ="";
var cvv = "";
var state = "";
var neighborhood = "";
var billingState="";
var billingNeighborhood = "";

$('.usage-term-content').load("./terms.html");

$('#payment-form').submit(function(e) {
  $(".loader").show();

    $form = $(this);
    $form.find('button').prop('disabled', true);
   
   name = $('.customer-name').val();
   city = $('.customer-city').val();
   street = $('.customer-lograd').val();
   number = $('.customer-number').val();
   month = $('.customer-card-month').val();
   year = $('.customer-card-year').val();
   cardNumber = $('.customer-card-number').val();
   cvv = $('.customer-card-cvv').val();
   mail = $('.customer-mail').val();
   billingDocument = $('.billing-cpfcnpj').val();
   billingPhone = $('.billing-phone').val();
   billingCep = $('.billing-cep').val();
   billingName = $('.billing-name').val();
   billingCity = $('.billing-city').val();
   billingStreet = $('.billing-lograd').val();
   billingNumber = $('.billing-number').val();
   billingCep=billingCep.replace("-", "");
   billingCep=billingCep.replace(" ", "");
   billingDocument=billingDocument.replace(" ", "");
   billingDocument=billingDocument.replace(".", "");
   billingDocument=billingDocument.replace("/", "");
   billingDocument=billingDocument.replace("-", "");

   var errorMsg="";
   if (city=="")
      errorMsg = "A cidade para entrega é um campo obrigatório.";
   if (street=="")
      errorMsg = "O logradouro para entrega é um campo obrigatório.";
   if (number=="")
      errorMsg = "O número do local de entrega é um campo obrigatório.";
   if (name=="")
      errorMsg = "O nome do titular do cartão é um campo obrigatório.";
   if (month =="")
      errorMsg = "O mês de expiração do cartão é um campo obrigatório.";
   if (year =="")
      errorMsg = "O ano de expiração do cartão é um campo obrigatório.";
   if (cardNumber =="")
      errorMsg = "O número do cartão é um campo obrigatório.";
   if (cvv =="")
      errorMsg = "O CVV do cartão é um campo obrigatório.";
   if (mail=="")
      errorMsg = "O e-mail é um campo obrigatório.";
   if (billingPhone=="")
      errorMsg = "O telefone da sessão de faturamento é um campo obrigatório.";
   if (billingCep=="")
      errorMsg = "O CEP da sessão de faturamento é um campo obrigatório.";
   if (billingName=="")
      errorMsg = "O nome da sessão de faturamento é um campo obrigatório.";
   if (billingCity=="")
      errorMsg = "A cidade da sessão de faturamento é um campo obrigatório.";
   if (billingStreet=="")
      errorMsg = "O endereço da sessão de faturamento é um campo obrigatório.";
   if (billingNumber=="")
      errorMsg = "O número da sessão de faturamento é um campo obrigatório.";
   if (billingDocument=="")
      errorMsg = "O documento da sessão de faturamento é um campo obrigatório.";

   if (errorMsg) {
      toastr.error(errorMsg);
      mixpanel.track("Invalid pricing field filled", {"uc": uc, "msg": errorMsg, "mail": mail});
      $form.find('button').prop('disabled', false);
      $(".loader").hide();
      return false;
   }

        var card = {};
        card.card_holder_name = name;
        card.card_expiration_date = month + '/' + year;
        card.card_number = cardNumber;
        card.card_cvv = cvv;
        var cardValidations = pagarme.validate({card: card});
         
        pagarme.client.connect({ encryption_key: 'ek_test_kd5KohMu3BgVHJRSXkaZ12wWSRHsmY' })
          .then(client => client.security.encrypt(card))
          .then(card_hash => pagarmeSuccess(card_hash, $form))

    return false;
});

function pagarmeSuccess(card_hash, form) {
  if (!card_hash) {
            toastr.info('Oops, não foi possível efetuar a sua assinatura, entre em contato com nosso suporte.');
            mixpanel.track("Invalid credit card field filled", {"uc": uc, "mail": mail, 'numCams': selectedCams, 'storageDays': selectedStorage});
            form.find('button').prop('disabled', false);
            $(".loader").hide();
        } else {
            var token = card_hash;
            var subscription = {
                'token': token,
                'numCams': selectedCams,
                'storageDays': selectedStorage,
                'shipping': {
                  'address' : {
                    'cep': customerCep,
                    'city': city,
                    'street': street,
                    'number': number,
                    'state':state,
                    'neighborhood':neighborhood
                  }
                },
                'customer': {
                  'email' :mail,
                  'name' :billingName,
                  'phone' :billingPhone,
                  'document' :billingDocument,
                  'address' : {
                    'cep': billingCep,
                    'city': billingCity,
                    'street': billingStreet,
                    'number': billingNumber,
                    'state':billingState,
                    'neighborhood':billingNeighborhood
                  }
                }
            };

            $.ajax({
                url: 'https://api.camia.com.br:5000/subscribe',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function(data) {
                    $(".loader").hide();
                    toastr.success("Assinatura concluída com sucesso!");
                    mixpanel.track("Subscription concluded with success", {"uc": uc, "mail": mail, 'numCams': selectedCams, 'storageDays': selectedStorage});
                    showCongrats();
                },
                error: function(data) {
                    toastr.error("Não foi possível concluir a assinatura. Entre em contato com nossa central de suporte.");
                    mixpanel.track("Subscription failed in the back-end", {"uc": uc, "mail": mail, 'numCams': selectedCams, 'storageDays': selectedStorage});
                    form.find('button').prop('disabled', false);
                    $(".loader").hide();
                },
                data: JSON.stringify(subscription)
            });
        }
}

$(".cam-volume").click(function() {
    $(".cam-volume").removeClass("selected");
    $(this).addClass("selected");
    selectedCams = this.getElementsByClassName('camia-vol')[0].textContent;
    valCamera = this.getElementsByClassName('camia-val')[0].textContent;
    updateTotal();
    if (customerCep)
        calculateShipping(customerCep);
});

$(".cam-storage").click(function() {
    $(".cam-storage").removeClass("selected");
    $(this).addClass("selected");
    selectedStorage = this.getElementsByClassName('camia-vol')[0].textContent;
    valStorage = this.getElementsByClassName('camia-val')[0].textContent;
    updateTotal();
});

function updateTotal() {
    var shippingByMonth=valShipping/12;
    var totalByMonth=(valStorage * selectedCams) + (valCamera * 1) + shippingByMonth;
    $(".abstract-cam-val")[0].textContent = valCamera;
    $(".abstract-storage-val")[0].textContent = valStorage * selectedCams;
    $(".abstract-cam-vol")[0].textContent = selectedCams;
    $(".abstract-storage-vol")[0].textContent = selectedStorage;
    $(".abstract-total-val")[0].textContent = totalByMonth.toLocaleString('pt-br', {minimumFractionDigits: 2,maximumFractionDigits: 2});
    mixpanel.track("The pricing plan has changed", {"uc": uc, 'numCams': selectedCams, 'storageDays': selectedStorage, 'totalByMonth':totalByMonth});
}

function calculateShipping(cep) {
    $.ajax({
        url: 'https://api.camia.com.br:5000/shipping/' + cep + '/' + selectedCams,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            valShipping=data.shippingValue;
            $(".abstract-shipping-val")[0].textContent = data.shippingValue.toLocaleString('pt-br', {minimumFractionDigits: 2,maximumFractionDigits: 2});
            $(".abstract-days")[0].textContent = data.shippingPeriod+2;
            $(".camia-frete").show();
            updateTotal();
        },
        error: function(data) {
            toastr.error("Não foi possível calcular o frete para este CEP");
            $(".camia-frete").hide();
            updateTotal();
        }
    });
}

$(".customer-cep").change(function() {
    customerCep = this.value;
    customerCep=customerCep.replace("-", "").replace(" ", "");
    if (!customerCep) {
        $(".camia-frete").hide();
        return;
    }

    $.ajax({
        url: 'https://viacep.com.br/ws/' + customerCep + '/json/',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            if (!data.localidade || !data.logradouro)
               return;
            $(".customer-lograd")[0].value = data.logradouro;
            $(".customer-city")[0].value = data.localidade;
            state = data.uf;
            neighborhood = data.bairro;
            calculateShipping(customerCep);
        },
        error: function(data) {
            toastr.error("CEP de entrega inválido");
            $(".camia-frete").hide();
        }
    });
});

$(".billing-cep").change(function() {
    billingCep = this.value;
    billingCep=billingCep.replace("-", "").replace(" ", "");
    if (!billingCep)
        return;
    $.ajax({
        url: 'https://viacep.com.br/ws/' + billingCep + '/json/',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            if (!data.localidade || !data.logradouro)
               return;
            $(".billing-lograd")[0].value = data.logradouro;
            $(".billing-city")[0].value = data.localidade;
            billingState = data.uf;
            billingNeighborhood = data.bairro;
        },
        error: function(data) {
            toastr.error("CEP para faturamento inválido");
        }
    });
});