require("dotenv").config();
const tmi = require("tmi.js");
const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();

obs
  .connect()
  .then(() => {
    console.log("OBS websocket connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

// You must add this handler to avoid uncaught exceptions.
obs.on("error", (err) => {
  console.error("socket error:", err);
});

/**
 * Returns an array of scene names that start with '!'.
 * @returns An array of available scene namesexpect(value).to.throw(error);
 */
const getAvailableScenes = async () => {
  const rawScenes = await obs.send("GetSceneList");
  const availableScenes = rawScenes.scenes
    .filter((scene) => scene.name.startsWith("!"))
    .map((scene) => scene.name.slice(1));
  return availableScenes;
};

const tmiOpts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};
const twitchClient = new tmi.client(tmiOpts);
twitchClient.connect();
twitchClient.on("connected", (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});

twitchClient.on("message", async (channel, tags, message, self) => {
  if (self || !message.startsWith(process.env.COMMAND_PREFIX)) return;

  const args = message.slice(1).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "scenes") {
    const availableScenes = await getAvailableScenes();
    twitchClient.say(
      channel,
      `Available scenes: ${availableScenes.join(", ")}`
    );
  }

  if (command === "change-scene") {
    const sceneName = args.join(" ");
    const scenes = await getAvailableScenes();
    if (scenes.includes(sceneName)) {
      await obs.send("SetCurrentScene", { "scene-name": `!${sceneName}` });
    }
  }
});
