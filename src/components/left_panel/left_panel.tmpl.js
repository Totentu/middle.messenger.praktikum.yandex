import {template as chat_list_elementTemplate} from '../chat_list_element/chat_list_element.tmpl';

let chat_list_element_tmpl = Handlebars.compile(chat_list_elementTemplate);

export const template=`
<div class="mainframe_leftpanel">
    {{#each chats}}
        {{#if chat_new}}
        `+chat_list_element_tmpl({
            chat_photo: '{{chat_photo}}',
            chat_title: '{{chat_title}}',
            chat_time: '{{chat_time}}',
            chat_text: '{{chat_text}}',
            chat_new: '{{chat_new}}',
        })+`
        {{else}}
        `+chat_list_element_tmpl({
            chat_photo: '{{chat_photo}}',
            chat_title: '{{chat_title}}',
            chat_time: '{{chat_time}}',
            chat_text: '{{chat_text}}',
            chat_new: null,
        })+`
        {{/if}}
    {{/each}}
</div>
`