describe 'jQuery AjaxQ plugin'

	it 'should exist'
		$.should.respond_to 'ajaxq'
	end

	describe 'when uninitialized'
		before_each
			delete document.ajaxq
		end
		
		it 'should not have a corresponding initialized storage for request queues'
			document.should.not.have_property 'ajaxq'
		end
		
		it 'should create a corresponding storage for request queues after defining a queue'
			$.ajaxq("test")
			document.should.have_property 'ajaxq'
			document.ajaxq.should.not.be_undefined
		end
	end
	
	describe 'when initialized with a single queue named "test"'
		before_each
			delete document.ajaxq
			$.ajaxq("test")
		end
		
		it 'should have a queue named "test" in its request queue storage'
			document.ajaxq.should.include "test"
		end
		
		it 'should have only one queue in its request queue storage'
			document.ajaxq.should.have_length 1
		end
	end
	
	describe 'when initialized with two queues named "test1" and "test2"'
		before_each
			delete document.ajaxq
			$.ajaxq("test1")
			$.ajaxq("test2")
		end
		
		it 'should have a queue named "test1" in its request queue storage'
			document.ajaxq.should.include "test1"
		end
		
		it 'should have a queue named "test2" in its request queue storage'
			document.ajaxq.should.include "test2"
		end
		
		it 'should have only two queues in its request queue storage'
			document.ajaxq.should.have_length 2
		end
	end

end


















