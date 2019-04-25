function verif() {

    var res = 1;

    var a = document.getElementById("user").value;
    var c = "username valide";

    if (a == "") { res = 0; c = "username unvalide"; }


    for (i = 0; i < a.length; i++) {

        if (a[i] == " ") { (c = "username unvalide"); res = 0; }


    }

    console.log(c);
    return res;
}


function verifemail() {


    var res = 0;
    var email = document.getElementById("email").value;
    var resultat = "mail unvalide";
    var indAt = email.indexOf('@');
    var indPt = email.indexOf('.', indAt);
    if (indAt > -1 && indPt > -1) {

        resultat = "mail valide";
        res = 1;
    }
    console.log(resultat);
    return res;


}

function verifdate() {
    var res = 0;
    var birth = document.getElementById("birth").value;
    var d = new Date();
    var diff = new Date(birth);  /* ca veut dire on a change type de birth from string to date*/
    var age = Math.round((Math.abs(d - diff)) / (1000 * 60 * 60 * 24 * 365));


    if (age < 18 || birth == "") {
        console.log(" age non valide : mineur");
        res = 0;
    }
    else {
        console.log(" age valide : major");
        res = 1;


    }
    return res;
}

function verifpassw() {

    var password = document.getElementById("passw").value;

    var resultat = 0;
    var res = 0;

    if (password.length >= 8) {

        res = 1;
        for (i = 0; i < password.length; i++) {

            if (maj(password) == true) { resultat++; }

            if (chiff(password) == true) { resultat++; }

            if (carS(password) == true) { resultat++; }


            if (resultat == 1 || resultat == 0) { document.getElementById('pargh').innerHTML = "Password faible"; } //pour afficher le msg en html
            if (resultat == 2) { document.getElementById('pargh').innerHTML = "Password Moyen"; }
            if (resultat == 3) { document.getElementById('pargh').innerHTML = "Password Fort"; }
            console.log("passsword valide")
            break;
        }
    }
    else { document.getElementById('pargh').innerHTML = "Password must be at least 8 characters"; }


    return res;
}


function maj(pass) {
    var resultat = false;
    var chaineCS = "²&é'(-è_çà)=/*-+.!:;,n@#{[}]\` `|[{€¤µ%§<>";
    for (i = 0; i < pass.length; i++) {
        if (pass[i] == pass[i].toUpperCase()
            && isNaN(pass[i]) == true
            && chaineCS.indexOf(pass[i]) == -1) {

            resultat = true;
        }
    }

    return resultat;
}

function chiff(pass) {
    var resultat = false;
    var chaineCS = "²&é'(-è_çà)=/*-+.!:;,n@#{[}]\` `|[{€¤µ%§<>";
    for (i = 0; i < pass.length; i++) {

        if (isNaN(pass[i]) == false && chaineCS.indexOf(pass[i]) == -1) {

            resultat = true;
        }
    }

    return resultat;
}

function carS(pass) {
    var chaineCS = "²&é'(-è_çà)=/*-+.!:;,n @#{[}]\``|[{€¤µ%§<>";
    var resultat = false;

    for (i = 0; i < pass.length; i++) {

        if (chaineCS.indexOf(pass[i]) > -1) {

            resultat = true;
            break;
        }
    }

    return resultat;
}

