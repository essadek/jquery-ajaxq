jQuery.ajaxq = function (queue, options)
{
	// Initialize storage for request queues if it's not initialized yet
	if (typeof document.ajaxq == "undefined") document.ajaxq = {q:{}, r:null};

	// Initialize current queue if it's not initialized yet
	if (typeof document.ajaxq.q[queue] == "undefined") document.ajaxq.q[queue] = [];
	
	if (typeof options != "undefined") // Request settings are given, enqueue the new request
	{
		// Copy the original options, because success and error callbacks are going to be overridden

		var optionsCopy = {};
		for (var o in options) optionsCopy[o] = options[o];
		options = optionsCopy;
		
		// Override success and error callbacks

		var originalSuccessCallback = options.success;
		var originalErrorCallback = options.error;

		options.success = function (data, status)
		{
			// Dequeue the request that has just finished (succesfully)
			document.ajaxq.q[queue].shift ();
			document.ajaxq.r = null;

			// Run the next request from the queue
			if (document.ajaxq.q[queue].length > 0) document.ajaxq.r = jQuery.ajax (document.ajaxq.q[queue][0]);

			if (originalSuccessCallback)
			{
				try
				{
					originalSuccessCallback (data, status);
				}
				catch (e)
				{
					// Catch callback errors, the queue must not be broken because of them 
				}
			}
		};

		options.error = function (request, status, exception)
		{
			// Dequeue the request that has just finished (with an error)
			document.ajaxq.q[queue].shift ();
			document.ajaxq.r = null;

			// Run the next request from the queue
			if (document.ajaxq.q[queue].length > 0) document.ajaxq.r = jQuery.ajax (document.ajaxq.q[queue][0]);

			if (originalErrorCallback)
			{
				try
				{
					originalErrorCallback (request, status, exception);
				}
				catch (e)
				{
					// Catch callback errors, the queue must not be broken because of them
				}
			}
		};

		// Enqueue the request
		document.ajaxq.q[queue].push (options);

		// Also, if no request is currently running, start it
		if (document.ajaxq.q[queue].length == 1) document.ajaxq.r = jQuery.ajax (options);
	}
	else // No request settings are given, stop current request and clear the queue
	{
		if (document.ajaxq.r)
		{
			document.ajaxq.r.abort ();
			document.ajaxq.r = null;
		}

		document.ajaxq.q[queue] = [];
	}
}