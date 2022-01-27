from nextdnsapi.api import *
import sys, time

#Configurations
nextdns_username=""
nextdns_password=""
nextdns_confid=""

#API Auth
header = account.login(nextdns_username, nextdns_password)

#Open Domains File
blacklistfile = open('blacklist_domains.txt', 'r')
domains = blacklistfile.readlines()

#Use API to add domains on NEXTDNS
count_domains = 0
for domain in domains:
    count_domains += 1

    print(denylist.blockdomain(domain.strip(), nextdns_confid, header))
    sys.stdout.flush()
    time.sleep(1)

#Close file 
blacklistfile.close()

print(count_domains, " Added to blacklist")
print("Done, exiting app")