const axios = require("axios");
const fs = require("fs");
const yaml = require("js-yaml");

const API_KEY = process.env.SWAGGERHUB_KEY;

const openAPIPath = "./docs/openapi.yml";
const owner = "smizell";
const api = "connect-2020";
const version = getVersion();

const PUBLISH_URL = `https://api.swaggerhub.com/apis/${owner}/${api}/${version}/settings/lifecycle?force=false`;
const MARK_DEFAULT_URL = `https://api.swaggerhub.com/apis/${owner}/${api}/settings/default`;

function getVersion() {
  const doc = yaml.safeLoad(fs.readFileSync(openAPIPath, "utf8"));
  return doc.info.version;
}

async function publish() {
  try {
    // Publish
    console.log(`Publishing ${version}`);
    await axios({
      url: PUBLISH_URL,
      method: "PUT",
      headers: {
        authorization: API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        published: true,
      },
    });

    console.log(`Marking ${version} as default`);
    await axios({
      url: MARK_DEFAULT_URL,
      method: "PUT",
      headers: {
        authorization: API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        version,
      },
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  console.log("Complete!");
}

(async function () {
  await publish();
})();
