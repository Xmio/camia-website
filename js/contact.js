$('.contact-button').click(function(){
  $form = $(this);
    $form.find('button').prop('disabled', true);
    mail = $('.camia-contact-email').val();
    msg = $('.camia-contact-msg').val();
   if (mail==""){
      toastr.error("O e-mail é um campo obrigatório.");
      return;
   }
   if (msg==""){
      toastr.error("A mensagem é um campo obrigatório.");
      return;
   }
   var contact = {
    'email':mail,
    'message':msg
   };
   $.ajax({
       url: 'https://api.camia.com.br:5000/contact',
       type: 'post',
       dataType: 'json',
       contentType: 'application/json',
       success: function(data) {
           toastr.success("Mensagem enviada com sucesso!");

          $('.contact-body-content').hide();
          $('.contact-body-success').show();
          setTimeout(function(){
              $('#contactModal').modal('toggle');
          }, 1000);
       },
       error: function(data) {
           toastr.error("Não foi possível enviar sua mensagem.");
       },
       data: JSON.stringify(contact)
   });
});