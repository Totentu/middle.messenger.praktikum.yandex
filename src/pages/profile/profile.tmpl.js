import {template as buttonTemplate} from '../../components/button/button.tmpl';

let button_tmpl = Handlebars.compile(buttonTemplate);

export const template=`

<table class="tableframe">
    <tr>
        <td class="tableframe_message" colspan="2">{{title}}</td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="tableframe_large_img"></div>
        </td>
    </tr>
    <tr>
        <td colspan="2">
        </td>
    </tr>

    {{#each fields}}
    <tr>
        <td class="tableframe_profile_td_quation">{{field_title}}:</td>
        <td class="tableframe_profile_td_answer">{{field_value}}</td>
    </tr>
    <tr class="tableframe_profile_tr">
        <td class="tableframe_delimiter" colspan="2"></td>
    </tr>
    {{/each}}
 
    <tr><td></td></tr>
    <tr>
        <td colspan="2" align="center">
            `+button_tmpl({button_href: 'profile_change_data.html',  button_title: 'Изменить данные', onclick_function: ''})+`
            `+button_tmpl({button_href: 'profile_change_pass.html',  button_title: 'Изменить пароль', onclick_function: ''})+`
        </td>
    </tr>
</table>

<a href="main.html"><div class="mainframe_href_standart">Вернуться в список бесед</div></a>
<br>
<a href="login.html"><div class="mainframe_href_emergy">Выйти из профиля</div></a>
`;