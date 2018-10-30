var uc=getUrlParameter('uc');
switch (uc) {
    case "family":
        $('#camia-family-content').load("./src/family.html",startWithFamily());
        break;
    case "pets":
        $('#camia-pets-content').load("./src/pets.html",startWithPets());
        break;
    case "home":
        $('#camia-home-content').load("./src/home.html",startWithHome());
        break;
    case "business":
        $('#camia-business-content').load("./src/business.html", startWithBusiness());
        break;
    default:
        $('#camia-main-content' ).load("./src/main.html", startWithMain());
    mixpanel.track("New visitor", {"uc": uc});
} 
function startWithFamily() {
  useCaseFamily();
  $('#camia-main-content' ).load("./src/main.html");
  $('#camia-business-content').load("./src/business.html");
  $('#camia-pets-content').load("./src/pets.html");
  $('#camia-home-content').load("./src/home.html");
  $('#camia-congrats-content').load("./src/congrats.html");
  $('#camia-pricing-content').load("./src/pricing.html");
}
function startWithPets() {
  useCasePets();
  $('#camia-main-content' ).load("./src/main.html");
  $('#camia-business-content').load("./src/business.html");
  $('#camia-family-content').load("./src/family.html");
  $('#camia-home-content').load("./src/home.html");
  $('#camia-congrats-content').load("./src/congrats.html");
  $('#camia-pricing-content').load("./src/pricing.html");
}
function startWithHome() {
  useCaseHome();
  $('#camia-main-content' ).load("./src/main.html");
  $('#camia-business-content').load("./src/business.html");
  $('#camia-pets-content').load("./src/pets.html");
  $('#camia-family-content').load("./src/family.html");
  $('#camia-congrats-content').load("./src/congrats.html");
  $('#camia-pricing-content').load("./src/pricing.html");
}
function startWithBusiness() {
  useCaseBusiness();
  $('#camia-main-content' ).load("./src/main.html");
  $('#camia-pets-content').load("./src/pets.html");
  $('#camia-home-content').load("./src/home.html");
  $('#camia-family-content').load("./src/family.html");
  $('#camia-congrats-content').load("./src/congrats.html");
  $('#camia-pricing-content').load("./src/pricing.html");
}
function startWithMain() {
  showMain();
  $('#camia-business-content').load("./src/business.html");
  $('#camia-family-content').load("./src/family.html");
  $('#camia-pets-content').load("./src/pets.html");
  $('#camia-home-content').load("./src/home.html");
  $('#camia-congrats-content').load("./src/congrats.html");
  $('#camia-pricing-content').load("./src/pricing.html");
}
function useCaseFamily() {
    mixpanel.track("Family page view", {"uc": uc});
    hideAllContent();
    $('#camia-family-content').show();
}
function useCaseHome() {
    mixpanel.track("Home page view", {"uc": uc});
    hideAllContent();
    $('#camia-home-content').show();
}
function useCasePets() {
    mixpanel.track("Pets page view", {"uc": uc});
    hideAllContent();
    $('#camia-pets-content').show();
}
function useCaseBusiness() {
    mixpanel.track("Business page view", {"uc": uc});
    hideAllContent();
    $('#camia-business-content').show();
}
function showPricing() {
    hideAllContent();
    $('#camia-pricing-content').show();
    mixpanel.track("Pricing page view", {"uc": uc});
}
function showMain(){
  hideAllContent();
  $('#camia-main-content').show();
}
function showCongrats() {
    mixpanel.track("Subscribe for a plan", {"uc": uc});
    hideAllContent();
    $('#camia-congrats-content').show();
}
$('.navbar-brand').click(showMain);
$('.camia-home').click(useCaseHome);
$('.camia-pets').click(useCasePets);
$('.camia-family').click(useCaseFamily);
$('.camia-business').click(useCaseBusiness);
$('.price-link').click(showPricing);
        
function hideAllContent() {
  $('#camia-main-content' ).hide();
  $('#camia-congrats-content' ).hide();
  $('#camia-pricing-content').hide();
  $('#camia-business-content').hide();
  $('#camia-family-content').hide();
  $('#camia-pets-content').hide();
  $('#camia-home-content').hide();
  window.scrollTo(0,0);
}
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam)
            return sParameterName[1] === undefined ? true : sParameterName[1];
    }
};
$('.usage-term-content').load("./src/terms.html");
$('.privacy-police').load("./src/privacy.html");
$('#navbarDropdown').click().click();