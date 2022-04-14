import { Action, Icon } from "@raycast/api";
import { CreateDeepLinkForm } from "./CreateDeepLinkForm";

export const CreateDeepLinkAction = (props: { defaultTitle?: string; onCreate: (title: string) => void }) => {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Deep Link"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateDeepLinkForm defaultTitle={props.defaultTitle} onCreate={props.onCreate} />}
    />
  );
};
