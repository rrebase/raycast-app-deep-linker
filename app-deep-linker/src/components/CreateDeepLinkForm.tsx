import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";

export const CreateDeepLinkForm = (props: { defaultTitle?: string; onCreate: (title: string) => void }) => {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { title: string }) => {
      onCreate(values.title);
      pop();
    },
    [onCreate, pop]
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Deep Link" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" defaultValue={defaultTitle} title="Scheme" placeholder="boltfood://profile" />
    </Form>
  );
};