function locS() {

    var Username; //= document.getElementById("user").value;
    var Email; //= document.getElementById("email").value;
    var Pass; // document.getElementById("passw").value;
    var Birth; //= document.getElementById("birth").value;

    if (verif() == 1) { Username = document.getElementById("user").value; }
    else {
        document.getElementById('msg').innerHTML += " Username invalide";

    }

    if (verifemail() == 1) { Email = document.getElementById("email").value; }
    else { document.getElementById('msg').innerHTML += "  /E-mail invalide"; }

    if (verifdate() == 1) { Birth = document.getElementById("birth").value; }
    else { document.getElementById('msg').innerHTML += "  /Age invalide"; }

    if (verifpassw() == 1) { Pass = document.getElementById("passw").value; }
    else { document.getElementById('msg').innerHTML += " /Password must be at least 8 characters"; }




    if (verifdate() == 1 && verifemail() == 1 && verif() == 1 && verifpassw() == 1) {
        var user = {
            username: Username,
            email: Email,
            pass: Pass,
            birth: Birth,
            id: Math.random()
        }

        var tab = JSON.parse(localStorage.getItem("tabuser"));           /* on a pris et envoyer (get) le tableau (tabuser) qui est enregistré en localstorage  
                                                                         vers ficher  js pour mettre nos objets (user) via json.parse*/
        /*getitem just with the (key)*/

        if (tab == null) {
            tab = [];
        }
        tab.push(user);

        localStorage.setItem("tabuser", JSON.stringify(tab));            /*envoi le tableau vers localstorage via (set) en le changeant en chaine via json.stringify*/
        /*setitem with key et value(nom et valeur) */
        alert('You are registered ');
    }
}



function verifuser() {

    var res = false;
    var login = document.getElementById("log").value;
    var password = document.getElementById("mdp").value;
    var tab = JSON.parse(localStorage.getItem("tabuser"));

    for (i = 0; i < tab.length; i++) {
        if (login == tab[i].username && password == tab[i].pass) {
            localStorage.setItem("logUser", JSON.stringify(tab[i]));

            res = true;

        }

    }

    if (res == true) {
        location.href = "dashbord.html";
    }
    else { alert("vous n'étes pas inscrit"); }
}


function save() {
    var tabloguser = JSON.parse(localStorage.getItem("logUser"));
    var taskname = document.getElementById("task").value;
    var deadline = document.getElementById("dead").value;

    deadline = new Date(deadline);

    var todo = {
        Taskname: taskname,
        Deadline: deadline,
        id: tabloguser.id,
        idtodo: Math.random()
    }

    var tab = JSON.parse(localStorage.getItem("tabtodo"));

    if (tab == null) {
        tab = [];
    }
    tab.push(todo);

    localStorage.setItem("tabtodo", JSON.stringify(tab));

}


function display() {
    document.getElementById("deusieme").style.display = "none";
    document.getElementById("premiere").style.display = "block";

}
function display1() {
    document.getElementById("premiere").style.display = "none";
    document.getElementById("deusieme").style.display = "block";
    DisplayTodo();

}

/*function DisplayTodo() {

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
setInterval("DisplayTodo()",1000,60);*/






function logout() {
    location.href = "login.html";
}
function delet(supp) {

    var tab = JSON.parse(localStorage.getItem("tabtodo"));
    for (i = 0; i < tab.length; i++) {
        if (supp == tab[i].idtodo) {
            tab.splice(i, 1);

        }
    }

    localStorage.setItem("tabtodo", JSON.stringify(tab));
    DisplayTodo()

}
function modify(idTodo) {

    var tab = JSON.parse(localStorage.getItem("tabtodo"));
    var a;
    var b;
    for (i = 0; i < tab.length; i++) {
        if (idTodo == tab[i].idtodo) {
            a = tab[i].Taskname;
            b = tab[i].Deadline;

        }

    }

    var html = "";
    html += `<input id="tas" value=` + a + ` /><br>
    <input id="ded" type="date" value=`+ b + ` /><br>
    <button type="button" onclick="enregistrer(`+ idTodo + `)">Save</button> `


    document.getElementById('divmodif').innerHTML = html;
    console.log(html);



}


function enregistrer(idTodo) {
    var tab = JSON.parse(localStorage.getItem("tabtodo"));

    var a = document.getElementById("tas").value;
    var b = document.getElementById("ded").value;

    for (i = 0; i < tab.length; i++) {


        if (idTodo == tab[i].idtodo) {
            tab[i].Taskname = a;
            tab[i].Deadline = b;

        }


    }

    localStorage.setItem("tabtodo", JSON.stringify(tab));


    DisplayTodo();

}

function enter() {

    var input = document.getElementById("mdp");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("b").click();
        }
    })

}
