import {template as inputTemplate}  from '../input/input.tmpl';

let input_tmpl = Handlebars.compile(inputTemplate);

export const template=`
<div class="write_panel">
    <div class="button_picture_link"></div>
    `+input_tmpl({field_name: 'message',  class_name: 'writepanel_input', field_value: ''})+`
    <div class="button_picture_send" onclick="console.log({message: message.value})"></div>
</div>
`