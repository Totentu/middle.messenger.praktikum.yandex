export const template = `
<div class="form__title">{{title}}</div>

<div class="flex_element_break"></div>
<div class="form__label">Текущий аватар</div>
<div id='lblNewAvatar' class="form__label" style="display: none;">Новый аватар</div>

<div class="flex_element_break"></div>
<img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" width=200px alt="Аватар">
<img id="newAvatar"  src="" width=200px style="display: none;" alt="Аватар">

<div class="flex_element_break"></div>
<label for="inpAvatar" class="form__label_for_file">Выбрать аватар</label>
<node id='inpAvatar'></node>
<node id='btnSetAvatar'></node>
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
`;
