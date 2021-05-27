export const template=`
<table class="mainframe_chatlist">
    <tr>
        <td rowspan="2"><div class="mainframe_chatlist_img" style="background-image: url(/static/img/{{chat_photo}})"></div></td>
        <td class="mainframe_chatlist_title">{{chat_title}}</td>
        <td class="mainframe_chatlist_time">{{chat_time}}</td>
    </tr>
    <tr>
        <td class="mainframe_chatlist_text">{{chat_text}}</td>
        <td class="mainframe_chatlist_new_box">
            {{#if chat_new}}
            <div class="mainframe_chatlist_new">{{chat_new}}</div>
            {{/if}}
        </td>
    </tr>
</table>

`