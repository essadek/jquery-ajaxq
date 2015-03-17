AjaxQ is a jQuery plugin that implements AJAX request queueing mechanism.

# Why? #

There are several reasons why you may need to queue AJAX requests and run them in a sequential manner:
  * Browsers impose a limit on the number of open connections to the server. All requests that do not fit in the limit are going to wait for being run anyway. Internet Explorer does not open more than 2 connections per server at a time by default. Mozilla Firefox, Opera and Safari have a limit of 8 connections per server.
  * Sometimes it is essential to avoid flooding the server with plenty of simultaneous AJAX requests.
  * Web application needs AJAX requests to run one by one by design, the order is important.

# How? #

Assume that the web application has to make two AJAX requests. Here's the usual and the simplest way of doing it:

```
$.ajax ({
    url: "test_1.html",
    cache: false,
    success: function(html)
    {
        $("#results").append(html);
    }
});

$.ajax ({
    url: "test_2.html",
    cache: false,
    success: function(html)
    {
        $("#results").append(html);
    }
});
```

The requests will run almost simultaneously. Moreover, the response to the second request may come first.

Let's look at how to use AjaxQ plugin, and make the requests run in a sequential manner:

```
$.ajaxq ("testqueue", {
    url: "test_1.html",
    cache: false,
    success: function(html)
    {
        $("#results").append(html);
    }
});

$.ajaxq ("testqueue", {
    url: "test_2.html",
    cache: false,
    success: function(html)
    {
        $("#results").append(html);
    }
});
```

Now the first requests runs first, and the second request runs only when the first one finishes.

There are only two essential differences between these two code blocks:
  * The method name changes from `$.ajax()` to `$.ajaxq()`.
  * `$.ajaxq()` gets one more parameter, the name of the queue. Queue name comes first, and [request options](http://docs.jquery.com/Ajax/jQuery.ajax#toptions) come second.

# Notes #

The number of AJAX queues is not limited. Web application may have as much AJAX queues as it requires. However, consider the limit of browser connections in case you have two or more queues running at the same time.

# API #

_**$.ajaxq (queue, options)**_

Enqueues a new AJAX request.

| _queue_ | _string_ | Name of the queue |
|:--------|:---------|:------------------|
| _options_ | _object_ | See [jQuery documentation](http://docs.jquery.com/Ajax/jQuery.ajax#toptions) for details |

_**$.ajaxq (queue)**_

Stops the current AJAX request and clears the queue.

| _queue_ | _string_ | Name of the queue |
|:--------|:---------|:------------------|