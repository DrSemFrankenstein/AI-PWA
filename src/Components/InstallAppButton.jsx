import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // Handling the installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Handle app installation
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      onClick={handleInstallClick}
      disabled={!deferredPrompt}
      style={{ width: "100%" }}
    >
      Install App
    </Button>
  );
}

export default InstallAppButton;
