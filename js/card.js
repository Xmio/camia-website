$(".camia-card-number").keyup(function() {
  var brand=getCardType(this.value);
  if (brand)
    $(".card-brand").attr("src","./assets/"+ brand+".png");
  else 
    $(".card-brand").attr("src","");
});

function getCardType(number) {
    var re = {
        electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/
    }
    for(var key in re)
        if(re[key].test(number))
            return key
}
