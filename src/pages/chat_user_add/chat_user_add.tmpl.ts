export const template = `
<div class="form__title">{{title}}</div>
<div class="flex_element_break"></div>
<node id='inpSearch'></node>
<node id='btnSearch'></node>

{{#if UserID}}
    <div class="flex_element_break"></div>
    <div class="form__fields">
        {{#each fieldsNodes}}
            <div class="form__label">{{field_title}}</div>
            {{{input_node}}}
            <div class="flex_element_break"></div>
            {{{input_error}}}
            <div class="flex_element_break"></div>
        {{/each}}
    </div>
    <div class="flex_element_break"></div>
    <div class="form__buttons">
        {{#each buttonsNodes}}
            {{{button_node}}}
        {{/each}}
    </div>
    <div class="flex_element_break"></div>
    <node id='btnAddUser'></node>
{{/if}}
`;
