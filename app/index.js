// packages
const { send } = require("micro");
const Router = require("router");
const finalhandler = require("finalhandler");

// mine
const serveStatic = require("./micro-static");
const html = require("./serve-html");
const socialServices = require("../social.json");
const tracker = require("./tracker");

const router = new Router();

const serveNotFound = (req, res) => send(res, 404, { error: "Not found" });

const goSocial = (req, res) => {
  const service = req.params.social;
  const url = socialServices[service];
  if (!url) {
    return serveNotFound(req, res);
  }

  res.setHeader("Location", url);

  return send(res, 302, url);
};

const serveRobotsText = (req, res) =>
  send(res, 200, "User-agent: *\r\nAllow: /");

router.get("/", html("index.html"));
router.get("/on/:social", goSocial);
router.get(
  "/static/:asset",
  serveStatic({
    source: "./assets"
  })
);
router.get("/clicks", tracker.deliver);
router.get("/robots.txt", serveRobotsText);
router.get("/*", serveNotFound);

module.exports = (req, res) => {
  tracker.track(req);
  router(req, res, finalhandler(req, res));
};
