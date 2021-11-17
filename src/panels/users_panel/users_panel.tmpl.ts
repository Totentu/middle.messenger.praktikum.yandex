export const template = `
{{#if usersNodes}}
    <div class="users_panel__title_text">
    Участники беседы
    {{#each hrefsNodes}} 
        {{{href_node}}}
    {{/each}} 
    </div>
    {{#each usersNodes}} 
        {{{user_node}}}
    {{/each}} 
{{/if}}
`;
