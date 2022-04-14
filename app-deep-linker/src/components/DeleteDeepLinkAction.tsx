import { Action, Icon } from "@raycast/api";

export const DeleteDeepLinkAction = (props: { onDelete: () => void }) => {
  return (
    <Action
      icon={Icon.Trash}
      title="Delete Deep Link"
      shortcut={{ modifiers: ["ctrl"], key: "x" }}
      onAction={props.onDelete}
    />
  );
};
