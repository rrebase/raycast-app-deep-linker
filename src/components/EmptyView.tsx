import { ActionPanel, List } from "@raycast/api";
import { Filter, DeepLink } from "../types";
import { CreateDeepLinkAction } from "./CreateDeepLinkAction";

export const EmptyView = (props: {
  deepLinks: DeepLink[];
  filter: Filter;
  searchText: string;
  onCreate: (title: string) => void;
}) => {
  if (props.deepLinks.length > 0) {
    return (
      <List.EmptyView
        icon="😕"
        title="No matching deep links found"
        description={`Can't find a deep link matching ${props.searchText}.\nCreate it now!`}
        actions={
          <ActionPanel>
            <CreateDeepLinkAction defaultTitle={props.searchText} onCreate={props.onCreate} />
          </ActionPanel>
        }
      />
    );
  }
  switch (props.filter) {
    case Filter.All:
    default: {
      return (
        <List.EmptyView
          icon="🔗"
          title="No deep links found"
          description="You don't have any deep links yet. Why not add some?"
          actions={
            <ActionPanel>
              <CreateDeepLinkAction defaultTitle={props.searchText} onCreate={props.onCreate} />
            </ActionPanel>
          }
        />
      );
    }
  }
};
