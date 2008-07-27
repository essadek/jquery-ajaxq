$(document).ready (function()
{
	test ("Plugin initialization using $.ajaxq(queue)", function()
	{
		expect (4);
		
		ok (typeof document.ajaxq == "undefined", "Plugin is not initialized");
		
		$.ajaxq ("test");
		ok (typeof document.ajaxq != "undefined", "Plugin is initialized");
		ok (typeof document.ajaxq.q["test"] != "undefined", "Queue is initialized");
		equals (document.ajaxq.q["test"].length, 0, "Queue is empty");
	});
	
	
	test ("Enqueue one request", function()
	{
		expect (4);
		stop();
		
		$.ajaxq ("test",
		{
			url: "test.html",
			success: function()
			{
				ok (true, "First success callback called");
				equals (document.ajaxq.q["test"].length, 1, "Queue contains one request");
			},
			error: function()
			{
				ok (false, "First error callback called");
			},
			complete: function()
			{
				ok (true, "First complete callback called");
				equals (document.ajaxq.q["test"].length, 0, "Queue contains zero requests");
				start();
			}
		});
	});
	
	
	test ("Enqueue two requests", function()
	{
		expect (8);
		stop();
		
		$.ajaxq ("test",
		{
			url: "test.html",
			success: function()
			{
				ok (true, "First success callback called");
				equals (document.ajaxq.q["test"].length, 2, "Queue contains two requests");
			},
			error: function()
			{
				ok (false, "First error callback called");
			},
			complete: function()
			{
				ok (true, "First complete callback called");
				equals (document.ajaxq.q["test"].length, 1, "Queue contains one requests");
			}
		});
		
		$.ajaxq ("test",
		{
			url: "test.html",
			success: function()
			{
				ok (true, "Second success callback called");
				equals (document.ajaxq.q["test"].length, 1, "Queue contains one request");
			},
			error: function()
			{
				ok (false, "Second error callback called");
			},
			complete: function()
			{
				ok (true, "Second complete callback called");
				equals (document.ajaxq.q["test"].length, 0, "Queue contains zero requests");
				start();
			}
		});
	});
	
	
	test ("Enqueue three requests", function()
	{
		expect (12);
		stop();
		
		$.ajaxq ("test",
		{
			url: "test.html",
			success: function()
			{
				ok (true, "First success callback called");
				equals (document.ajaxq.q["test"].length, 3, "Queue contains three requests");
			},
			error: function()
			{
				ok (false, "First error callback called");
			},
			complete: function()
			{
				ok (true, "First complete callback called");
				equals (document.ajaxq.q["test"].length, 2, "Queue contains two requests");
			}
		});
		
		$.ajaxq ("test",
		{
			url: "test.html",
			success: function()
			{
				ok (true, "First success callback called");
				equals (document.ajaxq.q["test"].length, 2, "Queue contains two requests");
			},
			error: function()
			{
				ok (false, "First error callback called");
			},
			complete: function()
			{
				ok (true, "First complete callback called");
				equals (document.ajaxq.q["test"].length, 1, "Queue contains one requests");
			}
		});
		
		$.ajaxq ("test",
		{
			url: "test.html",
			success: function()
			{
				ok (true, "Second success callback called");
				equals (document.ajaxq.q["test"].length, 1, "Queue contains one request");
			},
			error: function()
			{
				ok (false, "Second error callback called");
			},
			complete: function()
			{
				ok (true, "Second complete callback called");
				equals (document.ajaxq.q["test"].length, 0, "Queue contains zero requests");
				start();
			}
		});
	});
});