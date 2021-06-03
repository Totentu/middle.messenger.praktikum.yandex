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
        <td>{{field_title}}:</td>
        <td>`+input_tmpl({field_name: '{{field_name}}',  class_name: 'tableframe_input', field_value: '{{field_value}}'})+`
    </tr>
    {{/each}} 

    <tr><td></td></tr>
    <tr>
        <td colspan="2">
            `+button_tmpl({button_href: 'main.html',    button_title: 'Войти',
                           onclick_function: 'console.log({login: login.value, password: password.value})'
                          }
                )+`
            `+button_tmpl({button_href: 'registry.html',button_title: 'Регистрация',onclick_function: ''})+`
        </td>
    </tr> 
</table> 
`
