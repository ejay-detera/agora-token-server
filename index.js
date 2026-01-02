const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const app = express();
app.use(cors());

const APP_ID = "89b8d047e07446108b52738ce92d98ec";
const APP_CERTIFICATE = "df9216d732a540d880de37b958414a2d";

app.get("/rtc-token", (req, res) => {
  const channelName = req.query.channel;
  const uid = req.query.uid || 0;

  if (!channelName) {
    return res.status(400).json({ error: "channel is required" });
  }

  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  res.json({ token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Agora token server running on port ${PORT}`);
});
