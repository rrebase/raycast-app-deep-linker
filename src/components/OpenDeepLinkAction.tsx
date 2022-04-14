import { useCallback } from "react";
import { Action, Icon } from "@raycast/api";
import { DeepLink } from "../types";
import { showToast, Toast } from "@raycast/api";

import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export const OpenDeepLinkAction = (props: { deepLink: DeepLink }) => {
  const onAction = useCallback(async () => {
    const cmd = `xcrun simctl openurl booted "${props.deepLink.title}"`;

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: `Running \`${cmd}\``,
    });

    try {
      await execAsync(cmd);
      toast.style = Toast.Style.Success;
      toast.title = `Opened ${props.deepLink.title}`;
    } catch (err) {
      toast.style = Toast.Style.Failure;
      toast.title = `Failed to open ${props.deepLink.title}`;
      toast.message = String(err);
    }
  }, []);

  return <Action icon={Icon.Hammer} title="Run Deep Link" onAction={onAction} />;
};
