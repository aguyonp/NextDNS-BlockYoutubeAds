# NextDNS-BlockYoutubeAds

## Usage
Container that automatically add Youtube ADS domains to your NextDNS blacklist

## How it work
The container makes API calls to Next DNS and establishes a block list based on a REGEX

## How to use
docker run -e NEXTDNS_USERNAME=YOUR_EMAIL -e NEXTDNS_PASSWORD=YOUR_PASSWORD -e NEXTDNS_CONFID=YOUR CONFID aguyonnet/nextdns-youtube-block

### Notes:
You can find your ID in the URL of your Browser

### Env vars:

NEXTDNS_USERNAME=YOUR_EMAIL</br>
NEXTDNS_PASSWORD=YOUR_PASSWORD</br>
NEXTDNS_CONFID=YOUR CONFID</br>

