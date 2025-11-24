# Advanced Discord Verification Bot

A powerful, customizable, and security-focused Discord verification bot using OAuth2, IP protection, automatic role assignment, and advanced security checks.  
Designed for communities that require a modern, automated, and secure verification system.

## Features

### OAuth2-Based Verification
- Secure Discord login
- Supports identify, email, guilds.join and more
- Automatic redirect generation (with or without proxy)
- Optional Guild Join permission for emergency recovery

### Customizable Embed System
- Fully editable titles, descriptions, colors
- Custom fields, banners, images
- Buttons: Verify (Join), Verify (No Join), FAQ
- Configurable author and footer

### Verification Modes
1. Verify (With Guild Join)  
   Allows the bot to re-add users if Discord removes your server.

2. Verify (No Guild Join)  
   Verifies users without giving the bot guild joining permissions.

### Built-In FAQ System
Provides answers related to:
- Why verification is required
- What data is collected
- Privacy and security
- IP hashing
- Data removal
- Guild join permissions

### Security Layer
Includes multiple verification protection systems:

#### Account Security
- Minimum account age check  
- Ban, kick, or none

#### Guild Blacklist
- Blocks users from specified guilds  
- Auto-ban support

#### IP Protection
Detects:
- VPN
- Proxy
- TOR
- Relays
- ISP blacklist (optional)

#### Geolocation
- Country blacklist  
- Auto-ban

#### Discord Account Security
- User must be Discord-verified
- MFA optional

### Role Controls
- Add roles on verification
- Remove roles on verification
- Staff bypass roles

### Logging System
Logs verification attempts and security actions:
- User ID  
- Username  
- Action  
- Reason  
- Timestamp  
- Color-coded log types (verify, unverify, kick, ban)

### Bot Activity Rotation
- Custom statuses
- Rotation interval
- Watching, Playing, Competing supported

## Installation

### 1. Clone the Repository
git clone https://github.com/your/repo.git
cd repo

### 2. Install Dependencies
npm install

### 3. Create .env File
Create a file named .env and insert:
TOKEN=YOUR_BOT_TOKEN
CLIENT_SECRET=YOUR_DISCORD_CLIENT_SECRET

### 4. Configure the Bot
Edit the config.js file to adjust:
- Server IP/domain  
- Port  
- Proxy settings  
- OAuth2 client ID  
- Roles  
- Embeds  
- Security settings  
- Logging

### 5. Start the Bot
npm start

## Proxy / Reverse Proxy Support

The bot automatically generates the correct OAuth2 redirect URL based on:
- IP or domain
- HTTPS or HTTP
- Proxy enabled or disabled

No manual redirect configuration required.

## Configuration Overview

Main sections inside config.js:

### Bot
- Token  
- Avatar and name override  
- Embed color  
- Activity rotation

### Server
- IP or domain  
- Port  
- HTTPS  
- Proxy forwarding  
- OAuth2 settings

### Verification
- Embed text  
- Images  
- Buttons  
- FAQ  
- Roles  
- Bypass roles

### Security
- Account age  
- Guild blacklist  
- IP checks  
- Geolocation  
- Discord verification settings

### Logging
- Log channel  
- Log colors  
- Log embed design

## Data Privacy

This bot does not share or sell any data.  
All IP addresses are hashed and anonymized.

Collected information:
- Discord email  
- Hashed IP  
- Country and region  
- User guilds  

Used only for:
- Security  
- Fraud protection  
- Product ownership (if combined with panels)

## Contributing

Pull requests are welcome.  
Improvements, new features, and extended security layers are appreciated.

## License

Add your preferred license (MIT recommended).
