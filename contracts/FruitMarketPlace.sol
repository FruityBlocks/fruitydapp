// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FruitMarketplace {
    struct Fruit {
        string name;
        string typeOfFruit;
        uint256 price;
        string seller;
        string icon;
    }

    Fruit[] public fruits;

    constructor() {
        fruits.push(Fruit("Apple", "Fruit", 1.99 ether, "0xD34DbeEf9F7a1C64D1b8355b93aAfDD4B0c6d50a", "IconApple"));
        fruits.push(Fruit("Banana", "Fruit", 0.99 ether, "0x5fE1A5b619A7E4Ed65D4E3Fd620a8b4bb5B6bF2F", "IconApple"));
        fruits.push(Fruit("Orange", "Fruit", 1.29 ether, "0xE4B9535B90Ae7Fd6C8d125b2Fd2544641B2cC1e2", "IconLemon"));
        fruits.push(Fruit("Grapes", "Fruit", 2.49 ether, "0xAb23C5d7558a8E9c7F5b5e10Af3C11F5A7DffD7D", "IconLemon"));
        fruits.push(Fruit("Peach", "Fruit", 2.99 ether, "0x0E9F50429f8f97eF3fa74f1c9B564Ee55cAf4361", "IconLemon"));
        fruits.push(Fruit("Pineapple", "Fruit", 3.5 ether, "0x739e9dA1e59F76beCea12E4D23C79806E97C2fe2", "IconLemon"));
        fruits.push(Fruit("Mango", "Fruit", 2.79 ether, "0xF5b59B223F57e2C0B88AC8bD48aE62E2129d3885", "IconLemon"));
        fruits.push(Fruit("Strawberry", "Fruit", 3.99 ether, "0x1C5E9f3bD689B9b5e9fFEe5b3b5420D7d94b7D0E", "IconLemon"));
        fruits.push(Fruit("Blueberry", "Fruit", 4.49 ether, "0xB9e0c6f346EF3826A515dA3F736756446E5F9D6F", "IconApple"));
        fruits.push(Fruit("Cherry", "Fruit", 5.19 ether, "0xDFa728A835FdCBefc9C38e1C2E99916367685E3D", "IconApple"));
    }

    event FruitAdded(string name, uint price, address indexed owner);

    function addFruit(string memory name, string memory typeOfFruit, uint price, string memory seller, string memory icon) public {
        require(bytes(name).length > 0, "Fruit name should not be empty");
        require(price > 0, "The price must be greater than 0");
 
        fruits.push(Fruit(name, typeOfFruit, price, seller, icon));

        emit FruitAdded(name, price, msg.sender);
    }

    function getFruits() public view returns (Fruit[]memory) {
        return fruits;
    }

    function getFruit(uint index) public view returns (string memory, string memory, uint, string memory) {
        require(index < fruits.length, "Fruit inexistant");

        Fruit memory fruit = fruits[index];
        return (fruit.name, fruit.typeOfFruit, fruit.price, fruit.seller);
    }

    function getFruitsCount() public view returns (uint) {
        return fruits.length;
    }
}