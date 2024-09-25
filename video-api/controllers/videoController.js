const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Function to process media based on URL and optional download flag
exports.processMedia = (req, res) => {
  const { url, download } = req.body;

  exec(
    `python3 /home/chidera/video-api/video-api/scripts/process_video.py "${url}" "${download}"`, // Script to get formats or download
    (error, stdout, stderr) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error processing media", error });
      }

      const result = stdout.trim();
      const fullFilePath = path.resolve(result); // Resolve the file path

      if (stderr) {
        return res.status(500).json({ message: "Error:", stderr });
      }

      // Check if the file exists if downloading
      if (download && !fs.existsSync(fullFilePath)) {
        return res.status(404).json({ message: "File not found" });
      }

      // Return the result (formats or file path)
      return res.status(200).json({ result });
    }
  );
};
