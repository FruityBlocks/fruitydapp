// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewFruitMarketPlace {

    string constant ERROR_USER_NOT_REGISTERED = "User is not registered, you are not allowed to do this action.";
    string constant ERROR_FRUIT_DOES_NOT_EXIST = "The fruit does not exist";
    string constant ERROR_FRUIT_ALREADY_EXISTS = "Fruit already exists.";
    string constant ERROR_NOT_FRUIT_OWNER = "You are not the owner of this fruit";
    string constant ERROR_FRUIT_NOT_FOR_SALE = "This fruit is not for sale!";
    string constant ERROR_CANNOT_BUY_ALREADY_OWNED_FRUIT = "The fruit is already yours.";
    string constant ERROR_INSUFFICIENT_FUNDS = "You do not have enough ETH to buy this fruit.";

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

    Fruit[] private fruits;
    uint256 private nextFruitId = 0;

    mapping(string => bool) private fruitNameExists;
    mapping(address => User) private users;
    mapping(address => uint256[]) private userFruits;
    mapping(uint256 => uint256) private fruitIdToIndex;


    event Registration(address indexed user);
    event FruitAdded(uint256 indexed fruitId, string name, uint256 price);
    event FruitForSale(uint256 indexed fruitId, uint256 price);
    event FruitSold(uint256 indexed fruitId, address indexed seller, address indexed buyer, uint256 price);
    event SellerRated(address indexed seller, address indexed buyer, uint8 rating, string comment);


    function createUser() public {
        if (!users[msg.sender].isRegistered){
            users[msg.sender].isRegistered = true;
            emit Registration(msg.sender);
        }
    }

    function addFruit(string memory _name, uint256 _price) public {
        require(isRegistered(), ERROR_USER_NOT_REGISTERED);
        require(!fruitNameExists[_name], ERROR_FRUIT_ALREADY_EXISTS);

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
        require(fruitExists(_fruitId), ERROR_FRUIT_DOES_NOT_EXIST);
        uint256 index = getIndex(_fruitId);
        require(verifyOwnership(index), ERROR_NOT_FRUIT_OWNER);

        fruits[index].forSale = true;
        fruits[index].price = _price;
        emit FruitForSale(_fruitId, _price);
    }

    function getUserFruits() public view returns (uint256[] memory) {
        require(isRegistered(), ERROR_USER_NOT_REGISTERED);
        return userFruits[msg.sender];
    }

    function getUserFruit(uint256 _fruitId) public view returns (Fruit memory){
        require(isRegistered(), ERROR_USER_NOT_REGISTERED);
        require(fruitExists(_fruitId), ERROR_FRUIT_DOES_NOT_EXIST);
        uint256[] storage ownedFruits = userFruits[msg.sender];
        for (uint256 i = 0; i < ownedFruits.length; i++) {
            if (ownedFruits[i] == _fruitId) {
                uint256 index = getIndex(_fruitId);
                return fruits[index];
            }
        }
        revert(ERROR_NOT_FRUIT_OWNER);
    }

    function getFruitsForSale() public view returns (uint256[] memory) {
        require(isRegistered(), ERROR_USER_NOT_REGISTERED);
        uint256 count = 0;
        for (uint256 i = 0; i < fruits.length; i++) {
            if (fruits[i].forSale) {
                count++;
            }
        }
        uint256[] memory fruitsForSale = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < fruits.length; i++) {
            if (fruits[i].forSale) {
                fruitsForSale[index] = fruits[i].id;
                index++;
            }
        }
        return fruitsForSale;
    }

    function getFruitForSale(uint256 _fruitId) public view returns (Fruit memory){
        require(isRegistered(), ERROR_USER_NOT_REGISTERED);
        require(fruitExists(_fruitId), ERROR_FRUIT_DOES_NOT_EXIST);
        uint256 index = fruitIdToIndex[_fruitId];
        require(isForSale(index), ERROR_FRUIT_NOT_FOR_SALE);
        return fruits[index];
    }

    function buyFruit(uint256 _fruitId) payable public {
        require(isRegistered(), ERROR_USER_NOT_REGISTERED);
        require(fruitExists(_fruitId), ERROR_FRUIT_DOES_NOT_EXIST);
        uint256 index = fruitIdToIndex[_fruitId];
        require(isForSale(index), ERROR_FRUIT_NOT_FOR_SALE);
        require(buyable(index), ERROR_CANNOT_BUY_ALREADY_OWNED_FRUIT);
        
        Fruit storage fruit = fruits[index];
        require(hasFunds(fruit.price), ERROR_INSUFFICIENT_FUNDS);
        address seller = fruit.owner;
        payable(seller).transfer(fruit.price);
        fruit.owner = msg.sender;
        fruit.forSale = false;
        updateSellerFruits(seller, _fruitId);
        userFruits[msg.sender].push(_fruitId);
        emit FruitSold(_fruitId, seller, msg.sender, fruit.price);
    }


    // Private functions 

    function isRegistered() public view returns (bool) {
        return users[msg.sender].isRegistered;
    }

    function buyable(uint256 _index) private view returns (bool){
        return fruits[_index].owner != msg.sender;
    }

    function hasFunds(uint256 _price) private view returns (bool) {
        return msg.value >= _price;
    }

    function fruitExists(uint256 _fruitId) private view returns (bool) {
        if (_fruitId >= nextFruitId) {
            return false;
        }
        uint256 index = getIndex(_fruitId);
        return index < fruits.length && fruits[index].id == _fruitId;
    }

    function updateSellerFruits(address _seller, uint256 _fruitId) private {
        uint256[] storage sellerFruits = userFruits[_seller];
        for (uint256 i = 0; i < sellerFruits.length; i++) {
            if (sellerFruits[i] == _fruitId) {
                sellerFruits[i] = sellerFruits[sellerFruits.length - 1];
                sellerFruits.pop();
                break;
            }
        }
    }

    function verifyOwnership(uint256 _index) private view returns (bool){
        return fruits[_index].owner == msg.sender;
    }

    function getIndex(uint256 _fruitId) private view returns (uint256){
        return fruitIdToIndex[_fruitId];
    }

    function isForSale(uint256 _index) private view returns (bool){
        return fruits[_index].forSale == true;
    }

}