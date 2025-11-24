# Check if script is run as root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

# Check if certbot is installed
if ! [ -x "$(command -v certbot)" ]; then
    # Install certbot via Snap
    echo "Installing certbot"
    apt-get update && apt-get upgrade -y
    apt-get install snapd -y
    snap install core
    snap install certbot --classic
    ln -s /snap/bin/certbot /usr/bin/certbot
    echo "Certbot installed"
fi

# Check if domain is provided if not ask for it
if [ -z "$1" ]
    then
        echo "Enter domain name:"
        read domain
    else
        domain=$1
fi

# Request certificate
sudo certbot --manual --preferred-challenges dns certonly -d $domain --agree-tos --no-eff-email

# check if request was successful
if [ $? -eq 0 ]
    then
        echo "Certificate request successful"
        cp /etc/letsencrypt/live/$domain/fullchain.pem ./certs/cert.pem
        cp /etc/letsencrypt/live/$domain/privkey.pem ./certs/key.pem
    else
        echo "Certificate request failed"
        exit
fi