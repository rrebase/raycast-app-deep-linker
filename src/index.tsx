import { useCallback, useEffect, useState } from "react";
import { ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import { Filter, DeepLink } from "./types";
import { CreateDeepLinkAction, DeleteDeepLinkAction, EmptyView, OpenDeepLinkAction } from "./components";

type State = {
  filter: Filter;
  isLoading: boolean;
  searchText: string;
  deepLinks: DeepLink[];
};

export const Command = () => {
  const [state, setState] = useState<State>({
    filter: Filter.All,
    isLoading: true,
    searchText: "",
    deepLinks: [],
  });

  useEffect(() => {
    (async () => {
      const storedDeepLinks = await LocalStorage.getItem<string>("deepLinks");

      if (!storedDeepLinks) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return;
      }

      try {
        const deepLinks: DeepLink[] = JSON.parse(storedDeepLinks);
        setState((previous) => ({ ...previous, deepLinks, isLoading: false }));
      } catch (e) {
        // can't decode deepLinks
        setState((previous) => ({ ...previous, deepLinks: [], isLoading: false }));
      }
    })();
  }, []);

  useEffect(() => {
    LocalStorage.setItem("deepLinks", JSON.stringify(state.deepLinks));
  }, [state.deepLinks]);

  const handleCreate = useCallback(
    (title: string) => {
      const newDeepLinks = [...state.deepLinks, { id: title, title }];
      setState((previous) => ({ ...previous, deepLinks: newDeepLinks, filter: Filter.All, searchText: "" }));
    },
    [state.deepLinks, setState]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newDeepLinks = [...state.deepLinks];
      newDeepLinks.splice(index, 1);
      setState((previous) => ({ ...previous, deepLinks: newDeepLinks }));
    },
    [state.deepLinks, setState]
  );

  return (
    <List
      isLoading={state.isLoading}
      searchText={state.searchText}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Deep Link List"
          value={state.filter}
          onChange={(newValue) => setState((previous) => ({ ...previous, filter: newValue as Filter }))}
        >
          <List.Dropdown.Item title="All" value={Filter.All} />
        </List.Dropdown>
      }
      enableFiltering
      onSearchTextChange={(newValue) => {
        setState((previous) => ({ ...previous, searchText: newValue }));
      }}
    >
      <EmptyView
        filter={state.filter}
        deepLinks={state.deepLinks}
        searchText={state.searchText}
        onCreate={handleCreate}
      />
      {state.deepLinks.map((deepLink, index) => (
        <List.Item
          key={deepLink.id}
          icon={Icon.ArrowRight}
          title={deepLink.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <OpenDeepLinkAction deepLink={deepLink} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateDeepLinkAction onCreate={handleCreate} />
                <DeleteDeepLinkAction onDelete={() => handleDelete(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default Command;
