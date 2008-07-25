$(document).ready (function()
{
	test ("Initialization test", function()
	{
		expect (5);
		
		ok (typeof document.ajaxq == "undefined", "Plugin is not initialized");
		
		$.ajaxq ("test");
		ok (typeof document.ajaxq != "undefined", "Plugin is initialized");
		ok (typeof document.ajaxq.q["test"] != "undefined", "Queue is initialized");
		equals (document.ajaxq.q["test"].length, 0, "Queue is empty");
		equals (document.ajaxq.r, null, "Current request is null");
	});
});