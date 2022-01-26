const configID = "YOUR_ID";

const ignoreDomainsSet = new Set([
  "clients.l.google.com",
  "clients1.google.com",
  "clients2.google.com",
  "clients3.google.com",
  "clients4.google.com",
  "clients5.google.com",
  "clients6.google.com",
  "akamaiedge.net",
]);

const youtubeAdDomainsSet = new Set();

const stringToHex = (str) =>
  str
    .split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");

const fetchEwprattenDomains = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/Ewpratten/youtube_ad_blocklist/master/blocklist.txt"
  );
  const text = await response.text();
  text.split("\n").forEach((line) => youtubeAdDomainsSet.add(line));
  return;
};

const fetchkboghdadyDomains = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt"
  );
  const text = await response.text();
  text.split("\n").forEach((line) => youtubeAdDomainsSet.add(line));
  return;
};

const fetchGoodbyeAdsDomains = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Formats/GoodbyeAds-YouTube-AdBlock-Filter.txt"
  );
  const text = await response.text();
  text.split("\n").forEach((line) => {
    if (line.startsWith("||") && line.endsWith("^")) {
      const domain = line.substring(2, line.length - 1);
      youtubeAdDomainsSet.add(domain);
    }
  });
  return;
};

const blockDomain = async (domain) =>
  fetch(
    `https://api.nextdns.io/configurations/${configID}/denylist/hex:${stringToHex(
      domain
    )}`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9,pt-PT;q=0.8,pt;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua":
          '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "https://my.nextdns.io/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "PUT",
      mode: "cors",
      credentials: "include",
    }
  );

const blockDomains = async () => {
  console.log(`Downloading domains to block ...`);
  await fetchEwprattenDomains();
  await fetchkboghdadyDomains();
  await fetchGoodbyeAdsDomains();
  const youtubeAdDomains = Array.from(youtubeAdDomainsSet);
  console.log(`Preparing to block ${youtubeAdDomains.length} domains`);
  for (let idx = 0; idx < youtubeAdDomains.length; idx++) {
    if (ignoreDomainsSet.has(youtubeAdDomains[idx])) {
      console.log(
        `Skipping ${youtubeAdDomains[idx]} ${idx}/${youtubeAdDomains.length}`
      );
      continue;
    }

    try {
      console.log(
        `Blocking ${youtubeAdDomains[idx]} ${idx}/${youtubeAdDomains.length}`
      );
      await blockDomain(youtubeAdDomains[idx]);
      await new Promise(r => setTimeout(r, 150));
    } catch (error) {
      console.error(error);
    }
  }
  console.log("Have fun!");
};

blockDomains();
