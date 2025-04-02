// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewFruitMarketPlace {

    struct Fruit {
        uint256 id;
        string name;
        uint256 price;
        address owner;
        bool forSale;
    }

    struct UserRating {
        address buyer;
        string comment;
        uint8 rating;
    }

    struct User {
        bool isRegistered;
        UserRating[] ratings;
    }

    Fruit[] public fruits;
    uint256 private nextFruitId = 0;

    mapping(string => bool) public fruitNameExists;
    mapping(address => User) public users;
    mapping(address => uint256[]) public userFruits;
    mapping(uint256 => uint256) public fruitIdToIndex;


    event Registration(address indexed user);
    event FruitAdded(uint256 indexed fruitId, string name, uint256 price);
    event FruitForSale(uint256 indexed fruitId, uint256 price);
    event FruitSold(uint256 indexed fruitId, address indexed seller, address indexed buyer, uint256 price);
    event SellerRated(address indexed seller, address indexed buyer, uint8 rating, string comment);


    function isRegistered() public view returns (bool) {
        return users[msg.sender].isRegistered;
    }


    function createUser() public {
        if (!users[msg.sender].isRegistered){
            users[msg.sender].isRegistered = true;
            emit Registration(msg.sender);
        }
    }

    function addFruit(string memory _name, uint256 _price) public {
        require(isRegistered(), "User is not registered, you are not allowed to do this action.");
        require(!fruitNameExists[_name], "Fruit already exists.");

        uint256 fruitId = nextFruitId++;
        fruitNameExists[_name] = true;
        fruitIdToIndex[fruitId] = fruits.length;
        fruits.push(Fruit({
            id: fruitId,
            name: _name,
            price: _price,
            owner : msg.sender,
            forSale: false
        }));
        userFruits[msg.sender].push(fruitId);
        emit FruitAdded(fruitId, _name, _price);
    }

    function sellFruit(uint256 _fruitId, uint256 _price) public {
        require(fruitIdToIndex[_fruitId] < fruits.length, "The fruit does not exist");
        uint256 index = fruitIdToIndex[_fruitId];
        require(fruits[index].owner == msg.sender, "You are not the owner of this fruit");

        fruits[index].forSale = true;
        fruits[index].price = _price;
        emit FruitForSale(_fruitId, _price);
    }

}