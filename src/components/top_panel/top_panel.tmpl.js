import {template as inputTemplate}  from '../input/input.tmpl';

let input_tmpl = Handlebars.compile(inputTemplate);

export const template=`
<div class="mainframe_toppanel">
    <table class="clear_table_frame">
        <tr>
            <td><a href="profile.html"><div class="button_picture_profile"></div></a></td>
            <td>`+input_tmpl({field_name: 'inp_search',  class_name: 'toppanel_input', field_value: ''})+`</td>
            <td><a href="main.html"><div class="button_picture_search"></div></a></td>
        </tr>
    </table>
</div>
`