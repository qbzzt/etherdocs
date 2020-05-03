pragma solidity >=0.5.0 <0.6.0;


contract Counter {
        uint value = 0;

        event Asked4Value(uint, address);

        function increment() external {
                value++;
                emit Asked4Value(value, msg.sender);
        }
}
