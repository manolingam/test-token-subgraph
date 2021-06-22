/**
 *Submitted for verification at Etherscan.io on 2021-01-30
*/

pragma solidity ^0.8.0;

//SPDX-License-Identifier: UNLICENSED

interface ERC20Interface {
    function totalSupply() external view returns (uint);
    function balanceOf(address tokenOwner) external view returns (uint balance);
    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
    function transfer(address to, uint amount) external returns (bool success);
    function approve(address spender, uint amount) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);
    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed tokenOwner, address indexed spender, uint amount);
}


contract TestToken is ERC20Interface {
    string public symbol;
    string public  name;
    uint8 public decimals;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    constructor() {
        symbol = "TEST";
        name = "Test Token";
        decimals = 18;
        uint _totalSupply = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
        balances[address(0)] = _totalSupply;
    }
    
    function _transfer(address from, address to, uint amount) private returns (bool success) {
        balances[from] = balances[from] - amount;
        balances[to] = balances[to] + amount;
        emit Transfer(from, to, amount);
        return true;
    }
    
    function mint(uint amount) external returns (bool success) {
        return mint(msg.sender, amount);
    }
    
    function mint(address owner, uint amount) public returns (bool success) {
        return _transfer(address(0), owner, amount);
    }
    
    function totalSupply() external override view returns (uint) {
        return balances[address(0)];
    }

    function balanceOf(address owner) external override view returns (uint balance) {
        return balances[owner];
    }

    function transfer(address to, uint amount) external override returns (bool success) {
        require(balances[msg.sender] >= amount, "not enough balance");
        return _transfer(msg.sender, to, amount);
    }

    function transferFrom(address from, address to, uint amount) external override returns (bool success) {
        require(balances[from] >= amount, "not enough balance");
        require(allowed[from][msg.sender] >= amount, "not approved");
        allowed[from][msg.sender] = allowed[from][msg.sender] - amount;
        return _transfer(from, to, amount);
    }

    function approve(address spender, uint amount) external override returns (bool success) {
        allowed[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function allowance(address owner, address spender) external override view returns (uint remaining) {
        return allowed[owner][spender];
    }

}