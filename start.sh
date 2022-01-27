echo "Setting up container"

if [ -z $NEXTDNS_USERNAME ] || [ -z $NEXTDNS_PASSWORD ] || [ -z $NEXTDNS_CONFID ]
then
    echo "You must specify NEXTDNS_USERNAME & NEXTDNS_PASSWORD & NEXTDNS_CONFID"
else
    echo "Setting up API Settings"
    sed -i 's#nextdns_username=".*"#nextdns_username="'$NEXTDNS_USERNAME'"#' app.py
    sed -i 's#nextdns_password=".*"#nextdns_password="'$NEXTDNS_PASSWORD'"#' app.py
    sed -i 's#nextdns_confid=".*"#nextdns_confid="'$NEXTDNS_CONFID'"#' app.py

    echo "Starting APP"
    python3 app.py
fi
