const Counter = artifacts.require("Counter");

contract("Counter", async accounts => {


        it('should return one after incrementing once', async () => {
                var counter = await Counter.new();
                await counter.increment();
                const events = await counter.getPastEvents();
                const retVal = events[0].returnValues[0];
                assert.equal(retVal, 1, "The first increment didn't return one");
        });   // it should return one after incrementing once


        it('should return two after incrementing twice', async () => {
                var counter = await Counter.new();

                await counter.increment();
                await counter.increment();

                retVal = (await counter.getPastEvents())[0].returnValues[0];
                assert.equal(retVal, 2, "The two increments didn't return two");
        });   // it should return two after incrementing twice

        it('should return n after incrementing n times', async () => {
                var counter = await Counter.new();
                var arr = [];
                const max = 10;

                for(var i=0; i<max; i++)
                        arr.push(counter.increment());

                await Promise.all(arr);

                retVal = (await counter.getPastEvents())[0].returnValues[0];
                assert.equal(retVal, max, `${max} increments didn't return ${max}`);
        });   // it should return n after incrementing n times

});
