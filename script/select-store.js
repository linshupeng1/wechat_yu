function selectStore() {
	$("body").on("click", ".select-store li", function() {
		var storeVal = $(this).text();
		sessionStorage.setItem("storeVal",storeVal);
		window.location.href = "register.html";
	})
}
$(document).ready(function(){
	selectStore();
})
