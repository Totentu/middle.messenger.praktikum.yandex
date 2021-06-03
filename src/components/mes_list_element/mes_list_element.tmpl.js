export const template=` 
{{#if mes_author}}
<div class="mes_list_others">
{{else}} 
<div class="mes_list_yours">
{{/if}}

<table width="100%">
    <tr>
        <td class="mes_list_author">{{mes_author}}</td>
        <td class="mes_list_time">{{mes_time}}</td>
    </tr>
    <tr>
        <td class="mes_list_text" colspan="2">{{mes_text}}</td>
    </tr>
</table>
</div> 
`