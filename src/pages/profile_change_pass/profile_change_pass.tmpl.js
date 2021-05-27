import {template as buttonTemplate} from '../../components/button/button.tmpl';
import {template as inputTemplate}  from '../../components/input/input.tmpl';

let button_tmpl = Handlebars.compile(buttonTemplate);
let input_tmpl = Handlebars.compile(inputTemplate);

export const template=`

<table class="tableframe">
    <tr>
        <td class="tableframe_message" colspan="2">{{title}}</td>
    </tr>

    {{#each fields}}
    <tr>
        <td class="tableframe_profile_td_quation">{{field_title}}:</td>
        <td>`+input_tmpl({field_name: '{{field_name}}',  class_name: 'tableframe_input', field_value: '{{field_value}}'})+`</td>
    </tr>
    <tr class="tableframe_profile_tr">
        <td class="tableframe_delimiter" colspan="2"></td>
    </tr>
    {{/each}} 

    <tr><td></td></tr>
    <tr>
        <td colspan="2">
            `+button_tmpl({button_href: 'profile.html',    button_title: 'Сохранить',
onclick_function: 'console.log({oldPassword: oldPassword.value, newPassword: newPassword.value})'
                          }
                )+`
            `+button_tmpl({button_href: 'profile.html',button_title: 'Отмена',onclick_function: ''})+`
        </td>
    </tr>
</table>
`;