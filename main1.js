function DisplayTodo() {

    var tab = JSON.parse(localStorage.getItem("tabtodo"));
    var tabloguser = JSON.parse(localStorage.getItem("logUser"));


    var html = ` <table id="mytab">
    <thead>
        <tr >
            <th>Taskname</th>
            <th>Deadline</th>
            <th>Remaining time</th>
            <th>Action</th>

        </tr>
    </thead>
    <tbody>`
        ;
    for (i = 0; i < tab.length; i++) {
        
        if (tab[i].id == tabloguser.id) {



            var s = Math.round((Date.parse(tab[i].Deadline) - Date.now()) / (1000));
 
            
            var heure   = s / 60 / 60 ;
            var minute  = (s / 60 )% 60;
            var seconde = s % 60;

            var d = new Date(tab[i].Deadline);
            

            var v =  d.toDateString(); 
            var f=v.substring(4,v.length);

          


         
            html += `<tr>
                    <td >`+ tab[i].Taskname + `</td>
                     <td >`+ f +` </td>
                     <td > ` + Math.round(heure) + `:  ` + Math.round(minute) + `: ` + seconde + `  </td>
                     <td > <button class="bmod" onclick="modify(${tab[i].idtodo})" >Modify</button> <button class="bmod" onclick="delet(` + tab[i].idtodo + `)">Delete</button> </td>
                 </tr>`
        }
    }



    html += `</tbody>
    </table>`;
    document.getElementById('deusieme').innerHTML = html;


}
setInterval("DisplayTodo()",1000);
setInterval("DisplayTodo()",1000,60);