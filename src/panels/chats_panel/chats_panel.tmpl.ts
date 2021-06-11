export const template = `
<div class="chats_panel__search_panel">
<node id="searchInput"></node>
<node id="searchBtnImg"></node>
</div>
{{#each chats}} 
    {{{chat_node}}}
{{/each}} 
`;
