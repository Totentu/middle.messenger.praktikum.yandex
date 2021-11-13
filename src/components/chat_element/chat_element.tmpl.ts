export const template = `
<div class="chat_element__photo"></div>
<div class="chat_element__data">
    <div class="chat_element__title">{{title}}</div>
    <div class="chat_element__time">{{time}}</div>
    <div><button class="chat_element__delete">x</button></div>
    <div class="flex_element_break"></div>
    <div class="chat_element__text">{{text}}</div>
    {{#if new}}
    <div class="chat_element__new">{{new}}</div>
    {{/if}}
</div>
`;
