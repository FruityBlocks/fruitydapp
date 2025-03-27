// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FruitMarketplace {
    struct Fruit {
        string name;
        string typeOfFruit;
        uint price;
        string seller;
    }

    Fruit[] public fruits;

    event FruitAdded(string name, uint price, address indexed owner);

    function addFruit(string memory name, string memory typeOfFruit, uint price, string memory seller) public {
        require(bytes(name).length > 0, "Fruit name should not be empty");
        require(price > 0, "The price must be greater than 0");

        fruits.push(Fruit(name, typeOfFruit, price, seller));

        emit FruitAdded(name, price, msg.sender);
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