<div align="center">
  <h1>Sproxte</h1>
</div>

## Setup Process:

``` bash
# Download repository:
git clone https://github.com/NayeemH/Sproxte.git

# Go to parent directory:
cd Sproxte

# Install dependencies:
npm i

# Start Mongodb database with docker(you can run your local mongodb database)
docker-compose up -d

# Generate public key and private key for tokens
npm run generateKey

# Setup admin(remove database and create admin user)
npm run setup

# Run backend server
npm run dev

```
