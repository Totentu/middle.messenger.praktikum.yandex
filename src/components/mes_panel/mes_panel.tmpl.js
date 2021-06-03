import {template as mes_list_elementTemplate}  from '../mes_list_element/mes_list_element.tmpl';

let mes_list_element_tmpl = Handlebars.compile(mes_list_elementTemplate);

export const template=`
<div class="mainframe_mespanel">
    <div class="mes_list_author">Беседа 1</div>
    <hr>
    {{#each messages}}
        {{#if mes_author}}
            `+mes_list_element_tmpl({
                mes_author: '{{mes_author}}',
                mes_time: '{{mes_time}}',
                mes_text: '{{mes_text}}',
            })+`
        {{else}}
            `+mes_list_element_tmpl({
                mes_author: null,
                mes_time: '{{mes_time}}',
                mes_text: '{{mes_text}}',
            })+`     
        {{/if}}   
    {{/each}}
</div>
`