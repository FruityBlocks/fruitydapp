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

    function addFruit(string memory name, uint price) public {
        require(bytes(name).length > 0, "Le nom du fruit ne peut pas être vide");
        require(price > 0, "Le prix doit être supérieur à 0");

        fruits.push(Fruit(_name, price, msg.sender));

        emit FruitAdded(name, price, msg.sender);
    }

    function getFruit(uint index) public view returns (string memory, uint, address) {
        require(index < fruits.length, "Fruit inexistant");

        Fruit memory fruit = fruits[_index];
        return (fruit.name, fruit.price, fruit.owner);
    }

    function getFruitsCount() public view returns (uint) {
        return fruits.length;
    }
}