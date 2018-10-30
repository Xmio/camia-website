$('#camia-feature-content').load( "./feature.html", loadGeneralContent());
function loadGeneralContent() {
	$('#main-general-content').load( "./general.html");
}
$('.use-case-family').click(function(){
    useCaseFamily();
});
$('.use-case-pets').click(function(){
    useCasePets();
});
$('.use-case-home').click(function(){
    useCaseHome();
});
$('.use-case-business').click(function(){
    useCaseBusiness();
});
$('.subscribe-button').click(function(){
    showPricing();
});
$('.comum-subscribe-button').click(function(){
    showPricing();
});