# FruityBlocks DApp

A Marketplace to buy and sell NFTs on the Ethereum network!

## Backend Setup

### Prerequisites
- Node.js and npm installed
- Hardhat development environment

### Setup Instructions

1. **Install backend dependencies**
   ```bash
   npm install
   ```

2. **Start your local Hardhat node**
   ```bash
   npx hardhat node --port 8544
   ```
   > **Important**: You must specify port 8544

3. **Compile the smart contracts**
   ```bash
   npx hardhat compile
   ```

4. **Deploy the contract**
   ```bash
   npx hardhat ignition deploy ignition/modules/<BUILD_FILE>.js --network localhost
   ```

5. **Save the deployed contract address**
   - Copy the deployed contract address from the terminal output
   - You'll need this for the frontend configuration

## Frontend Setup

### Prerequisites
- Node.js and npm installed
- MetaMask wallet extension

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the client directory**
   ```bash
   cd client
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   Create a `.env` file in the client directory with the following content:
   ```
   VITE_DEPLOYED_ADDRESS="<DEPLOYED_CONTRACT_ADDRESS>"
   ```
   > Replace `<DEPLOYED_CONTRACT_ADDRESS>` with the address you copied after deploying the contract

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open your browser and go to: http://localhost:3000/
   - Connect MetaMask to the application
   - Ensure MetaMask is configured with:
     - Network URL: `localhost:8544`
     - Chain ID: `31337`

7. **Start using FruityBlocks!**